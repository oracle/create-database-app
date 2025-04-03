const esbuild = require('esbuild');
const { execSync } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();
const { DB_USER, DB_PASSWORD, CONNECT_STRING, SQL_CL_PATH } = process.env;

const bundlePath = 'dist/index.js';
esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false, 
    platform: 'neutral',
    format: 'esm', 
    outfile: bundlePath,
}).then(() => {
    const sqlclCommand = `"${SQL_CL_PATH}/bin/sql" ${DB_USER}/${DB_PASSWORD}@${CONNECT_STRING} <<EOF
    mle create-module -filename ${bundlePath} -module-name mleapp;
    EXIT;
    EOF`;
    try {
        console.log("Deploying MLE module...");
        execSync(sqlclCommand, { stdio: "inherit", shell: "/bin/bash" });
    } catch (error) {
        console.error("Deployment failed:", error.message);
    }
}).catch((e) => {
    console.log(e);
    process.exit(1)
});