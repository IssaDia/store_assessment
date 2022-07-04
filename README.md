# 🖥 My store

A fullstack application which manage a store. Configured it with ViteJs, ReactJs, Typescript, Redux Toolkit, Moment, TailwindCss, NodeJs, Express, Jest, Git, EsLint,

# 📜 Summary

- [Goal](#goal)
- [Methodology](#methodology)
- [Build with](#-build-with)
- [My code environment and utils](#-my-code-environment-and-utils)
- [Why this choice](#why-this-choice)
- [Technical watch](#technical-watch)
- [Biggest challenges for this project](#biggest-challenges-for-this-project)
- [Feedback](#feedback)

- [How to run this app](#-how-to-run-this-app)
- [Node Package Manager](#-node-package-manager)
- [Install packages](#-install-packages)
- [Run on Front End](#-run-on-front-end)
- [Run on Back End](#-run-on-back-end)
- [Run Tests](#-run-tests)
- [To improve](#-to-improve)

## Goal

A retail store would like to have a simple website to store and view the purchasing information for stock management.

The retail store has provided business rules for the web development:

- A purchase order has one or multiple items
  - An item in a purchase order has one or multiple unique inventory lot number
  - A purchase order has four status, which are:
    - Pending Approval - the initial state, where it requires approval from other employee
    - Pending receive - once approved, will be on this state
    - Received - when item arrived, will mark purchase order as received
    - Rejected - when other employee rejected the purchase order
- The inventory lot number is not known until the item is received
- The sum of item quantities of all inventory lot numbers should match the related item in purchase order.
  - Example: for purchase order, “PO1” has 40 items, “itemA”.
  - The sum of all inventory lot number quantities for “itemA” in “PO1” should be 40
  - Example of valid inventory lot numbers:
    - itemA-lot1 quantity = 20
    - itemA-lot2 quantity = 14
    - itemA-lot3 quantity = 6
- A purchase order must have the following information:

  - Create Date
  - Unique Identifier (ID)
  - Status

- A purchase order item must have the following information:
  - Item code
  - Item name
  - Quantity
- A inventory lot number must have the following information:
  - Lot number
  - Quantity

The website must have the following pages/features for inventory management:

- Create purchase order
- View purchase order
- Enter inventory lot number
- View entered inventory lot number
- One click button to update to appropriate status

You may store the data in any medium (such as database), as long as it could be retrieved when a user re-visit the website.

## Methodology

I chose to executes elements of CRUD one by one then adapt to the challenge.

## 🏗 Built with

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [ViteJs](https://cli.vuejs.org/guide/creating-a-project.html](https://vitejs.dev/)
- [Typescript](https://fr.vuejs.org/v2/guide/typescript.html)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/vite)
- [React](https://fr.reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

Soon : 
- [Jest](https://github.com/vuejs/vue-jest)
- [Supertest](https://www.npmjs.com/package/supertest)

## My code environment and utils

- VsCode
- MacOs
- NPM
- EsLint
- Prettier
- Postman

## Why this choice?

I chose to go with React and Redux because I did projects with these two technologies and I felt it was the right tools for that challenge.

## Technical watch

Videos :

INTRODUCTION A REDUX TOOLKIT DANS REACT
: https://www.youtube.com/watch?v=1lvnT2oE0_4

## Biggest challenges for this project

- Manage the right Model for the Items (implement lot items)
- Learn redux toolkit with createApi and mutations
- find the right Types with Typescript

## Feedback

It was a really good challenge. Allowed me to improve my backend skills with React Toolkit :

- manage a store
- create API calls

## 👨🏽‍💻 How to run this app

### 📦 Node Package Manager

In order to install packages and run this application, you will need [Node Package Manager](https://docs.npmjs.com/) v6.14.15 or higher

To check if your Node version is correct:

```
node --version
```

Personally i used node v14.17.2

### 📥 Install packages

To install all the node_modules packages:

```
npm install or npm i
```

on both /frontend and /backend folders

### ♻️ Run on Front End

To run on Development mode:

go to /frontend folder then :

```
npm run dev
```

then go to : http://localhost:8080/

For now you have to add manually the items 

Got to Postman and enter url : http://localhost:8000/api/item/new

make a single POST request for each item you find in /frontend/data/DummyItems.tsx

### ♻️ Run on Back End

To run on Development mode:

go to /backend folder then :

```
npm run serve
```

change .env.exemple file to .env and complete the file with your mongoDB api key : 

```
MONGO_DB_URI=mongodb+srv://<username>:<password>@mycluster.lgurr.mongodb.net/<databaseName>?retryWrites=true&w=majority
```

No tests for now but later: 

### 🧪 Run Tests

To run tests:

```
npm run test
```

## 📑 To improve

- Use SQL architecture model to handle better the application needs
- Create smaller components when fixing Intrisicate attibutes error
- Allow to create Products with associated lot items
- Better UI
- Better file disposition and architecture on frontend and backend
- Fix the bug that changes quantity of Items after each order
- Implement tests

