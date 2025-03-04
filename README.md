# URL Shortener

## Introduction

A URL shortener is a tool that converts long and complex URLs into shorter, more manageable links while preserving their functionality. It enhances link sharing, tracking, and usability, making it ideal for social media, marketing, and personal use.

## Key Features

1. Shortens Long URLs → Converts lengthy URLs into compact, shareable links.
2. Redirection → Automatically redirects users to the original URL when they click the shortened link.
3. Tracking & Analytics → Provides insights on link clicks, user engagement, and traffic sources.
4. QR Code Generation → Users can create QR codes for their shortened links, making it easy to share links in print, posters, and offline media.

## Project Type
Fullstack

## Deployed App

- *Frontend*:https://shortifies.netlify.app/
- *Backend*: [Backend Code](https://practice-dmzg.onrender.com)

## Directory Structure
project-root/
│── backend/
│   ├── controllers/
│   │   ├── url.control.js
│   │   ├── user.control.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │
│   ├── models/
│   │   ├── link.model.js
│   │   ├── user.model.js
│   │   ├── pexels.jpg
│   │
│   ├── router/
│   │   ├── url.router.js
│   │   ├── user.route.js
│   │
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│
│── frontend/
│   ├── index.html
│   ├── login.css
│   ├── main.css
│   ├── main.html
│   ├── main.js
│   ├── pexels.jpg
│   ├── Shortify.png
│   ├── URL.png
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│
│── README.md
│── url-image.jpg

## Technology Stack

- *Node.js*: For backend logic and server-side scripting.
- *MongoDB*: NoSQL database for storing user data, devices, and routines.
- *Frontend*: HTML/CSS/JavaScript and React.js for designing the user interface.
