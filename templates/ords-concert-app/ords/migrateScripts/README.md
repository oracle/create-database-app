# ORDS Management Scripts - Migration Scripts

## Table of Contents
- [Overview](#overview)
- [How the scripts are used in the ORDS Concert App](#how-the-scripts-are-used-in-the-ords-concert-app)

## Overview

The `Migrate Scrips` are a collection of scripts whose whole purpose is to facilitate the development and deployment of the ORDS Concert APP RESTful Services.

At its core, these scripts encompass 4 functionalities: 

1. **Create Database Objects and REST Enable them**: Provides a JS abstraction that allows users to create Database Objects and control whether those objects can be used as RESTful Web Services. 

2. **Define RESTful Services**: Provides a collection of JS abstractions that allows users to define collections of REST Services. 

3. **Security and Resources Protection**: Provides a collection of JS abstractions that allows users to protect their REST Services.

4. **Comunicate with ORDS**: Provides a collection of JS abstractions that allows users to comunicate with a REST Enabled Schema using the REST Enabled SQL (`/_/sql`) endpoint to define and configure REST Services.  

## How the scripts are used in the ORDS Concert App

### Talking to the Database

First, we need a way to talk to the Database in order to create a Schema and its objects and for that the sample app expects that you already have another Schema REST enabled with enough privileges to create other schemas like the ADMIN schema that ADB-S provides. This is the reason why the recommended option to deploy the ORDS Sample App is using an Autonomous Database so you can get the app up and running with minimal configuration.  

### Create a Database Schema and Populate with the objects that the ORDS Concert App needs.

We need a Database Schema and a way to talk to it, so the first steep is to create a Schema and REST Enable it so we can use the schema REST Enabled SQL (`/_/sql`) endpoint and Schema credentials to talk to it and properly define the objects and services that we require. This will be done using the [createSchema](../RESTfulServices/RESTSchema.js) function which creates a Schema with the minimum privileges needed to create the objects that we need. 

Once the Schema has been created we REST enable it and define an ORDS Privilege with the `oracle.dbtools.autorest.any.schema` and `SQL Developer` Roles so the Schema has the proper entitlements to administrate the Web Services that we will define.

Now that we have an Schema for the app we need to create the objects and services that the ORDS Concert App needs. This can be done in multiple ways and for simplicity, the ORDS Concert App has the Database Objects stored as [JS constants](../migrateScripts/schemaObjects.js) that can be created in the database using the [ORDSRequests.js](../utils/ORDSRequests.js) helper functions. 

### Define and Create the RESTful Services that the ORDS Concert App needs

Now that we have an Schema and some Database Objects defined, we can start asking ourselves some questions 🧐: 

- What kind of REST Services does the App needs?
- How those services should be structured? 
- How do those services look?
- Who should use those services? 
- How do we know that a user is entitled to use those services? 

Those are a lot of questions to go through and you can learn more about how the [ORDS Concert App has their REST Services structured](../modules/README.md) but in short this diagram should suffice. 

![ORDS Sample App Modules Definitions](../../images/Modules.png)

### Define and Create the AutoREST Services that the ORDS Concert App needs

We have manually defined some REST Services but there is another powerful option that we can use like the AutoREST feature which allows us to automatically expose tables and views as RESTful Services without having to manually define modules, templates and handlers like we had to do with the other REST Services we defined earlier and it also allows us to access extra functionalities like a rich filter syntax that the sample app uses in the Discover Pages, and the batch load feature that we use in the [Seed Script](../seedScripts/README.md) 🌱.

### Protecting the ORDS Sample App REST Services

Now that we have our REST Services in place, we need to decide who and how is going to consume those resources. Luckily ORDS allow us to Define Roles and Privileges to manage who has access to our API endpoints. 

Since we also want to showcase how you can use JWT tokens to consume ORDS resources, we will be defining a set of privileges for each one of our modules as well as a JWT Client that will validate that the petitions that a user makes has the right privileges to [consume such resources](protectEndpoints.js). You can learn more about how we configured the [Auth0 ORDS Concert App](../security/README.MD#setting-up-the-auth0-app). 

