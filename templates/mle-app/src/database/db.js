const { execSync } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");
var args = process.argv.slice(2);
const os = require("os");
const fs = require("fs");

dotenv.config();

// using dotenv, read the environment variables defined in the generated .env file
const { WALLET_PATH, DB_USER, DB_PASSWORD, CONNECT_STRING, SQL_CL_PATH } = process.env;

// sqlclPath is a mandatory field, therefore must exist
const sqlclPath = path.normalize(SQL_CL_PATH);
const sqlExecutable = path.join(sqlclPath, 'bin', os.platform() === 'win32' ? 'sql.exe' : 'sql');

// connecting to an Autonomous Database using the EZConnect string requires TNS_ADMIN
// the @create-database-app initialisation routine will unzip a wallet to
// ./server/utils/db/wallet. Optionally use the -tnsadmin flag to SQLcl to point it
// to the unzipped wallet directory.
if (WALLET_PATH.length > 0) {
    process.env.TNS_ADMIN = path.join(process.cwd(), path.normalize('./server/utils/db/wallet'))
}

// make sure the file supposed to be executed does exist
const filePath = args[0];
if (! fs.existsSync(filePath)) {
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