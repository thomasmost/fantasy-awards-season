# Fantasy Film Awards

This is a Netlify app with serverless functions that tunnel data from Google Sheets to a simple React frontend

Run `npm run dev` to start both the serverless functions and the client app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See below for instructions...

## Updating to a new year

Update constants in config.ts for any changes to the spreadsheet
Update `playerByPickSheetIndex` in top_picks.ts with the correct order
Some other steps used to be manual (like defining ranges in `loadCells`) but should now be automated by the config
