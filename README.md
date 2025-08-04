# Telegram Mini App - Ponzimon Buzzer

A fun Ponzimon-themed Mini App for Telegram built with React JS. Buzz to shake Ponzimon cards and discover new creatures!

## Features

- **Ponzimon Logo** - Beautiful branding with the official logo
- **Card Collection** - Display random Ponzimon cards from a collection of 100+ creatures
- **BUZZ Button** - Tap to shake the current card and get a new random Ponzimon
- **Shake Animation** - Smooth shake effect when buzzing
- **Counter Tracking** - "Buzzed X times" counter to track your interactions
- **Haptic Feedback** - Tactile feedback on mobile devices
- **Telegram Theme Integration** - Automatically adapts to light/dark themes
- **Responsive Design** - Works perfectly on all devices

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
4. Enter app title: "Ponzimon Buzzer"
5. Enter app short name: "ponzimon-buzzer"
6. Enter app description: "Buzz to discover Ponzimon cards!"
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
4. Enter button text: "Open Ponzimon Buzzer"

## Testing Your Mini App

1. Find your bot on Telegram
2. Click the menu button or send `/start`
3. Click "Open Ponzimon Buzzer"
4. Tap BUZZ to shake cards and discover Ponzimon!

## How It Works

- **Initial Load**: Shows a random Ponzimon card from the collection
- **BUZZ Action**:
  - Increments the "Buzzed X times" counter
  - Triggers a shake animation on the current card
  - Changes to a new random Ponzimon card
  - Provides haptic feedback on mobile devices
- **Card Collection**: Features 100+ unique Ponzimon creatures
- **Responsive Design**: Optimized for all screen sizes

## Development Tips

- Use `window.Telegram.WebApp` to access Telegram's Web App API
- The app automatically adapts to Telegram's theme
- Test on both light and dark themes
- Use haptic feedback for better UX
- Cards are stored in `/public/images/cards/` directory

## File Structure

```
├── public/
│   ├── index.html          # Main HTML file with Telegram script
│   └── images/
│       ├── ponzimonlogo.png    # App logo
│       └── cards/              # 100+ Ponzimon card images
├── src/
│   ├── App.js             # Main React component with card logic
│   ├── index.js           # React entry point
│   └── index.css          # Styles with animations and responsive design
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Troubleshooting

- Make sure your app URL is accessible via HTTPS
- Check that the Telegram Web App script is loaded
- Verify your bot token and app configuration
- Test on both mobile and desktop Telegram clients
- Ensure all card images are properly loaded from `/public/images/cards/`
