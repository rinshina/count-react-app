# Count React App

A sophisticated React-based web application featuring a counter, user data form with automatic user ID generation, rich text editors for visualizing and formatting data, and an authentication system. This project is built using modern React technologies such as React Router, React Spring, and React Charts, with a focus on user experience, smooth animations, and data persistence.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Functional Requirements](#functional-requirements)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This web app is designed to deliver an engaging and user-friendly experience by combining essential features like dynamic counters, secure authentication, and intuitive forms with real-time data handling. Built with React and integrated with Material UI, Chakra UI, and React Spring for smooth animations, this project demonstrates modern web development techniques.

Key functionalities include:
- A **counter** component with interactive buttons and dynamic background color changes.
- A **user data form** that auto-generates user IDs and saves data locally, with a pop-up alert for unsaved changes when attempting to close the browser.
- **Rich text editors** to visualize and format user data.
- **Google sign-in authentication** for secure user logins with private/public route protection.
- A **dashboard** that visualizes user profile trends using React charts and integrates the counter component for real-time interaction.

## Key Features

### 1. **Counter Component**
- Increment, decrement, and reset buttons.
- Background color dynamically changes based on the counter value, with a smooth transition following a Bezier curve.
- The reset button reverts the background color to its initial state.

### 2. **User Data Form**
- Captures name, address, email, and phone number.
- **Auto-generates a user ID** upon form submission.
- **Data Persistence**: Saves the user data using local storage or Redux Toolkit (RTK).
- **Unsaved Changes Warning**: Shows a pop-up alert if there are unsaved changes when the user attempts to close the browser.
- **Sign-Up/Sign-In**: Secure sign-up and sign-in functionality with validation.

### 3. **Rich Text Editors**
- Visualize and format user data in a rich text editor.
- Includes options for **bold, italic, underline, and lists**.
- **Data persistence** ensures that all changes made in the editor are saved and displayed correctly.

### 4. **Authentication**
- Implements **Google Sign-In** for secure user authentication.
- Private and public routes are defined to protect sensitive user data.
- Mock authentication ensures proper validation for authentication flow.

### 5. **Dashboard with React Charts**
- A user-friendly dashboard visualizes profile trends and counter statistics.
- **React Charts** are used to display key user profile metrics and visualize data trends interactively.

### 6. **Smooth Animations with React Spring**
- The app is enhanced with smooth animations powered by **React Spring**, ensuring a seamless, modern user experience.

## Installation

To set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/rinshina/count-react-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd count-react-app
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```

## Usage

### Running the Application

Start the app with:
```bash
npm start
