const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Ruta del archivo de salida
const targetPath = path.resolve(
  __dirname,
  "src/app/environments/firebase.environment.ts"
);

// Contenido del archivo a escribir
const envFileContent = `
export const environment = {
  production: false,
  firebase: {
    apiKey: "${process.env.NG_APP_FIREBASE_API_KEY}",
    authDomain: "${process.env.NG_APP_FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.NG_APP_FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.NG_APP_FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.NG_APP_FIREBASE_APP_ID}"
  }
};
`;

try {
  fs.writeFileSync(targetPath, envFileContent.trim());
  console.log(`✅ Archivo generado correctamente en: ${targetPath}`);
} catch (err) {
  console.error("❌ Error al generar el archivo de entorno:", err);
  process.exit(1);
}
