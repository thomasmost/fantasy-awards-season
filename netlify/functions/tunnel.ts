import dotenv from "dotenv";
import { Handler } from "@netlify/functions";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

dotenv.config();

// TODO request the old one
// 11UJGryQoaei5zAoZPtgwifuvTJp5Sj-7nUSjaXLlnVo
const doc = new GoogleSpreadsheet(
  `1EsPjE4bNt91qZbf5xafzI9yKd8amUpLL-ZdIJyoo2WM`
);

const playerHeaders = "BCDEFGHIJ";
const lastDataRowIndex = 51;

const readColumnToPoints = (
  pointsByVotingBody: GoogleSpreadsheetWorksheet,
  headerPrefix: string
) => {
  const player = pointsByVotingBody.getCellByA1(`${headerPrefix}1`)
    .value as string;

  const points: number[] = [];
  for (let i = 2; i <= lastDataRowIndex; i++) {
    const AIndex = `${headerPrefix}${i}`;
    points.push((pointsByVotingBody.getCellByA1(AIndex).value as number) || 0);
  }
  return {
    player,
    points,
  };
};

const handler: Handler = async (event) => {
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const envPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  const private_key = envPrivateKey?.replace(/\\n/gm, "\n");
  if (!client_email || !private_key) {
    console.log(
      "Client email and private key required to load data from Google Sheet"
    );
    return {
      statusCode: 500,
    };
  }

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
  const pointsByVotingBody = doc.sheetsByIndex[1];
  // console.log('pointTotals', pointTotals.title)
  // console.log("pointsByVotingBody", pointsByVotingBody.title);
  // console.log("pointsByVotingBody Row Count", pointsByVotingBody.rowCount);

  await pointsByVotingBody.loadCells(`A1:J${lastDataRowIndex}`);
  const votingBodies = [];
  for (let i = 2; i <= lastDataRowIndex; i++) {
    const AIndex = `A${i}`;
    votingBodies.push(pointsByVotingBody.getCellByA1(AIndex).value);
  }
  const playerWinnings = [];
  for (const header of playerHeaders) {
    const playerPoints = readColumnToPoints(pointsByVotingBody, header);
    playerWinnings.push(playerPoints);
  }
  // console.log(votingBodies);

  const numVotingBodies = votingBodies.length;
  // console.log('Num Voting Bodies', votingBodies.length);
  // console.log('last', JSON.stringify(votingBodies[numVotingBodies - 1]));
  for (let i = 0; i < votingBodies.length; i++) {
    let allZero = true;
    for (const player of playerWinnings) {
      if (player.points[i]) {
        allZero = false;
      }
    }
    if (allZero) {
      // console.log('zero', JSON.stringify(votingBodies[i]));
      votingBodies.splice(i, numVotingBodies - i);
      for (const player of playerWinnings) {
        player.points.splice(i, numVotingBodies - i);
      }
    }
  }

  const ranking: Record<string, number> = {};
  for (const player of playerWinnings) {
    ranking[player.player] = player.points.reduce((x, y) => x + y, 0);
  }

  const body = JSON.stringify({
    votingBodies,
    playerWinnings,
    ranking,
  });

  return {
    statusCode: 200,
    body,
  };
};

export { handler };
