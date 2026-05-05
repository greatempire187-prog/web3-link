Web3 Wallet Application

This is a modern and responsive web application that combines user authentication, email verification, and Web3 wallet integration. It allows users to sign up, verify their accounts, and connect their crypto wallets like MetaMask and Coinbase Wallet.

Features
Authentication System

The app includes a complete user authentication flow. Users can register with proper form validation, log in and out, and stay logged in through session storage. Email verification is also included (simulated for demo purposes).

Wallet Integration

Users can easily connect their crypto wallets. The app supports both MetaMask and Coinbase Wallet, displays the connected wallet address, and allows users to disconnect whenever they want.

Responsive Design

The interface is built to work smoothly across all devices. It follows a mobile-first approach and adapts well to tablets and desktops. The design uses modern styling, including gradients, animations, and clean layouts.

File Structure

The project is simple and organized:

index.html – Main structure of the app
styles.css – All styling and layout design
script.js – Handles functionality and interactions
README.md – Project documentation
How to Use
1. Register an Account

Open the app in your browser and fill in the registration form. You’ll need:

A username (at least 3 characters, letters/numbers/underscore)
A valid email address
A strong password (minimum 8 characters with uppercase, lowercase, and a number)

Click Sign Up to continue.

2. Verify Your Email

After registering, you’ll be asked to verify your email.
For this demo, the verification code will appear in the browser console.

Enter the 6-digit code
Click Verify Email
3. Log In

Switch to the login page, enter your email and password, and click Sign In to access your dashboard.

4. Connect Your Wallet

Once logged in:

Click on either MetaMask or Coinbase Wallet
Approve the connection in the wallet popup
Your wallet address will be displayed on the screen
Technical Overview
Frontend Technologies

The app is built using:

HTML5 for structure
CSS3 for styling and responsiveness
Modern JavaScript (ES6+) for functionality
Key Implementations

Form Validation
The system checks user input in real time, ensuring correct email format, strong passwords, and valid usernames.

Email Verification
A verification code is generated and shown in the console (for demo purposes), with an option to resend it.

Wallet Integration
The app connects to MetaMask using window.ethereum and also supports Coinbase Wallet. It handles connection status and displays the wallet address clearly.

Session Management
User sessions are stored using localStorage, allowing users to remain logged in even after refreshing the page.

Browser Compatibility

The app works well on all major browsers, including:

Chrome (recommended)
Firefox
Safari
Edge
Wallet Setup Requirements

Before using wallet features:

Install the MetaMask or Coinbase Wallet extension
Create or import your wallet
Make sure your wallet is active and on the correct network
Security Notes

This project is a frontend-only demo, so a few things are simplified:

Passwords are stored in localStorage (not secure for real applications)
Email verification is simulated
No backend security is implemented

For a real-world project, you’ll need a proper backend system for authentication and data protection.

Responsive Design

The layout adapts to different screen sizes:

Mobile: below 480px
Tablet: 480px to 768px
Desktop: above 768px
Getting Started

To run the project:

Download or clone the files
Open index.html in your browser
Install a wallet extension for full functionality
Register, verify your email, and log in
Connect your wallet
Future Improvements

Some useful upgrades you can add later:

Backend API integration
Real email services like SendGrid or AWS SES
Transaction history
Multi-network wallet support
Better security features