# Google OAuth2 NestJS Application

This project is a NestJS application that integrates Google OAuth2 for authentication and allows accessing Gmail, Calendar, and Contacts data using Google APIs.

## Features

- Google OAuth2 Authentication
- JWT Authentication
- Access Gmail Emails within a specified time range
- Access Google Calendar Events
- Access Google Contacts
- Token management with automatic refresh

## Prerequisites

- Node.js
- npm
- Google Cloud Project with OAuth2 credentials

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/meissasoft/nest-google-login-with-apps.git/
   cd nest-google-login-with-apps
   ```

### Install dependencies:

```
yarn install
```

Create a .env file in the root directory and add the following environment variables:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/redirect
JWT_SECRET=your-jwt-secret
```

### Running the Application

```
npm run start:dev or npm run start (for standalone)
```

### Building the Application

```
npm run build
```

# API Endpoints

## Authentication

- **GET /auth/google**: Initiate Google OAuth2 login
- **GET /auth/google/redirect**: Google OAuth2 callback

## Gmail

- **GET /gmail/emails**: Get Gmail emails within a specified time range
  - Query parameters:
    - `startDate`: Start date in ISO format (e.g., `2024-01-01T00:00:00Z`)
    - `endDate`: End date in ISO format (e.g., `2024-01-31T23:59:59Z`)

## Calendar

- **GET /calendar/events**: Get Google Calendar events within a specified time range
  - Query parameters:
    - `startDate`: Start date in ISO format (e.g., `2024-01-01T00:00:00Z`)
    - `endDate`: End date in ISO format (e.g., `2024-01-31T23:59:59Z`)

## Contacts

- **GET /contacts/list**: Get Google Contacts

## Usage

1. Open your browser and navigate to `http://localhost:3000/api` to access the Swagger UI.
2. Use the Swagger UI to interact with the API endpoints.
3. Authorize using the JWT token received after successful Google login.
