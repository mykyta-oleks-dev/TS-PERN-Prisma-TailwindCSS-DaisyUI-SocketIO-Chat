# Online Chat application

## Description

A fullstack PERN-stack application for online chats between registered users. See users' online status, send messages to your friend and receive the respones in real time!

Consists of Express API and Vite+React client app.

## Technologies used

-   TypeScript - a high-level, multi-paradigm programming language.

-   Node.JS - free, open-source, cross-platform JavaScript runtime environment.

-   npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

-   Express - "a fast, unopinionated, minimalist web framework for Node.js".

-   PostgreSQL - "a powerful, open source object-relational database system that uses and extends the SQL language".

-   Prisma - an open-source Object-Relational Mapper (ORM) for Node.js and TypeScript that simplifies database interactions.

-   Socket.IO - a JavaScript library that enables real-time, event-driven, bi-directional communication between web browsers (clients) and servers.

-   React - an open-source JavaScript library for building user interfaces.

-   Vite - a modern frontend build tool and development server.

-   TailwindCSS - a utility-first CSS framework for rapidly building modern websites.

-   DaisyUI - a free, open-source component library for Tailwind CSS.

-   Zustand - "a small, fast, and scalable bearbones state management solution".

## Installation

The client apps use `npm` as the package manager.

To install project apps dependancies navigate to their directories and perform installation with `npm`:

```bash
cd {{ frontend | backend }}
npm install
```

`Backend` application uses generated with Prisma clients, types and model classes. After installation of packages, generate the code:

```bash
npx prisma generate
```

## Running the project

To run the project apps in production, the PostgreSQL server has to be deployed, either locally or on cloud service, and migrations are to be executed to create necessary tables:

```bash
npx prisma migrate deploy
```

To reset database and migrations:

```bash
npx prisma migrate reset
```

To run apps in development mode:

```bash
npm run dev
```

To build apps:

```bash
npm run build
```

Built `backend` app can be started with:

```bash
npm run start
```

For the `frontend` app:

```bash
npm run preview
```

## Features

-   Authentication: Create a new user with unique username, generated avatar using service [https://getavataaars.com/](https://getavataaars.com/), or log in with existing account.

-   Browse users: On the sidebar, browse through the list of all app's users, or search for the one you are interested in.

-   Exchange messages: With the user conversation chosen, browse through the messages, if previously chatted, and send new messages, that will appear instantly on the other side, if the receiver is online, and get responses in real time in return.
