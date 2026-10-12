# Inkline Article Web

React and TypeScript frontend for the Inkline article application.

## Features

- Responsive Tailwind CSS interface
- User registration and login
- JWT-authenticated API requests
- Home page with persisted articles from MongoDB
- Dedicated article creation page
- Multipart image upload without Base64 conversion
- Full article detail pages with “See more” links
- Protected routes for authenticated users

## Requirements

- Node.js 20 or newer
- Inkline Article API running on `http://localhost:3000`

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

## Available commands

```bash
npm run dev       # Start Vite development mode
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Application routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Article feed and navigation | Authenticated |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/create-article` | Create an article with an optional image | Authenticated |
| `/articles/:id` | Read the complete article | Authenticated |

## Backend connection

The Axios service uses:

```text
http://localhost:3000/api/v1
```

Make sure the backend is running before signing in or loading articles. The backend must expose uploaded images at:

```text
http://localhost:3000/uploads/<filename>
```

## Article creation

The create page sends a `multipart/form-data` request using `FormData`.

- Text fields are sent as normal form fields.
- The selected image is sent in the `imageURL` field.
- Images are uploaded as files instead of Base64 strings.
- Axios generates the multipart boundary automatically.

## Project structure

```text
src/
├── components/    Shared UI components
├── context/       Authentication state
├── pages/         Login, registration, feed, create, and detail pages
├── router/        React Router configuration
├── service/       Axios and API service functions
└── main.tsx       Application entry point
public/            Static assets and favicon
```

## Validation

```bash
npm run build
npm run lint
```
