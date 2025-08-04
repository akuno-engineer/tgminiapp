# Telegram Mini App - Counter

A simple counter Mini App for Telegram built with React JS.

## Features

- Simple counter that increments by +1
- "Pop" button with haptic feedback
- Telegram theme integration
- Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm start
```

This will start the development server at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

This creates a `build` folder with the production-ready files.

## Deploying to Telegram

### Step 1: Create a Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Save the bot token

### Step 2: Set up Mini App

1. Send `/newapp` to BotFather
2. Select your bot
3. Choose "Custom App"
4. Enter app title: "Counter Mini App"
5. Enter app short name: "counter"
6. Enter app description: "A simple counter app"
7. Upload an app icon (512x512 PNG)
8. Enter the URL where your app will be hosted

### Step 3: Deploy Your App

You can deploy to any static hosting service:

#### Option A: Netlify (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy

#### Option B: Vercel

1. Push your code to GitHub
2. Import your repo to Vercel
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Deploy

#### Option C: GitHub Pages

1. Add `"homepage": "https://yourusername.github.io/reponame"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
4. Run `npm run deploy`

### Step 4: Configure Bot

1. Send `/setmenubutton` to BotFather
2. Select your bot
3. Enter the URL of your deployed app
4. Enter button text: "Open Counter App"

## Testing Your Mini App

1. Find your bot on Telegram
2. Click the menu button or send `/start`
3. Click "Open Counter App"
4. Test the counter functionality

## Development Tips

- Use `window.Telegram.WebApp` to access Telegram's Web App API
- The app automatically adapts to Telegram's theme
- Test on both light and dark themes
- Use haptic feedback for better UX

## File Structure

```
├── public/
│   └── index.html          # Main HTML file with Telegram script
├── src/
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   └── index.css          # Styles with Telegram theme support
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Troubleshooting

- Make sure your app URL is accessible via HTTPS
- Check that the Telegram Web App script is loaded
- Verify your bot token and app configuration
- Test on both mobile and desktop Telegram clients
