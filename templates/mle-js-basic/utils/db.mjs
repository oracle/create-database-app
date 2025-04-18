import { execSync } from "child_process";
import path from "path";
import dotenv from "dotenv";
import os from "os";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const args = process.argv.slice(2);

// Load environment variables
dotenv.config();

const { WALLET_PATH, DB_USER, DB_PASSWORD, CONNECT_STRING, SQL_CL_PATH } = process.env;

const sqlclPath = path.normalize(SQL_CL_PATH);
const sqlExecutable = path.join(sqlclPath, 'bin', os.platform() === 'win32' ? 'sql.exe' : 'sql');

// Set TNS_ADMIN if WALLET_PATH is defined
if (WALLET_PATH && WALLET_PATH.length > 0) {
    process.env.TNS_ADMIN = path.join(process.cwd(), path.normalize('./server/utils/db/wallet'));
}

// Validate file path
const filePath = args[0];
if (!fs.existsSync(filePath)) {
    throw new Error(`file ${filePath} does not exist`);
}

console.log(`Executing: ${filePath}...`);
const sqlclCommand = `"${sqlExecutable}" -S /nolog <<'EOF'
connect ${DB_USER}/${DB_PASSWORD}@${CONNECT_STRING}
start ${filePath}
EOF`;

try {
    execSync(sqlclCommand, {
        stdio: 'inherit',
        shell: true
    });
    console.log(`Database script ${filePath} was successfully executed`);
} catch (error) {
    console.error("Deployment failed, check output");
}