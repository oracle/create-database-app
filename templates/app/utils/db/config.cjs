/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.CONNECT_STRING,
};

if ( process.env.WALLET_PASSWORD ) {
    config.walletPassword = process.env.WALLET_PASSWORD;
}
  
if ( process.env.WALLET_LOCATION ) {
    config.walletLocation = process.env.WALLET_LOCATION;
}

if ( process.env.HTTPS_PROXY ) {
    config.httpsProxy = process.env.HTTPS_PROXY;
}

if ( process.env.HTTPS_PROXY_PORT ) {
    config.httpsProxyPort = Number.parseInt( process.env.HTTPS_PROXY_PORT );
}

module.exports = config;
