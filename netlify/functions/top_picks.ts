import dotenv from "dotenv";
import { Handler } from "@netlify/functions";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

dotenv.config();

const doc = new GoogleSpreadsheet(
  `11UJGryQoaei5zAoZPtgwifuvTJp5Sj-7nUSjaXLlnVo`
);

const playerByPickSheetIndex: Record<number, string> = {
  2: "Holly",
  3: "Alexis & Kent",
  4: "Thomas",
  5: "Jimmy",
  6: "Isabel & Eric",
  7: "Patrick",
  8: "Alex",
  9: "Andy",
  10: "Kyle",
};

type TopScoringPick = {
  category: string;
  pick: string;
  pointsScored: number;
  owner: string;
};

const picksByRow = {
  3: "Film",
  4: "Film",
  5: "Film",
  8: "Director",
  9: "Director",
  12: "Creative",
  13: "Creative",
  16: "Actress",
  17: "Actress",
  20: "Actor",
  21: "Actor",
  24: "Production/Distribution Company",
  25: "Production/Distribution Company",
  28: "Wildcard",
};

const insertPickIntoTopTen = (
  pick: TopScoringPick,
  picks: TopScoringPick[]
) => {
  if (picks[0] && picks[0].pointsScored > pick.pointsScored) {
    if (picks.length >= 10) {
      // Already full and lower than lowest scorer
      // Exit early
      return;
    }
    // Push to front of ordered array
    picks.unshift(pick);
    return;
  }
  for (let i = 1; i < 10; i++) {
    if (!picks[i]) {
      picks.push(pick);
      return;
    }
    if (picks[i].pointsScored > pick.pointsScored) {
      picks.splice(i, 0, pick);
      if (picks.length > 10) {
        picks.shift();
      }
      return;
    }
  }
  picks.push(pick);
  picks.shift();
};

const handler: Handler = async (event) => {
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const envPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const private_key = envPrivateKey?.replace(/\\n/gm, "\n");

  // console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  // do not allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "invalid http method, expected 'POST'" }),
    };
  }

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email,
    private_key,
  });

  // console.log("service account loaded");
  // console.log("*");
  // console.log("*");
  // console.log("*");

  await doc.loadInfo(); // loads document properties and worksheets
  // console.log("Document loaded (huzzah!)");
  // console.log("Doc Title:", doc.title);
  // const pointTotals = doc.sheetsByIndex[0];

  const pickSheetsByPlayer: Record<string, GoogleSpreadsheetWorksheet> = {};

  for (let i = 2; i < 11; i++) {
    const player = playerByPickSheetIndex[i];
    pickSheetsByPlayer[player] = doc.sheetsByIndex[i];
    await pickSheetsByPlayer[player].loadCells("A1:B30");
  }

  const topTenPicks: TopScoringPick[] = [];

  for (const [owner, pickSheet] of Object.entries(pickSheetsByPlayer)) {
    for (const [row, category] of Object.entries(picksByRow)) {
      const pick = pickSheet.getCellByA1(`A${row}`).value as string;
      const pointsScored =
        (pickSheet.getCellByA1(`B${row}`).value as number) || 0;
      const fullPick: TopScoringPick = {
        owner,
        category,
        pointsScored,
        pick,
      };
      insertPickIntoTopTen(fullPick, topTenPicks);
    }
  }

  const body = JSON.stringify({
    topTenPicks,
  });

  return {
    statusCode: 200,
    body,
  };
};

export { handler };
