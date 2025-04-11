const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const bundlePath = 'dist/index.js';
let moduleName = process.argv[2];

if (!moduleName) {
    moduleName = "mleapp";
}

const tempSqlPath = path.join(os.tmpdir(), `create_module_${Date.now()}.sql`);
fs.writeFileSync(tempSqlPath, `
mle create-module -filename ${bundlePath} -module-name ${moduleName};
EXIT;
`);

execSync(`node src/database/db.js ${tempSqlPath}`, { stdio: 'inherit' });