## Scripts Guide
This project uses various NPM scripts for building, starting, and running the application in different environments. Below is a detailed explanation of each script:

1. Development
    `pnpm dev`
    1. Starts the development server with Turbopack for faster builds.
    2. Useful for local development and debugging.

2. Build

    `pnpm build`
    
    1. Creates a production-ready build of the application.
    2. Uses the default .env configuration.

## Environment-Specific Builds

1. Production Build

    `pnpm build:production`
    
    1. Builds the application using the .env.production file.
    2. Sets the APP_ENV variable to production.

2. Staging Build

    `pnpm build:staging`
    
    1. Builds the application using the .env.staging file.
    2. Sets the APP_ENV variable to staging.

3. Start
    `pnpm start`
    
    1. Starts the application using the previously built files.
    2. Uses the default environment configuration.
    3. Environment-Specific Starts

4. Production Start

    `pnpm start:production`

    1. Starts the application using the .env.production file.
    2. Ensures the correct environment variables are loaded for production.

5. Staging Start

    `pnpm start:staging`
    
    1. Starts the application using the .env.staging file.
    2. Ensures the correct environment variables are loaded for staging.

6. Environment Configuration

This project uses .env files to manage environment variables:

.env.production for the production environment.
.env.staging for the staging environment.
.env.local for local development (loaded automatically).
You can add environment-specific variables in these files.

Example Usage
Build and Start in Production

pnpm build:production
pnpm start:production
Build and Start in Staging

pnpm build:staging
pnpm start:staging
Local Development

pnpm dev
Troubleshooting
Ensure the .env files are correctly formatted and located in the root directory.
If environment variables are missing, verify the .env file and ensure it matches the script being used.
This README section can be added to your project's documentation to clarify the usage of the scripts.