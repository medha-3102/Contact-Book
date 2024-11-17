# Contact Management Application

This is a Contact Management Application built with React.js for the frontend and Node.js with Express.js for the backend. It provides a user-friendly interface to create, retrieve, update, and delete contact details, with MongoDB as the database.

The app demonstrates a full-stack implementation of a contact management system. MongoDB - atlas was chosen for its flexible schema structure, which fits dynamic and evolving data requirements like contact management.
![Screenshot 2024-11-17 122735](https://github.com/user-attachments/assets/216f2e47-c7b5-4039-b108-bb8f3ad0719f)

# Features
## Frontend (React.js):

A responsive interface to interact with the contact database.
![Screenshot 2024-11-17 123423](https://github.com/user-attachments/assets/a407f22a-5943-4042-8553-e480ba9c8879)

Forms for adding or editing contact details.
![Screenshot 2024-11-17 122902](https://github.com/user-attachments/assets/c1ef6a1d-6966-426c-9d11-cec5517faac2)

Display a list of all contacts with editing and deleting options.
![Screenshot 2024-11-17 123356](https://github.com/user-attachments/assets/901aeaf6-110c-47a3-a140-5bfd8bddf3f0)

Backend (Node.js + Express.js):

API endpoints for CRUD operations.
Error handling and status codes for reliable communication with the frontend.
Database (MongoDB-atlas):

Stores all contact details with fields for first name, last name, email, phone, company, and job title.

## Setup Instructions
### Prerequisites
Node.js installed.
MongoDB database (local or cloud, e.g., MongoDB Atlas).
A package manager (npm or yarn).
Backend Setup
Navigate to the server folder
### `cd server` 
Install backend dependencies

### `npm install`  
Set up MongoDB

Create a MongoDB database (local or use MongoDB Atlas).
Use the following schema for your contacts collection:
json
Copy code
{  
  "firstName": "String",  
  "lastName": "String",  
  "email": "String",  
  "phone": "String",  
  "company": "String",  
  "jobTitle": "String"  
}  
Update the MongoDB connection string
Replace Your Connection String in the server.js file with your MongoDB connection string.

Run the backend server

### `node server.js`  

Frontend Setup
Navigate back from src folder
  
Install frontend dependencies
### `npm install` 
Start the React app

### `npm start`  

## How Each Part Works
### Frontend
#### React Components:
ContactList: Displays all contacts retrieved from the backend.
ContactForm: Form for adding or editing contacts.
API Integration: Axios or Fetch is used to make API calls to the backend.
Backend
### Routes:
POST /contacts - Add a new contact.
GET /contacts - Retrieve all contacts.
PUT /contacts/:id - Update contact details by ID.
DELETE /contacts/:id - Remove a contact by ID.
### Database
MongoDB: A NoSQL database stores the contact data in a flexible schema.
Major Technical Decisions
React.js: For creating a dynamic and responsive user interface.
Node.js with Express.js: Simplifies building RESTful APIs.
MongoDB: Fits this app due to its schema-less nature, allowing quick iterations and adaptability.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
