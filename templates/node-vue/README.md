# Node Vue

# Description

Node Vue is a robust web application framework that leverages the power of NodeJS for server-side operations, Vue for frontend development, and Javascript for seamless integration and dynamic functionality. With its versatile toolset, developers can create modern, interactive web applications with ease. Additionally, Oracle Rest Data Services facilitate smooth data exchange, ensuring efficient communication between the frontend and backend components.

## Installation

1. Install the package globally using npm
```properties
npm install -g @dbtools/create-database-app
```

## Project Name:
2. Enter a desired name for your application
```properties
? What would you like your application's name to be?
```

## Template Selection:

1. Select node-vanilla

```properties
? Which template would you like to use for your project? (Use arrow keys)
> node-vanilla
> node-react
> node-vue
> node-react-todo
```
## Database Connection Type:

1. Select the preferred database connection method
```properties
? Which database connection type would you like to choose? (Use arrow keys)
> Cloud Wallet Path
> Basic Connection (Protocol, Hostname, Port, Service Name / SID)
```
## Basic Connection Configuration:

1. Provide database connection details when promted by the terminal

- Protocol: (defaults to TCP)
```properties
? What is your database protocol? (TCP)
```
- Hostname: (defaults to localhost)
```properties
? What is your database protocol? (TCP)
```
- Protocol: (defaults to TCP)
```properties
? What is your database port? (1521)
```
- Service Type:
```properties
? Which service type would you like to use? (Use arrow keys)
> SID
> Service name
```
- SID:
```properties
? Please input your database SID:
```
- Service Name:
```properties
? Please input your database service name:
```
- Database Username
```properties
? What's your database username?
```
- Database Password
```properties
? What's your database password?
```

# Database Environment

Within this .env file, you'll find details regarding the connection to the database used in the application.


```properties
# Database User
DB_USER= username
# Database User
DB_PASSWORD= password
# Connection string to your ADB instance
CONNECT_STRING= connection_string
```

# Cloud Wallet Path (if selected)

If you selected the option of Cloud Wallet path yo will need
to establish an Oracle Wallet, you'll require the Oracle Public Key Infrastructure (PKI) command line tool, known as orapki.

```properties
WALLETPATH <Domain Root>/<Domain Name>/config/fmwconfig/essconfig/essbase/walletssl
```

Next you will then provide the path of your Cloud Wallet

```properties
? Please input your Cloud Wallet Path:
```

# Cloud Wallet Environment

Within this configuration file, you'll find details regarding the connection to the cloud Wallet used in the application.

```properties
# Oracle Wallet Password (If using a cloud wallet)
WALLET_PASSWORD= password
# Path to your Oracle Wallet directory (If using a cloud wallet)
WALLET_LOCATION= <Domain Root>/<Domain Name>/config/fmwconfig/essconfig/essbase/walletssl
```