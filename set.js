const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0N1Uk5xWFkwR281bmR5TkM5bkNsck9QVEUyUUgxRjFGL21icHlYclZsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG9rbmhUQzRPa2dtbzNZcjBuc3p2THhUa1BRVng5THk0ODByZlBiL0FHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSjJRNi9SK1hVdzV5OEdhUUNKTmVlNWVyYjRVMmhBZkY1TFJJbGtKeTFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ZGNBNFZoUEc2eWQ0dFJOYnhvL2ozczc0NVh3M3BONjRHaEkvM3JyU0RJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9JQkg0QjMyUy9qYkdXMkFMaHpOM3VvQ09MaVB0dFJLaC8wVXBhTnNrbXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InROcllnRXNmZE55LzdnU2hGM2U0aWNlditFZUx6bUlOclI3NytvNkQzZ0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdRSDRMM0xFSVM5eWtzNnNZV05kNFVVRG02MGFKbmZoK3d4WWVqUWJrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1VvUW1ITmJvV2pPUkt0bjJCeXd4YzdDSkl2RndOemtHSHpBa3FqRmJWbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5CbXVyd2JGNHdKaDJ5WXRHMzFmODdab2Q3Yjh1ano5SFpFaThVVmp1L01jK0pQU1RWTmE4eEhFeXh1RU9ybGxEanNLd291S25ZNUZxOXJ3VTZURGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEwLCJhZHZTZWNyZXRLZXkiOiJIQWpFcVFsekpJd2k4eGpkV3llZ2EwQk4vUnB4SEkxOFA0elYvMExnT2xzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJFSnNKZkRFV1I5LUcxTXZrSk1XcWh3IiwicGhvbmVJZCI6Ijc5M2M4Nzc1LTI0ZTYtNDQ0ZC04OGY5LWNjZjlhZjZjYzJjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWMzljOTdJaTA3Y0c3b2ZsSDBwVkxJc2FWSVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVZMkFvZU95UVhpNFdTaFlDR2J1TS9TcmtJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhBNlNUTURQIiwibWUiOnsiaWQiOiIyMjU3OTA3MjMyMzozQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMalRoY1FHRU12Z3A3WUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTeXhWMkt0Uklmako1V2VXcGpJekV1aGRIaDdTWVJTa2tNcXhsQkZTeFQ0PSIsImFjY291bnRTaWduYXR1cmUiOiJ4SHo3TEUzLzlFdFk0UHFra29lL2phdmFYMjVtUmZXZ1VQUmc5ZnpEdFhBTXVydjN4R0pHZk9paWMyTTczODJJcEV6NDJ2aFQ3dW1PSk4yZXNmT0FEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOWlOYWUzY2ZVU0JzWXVtcFBiYUc0Um1TRnZyWTI5dGxkWW0raWE0TzFTTVhyZ1BadzFwM3ZyNmxBaUF0SGNodTBoUWZ0SGxEaUtVSFZsd2kreVlsanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjU3OTA3MjMyMzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVzc1ZkaXJVU0g0eWVWbmxxWXlNeExvWFI0ZTBtRVVwSkRLc1pRUlVzVSsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ1MTAyOTZ9',
    PREFIXE: process.env.PREFIX || "✓",
    OWNER_NAME: process.env.OWNER_NAME || "𝐒𝐚𝐝❦𝐁𝐨𝐲",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2250779072323",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
