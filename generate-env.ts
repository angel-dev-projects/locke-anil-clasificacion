import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const targetPath = './src/environments/firebase.environment.ts';

const envFileContent = `
export const environment = {
  production: false,
  firebase: {
    projectId: "${process.env['NG_APP_FIREBASE_PROJECT_ID']}",
    appId: "${process.env['NG_APP_FIREBASE_APP_ID']}",
    messagingSenderId: "${process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']}",
    apiKey: "${process.env['NG_APP_FIREBASE_API_KEY']}",
    authDomain: "${process.env['NG_APP_FIREBASE_AUTH_DOMAIN']}",
    storageBucket: "${process.env['NG_APP_FIREBASE_STORAGE_BUCKET']}",
  }
};
`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`Wrote variables to ${targetPath}`);
