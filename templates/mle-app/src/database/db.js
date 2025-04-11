const { execSync } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");
var args = process.argv.slice(2);
const os = require("os");

dotenv.config();

const { DB_USER, DB_PASSWORD, CONNECT_STRING, SQL_CL_PATH } = process.env;

const sqlclPath = path.normalize(SQL_CL_PATH);
const sqlExecutable = path.join(sqlclPath, 'bin', os.platform() === 'win32' ? 'sql.exe' : 'sql');

const filePath = args[0];
console.log(`Executing: ${filePath}...`);

const sqlclCommand = `"${sqlExecutable}" -S ${DB_USER}/${DB_PASSWORD}@${CONNECT_STRING} @${filePath}`;
try {    
    execSync(sqlclCommand, {
        stdio: 'inherit',
        shell: true
    });
    console.log("Database script was executed successfully.");
} catch (error) {
    console.error("Deployment failed:", error.message);
}