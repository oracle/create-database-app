import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, 'database/ords.sql');
const rawSQL = fs.readFileSync(sqlPath, 'utf-8');

const moduleName = process.env.MLE_MODULE;

if (!moduleName) {
  console.error('MLE_MODULE is not defined in your .env file');
  process.exit(1);
}

const replacedSQL = rawSQL.replace(/__MODULE_PLACEHOLDER__/g, moduleName);

const replacedPath = path.join(__dirname, 'database/ords.processed.sql');
fs.writeFileSync(replacedPath, replacedSQL);

console.log(`Replaced placeholder with '${moduleName}' in ${replacedPath}`);

execSync(`node utils/db.mjs ${replacedPath}`, { stdio: 'inherit' });

fs.unlinkSync(replacedPath);
console.log(`Removed temporary file ${replacedPath}`);