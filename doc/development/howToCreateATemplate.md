
# How to Create Templates

Here’s a brief overview of creating and setting up templates for your application projects:

**Starting Point:** The main file is located at `src/index.ts`. The starting point of the code is within the child class `Generate`, which inherits from `Command`. This class utilizes the [oclif](https://oclif.io/docs/commands) dependency, which requires a specific structure in the file.

## Setting Up Your Template

**User Interactions:** Through prompts powered by [inquirer](https://www.npmjs.com/package/inquirer), you will define your application's name, select a project template, and specify database connection preferences, these configurations will be saved in 
 `configObject`  and sent to `generateDatabaseApp(configObject)` to kickstart the application creation process.

```typescript
// Ask the user to choose the template.
const templateChoice = template === '' ? await select(
    {
        message: 'Which template would you like to use for your project?',
        choices: [
            // Template choices...
        ],
        default: 'node-vanilla'
    },
) : template;
```

The `templateChoice` constant allows the user to select a template. You can add your template choices here.


```typescript
// Ask the user for the database connection type.
const databaseConnectionType = await select(
    {
        message: 'Which database connection type would you like to choose?',
        choices: [
            // Database connection options...
        ],
        default: 'walletPath'
    }
);
```

The `databaseConnectionType` variable prompts the user to choose a database connection type. You can add your connection types here.

```typescript
// This represents the config object that will hold all the user-inputted information.
let configObject;

if (databaseConnectionType === 'basic') {
    // Prompt for protocol, hostname, port, and service details...

    // Configure for basic connection type.
    configObject = {
        appName,
        templateChoice: path.resolve(__dirname, '..', '..', 'templates', templateChoice),
        connectionString: generateConnectionString(protocol, hostname, port, serviceValue)
    };
} else {
    // Prompt for cloud wallet path and password...

    // Configure for wallet connection type.
    configObject = {
        appName,
        templateChoice: path.resolve(__dirname, '..', '..', 'templates', templateChoice),
        walletPath,
        walletPassword,
    };
}
```

## Template Setup 

The second main file is located at `generators/index.ts` The starting point of the code is within the anonymous class, which inherits from `Generator`. This class utilizes the [Yeoman](https://yeoman.io/authoring/) dependency, which requires a specific structure in the file.

When creating templates, it is important to adhere to the following directory convention:

- Your template should reside within a folder named `templates`.
- The specific template directory should have the name that corresponds to the value stored in `templateChoice`.
- Inside your folder template you must have a file named `.gitignore.template` that will genarate a `.gitignore` file in your template

Ensure your template includes a `package.json` file with all necessary dependencies. When project generation, `npm install` will be run automatically to install these dependencies.

### Copied Files

- The `.env.example` is a template for creating a .env file. Copy it, replace placeholders with actual values.

- The `.env` is used to to configure the connection to the database and other services

- The `utils/db/config.cjs` loads environment variables from a `.env` file and saves the database configuration in a constant

- The `utils/db/index.cjs` sets up a database connection pool using OracleDB with configurations from `utils/db/config.cjs`

- The `utils/rest-serv/connection.cjs` exports a function that verifies database connectivity with the database configuration from `utils/db/index.cjs`

- The `routes/connection.cjs` sets up an Express router to serve an endpoint that reports the database connection status using the function from `utils/rest-serv/connection.cjs`.

- The `index.cjs` serves API requests and static files, with logging and CORS support, on port 3000.


### Adding New Files 

- Use the `this.fs.copy()` method for straightforward file copying from your template directory to the destination project.

- Use the `this.fs.copyTpl()` for files needing customization or dynamic content based on user input.