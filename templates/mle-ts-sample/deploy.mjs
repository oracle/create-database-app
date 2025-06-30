import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundlePath = 'dist/index.js';
let moduleName = process.argv[2] || "mleapp";

const tempSqlPath = path.join(os.tmpdir(), `create_module_${Date.now()}.sql`);
fs.writeFileSync(tempSqlPath, `
mle create-module -replace -filename ${bundlePath} -module-name ${moduleName};
EXIT;
`);

execSync(`node utils/db.mjs ${tempSqlPath}`, { stdio: 'inherit' });

const envFilePath = path.resolve(__dirname, '.env');
function updateEnvVariable(key, value) {
    // Read the existing .env file
    const envData = fs.readFileSync(envFilePath, 'utf-8');

    // Check if the variable already exists
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(envData)) {
        // Update existing variable
        const updatedData = envData.replace(regex, `${key}=${value}`);
        fs.writeFileSync(envFilePath, updatedData, 'utf-8');
        console.log(`Updated ${key} in .env file`);
    } else {
        // Add new variable if not present
        fs.appendFileSync(envFilePath, `\n${key}=${value}`, 'utf-8');
        console.log(`Added new variable ${key} to .env file`);
    }
}

updateEnvVariable('MLE_MODULE', moduleName);