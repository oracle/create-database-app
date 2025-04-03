const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
var args = process.argv.slice(2);

dotenv.config();

const { DB_USER, DB_PASSWORD, CONNECT_STRING, SQL_CL_PATH } = process.env;
const dbFolder = path.resolve("src", "database");


console.log("Executing database script...");

const filePath = path.join(dbFolder, args[0]);
console.log(`Executing: ${filePath}...`);

const sqlclCommand = `"${SQL_CL_PATH}/bin/sql" -S ${DB_USER}/${DB_PASSWORD}@${CONNECT_STRING} @${filePath} <<EOF
EXIT;
EOF`;
try {
    execSync(sqlclCommand, { stdio: "inherit", shell: "/bin/bash" });
    console.log(`${filePath} executed successfully.`);
} catch (error) {
    console.error(`Error executing ${filePath}:`, error.message);
    process.exit(1);
}

console.log("Database script was executed successfully.");