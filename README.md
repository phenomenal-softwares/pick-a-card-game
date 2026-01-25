## 📱 Pick-A-Card

Pick-A-Card is a mobile-first casual card-picking game built with Expo (React Native). The game is designed exclusively for mobile devices, delivering a focused, playful experience with achievements, power-ups, sound effects, and themed visuals.

Desktop access is intentionally restricted to preserve gameplay integrity and design intent.

## ✨ Features

- 🎴 Card Picking Gameplay – Simple, fast, and engaging mechanics
- 💲 Game Shopping - Buy powerup items with game coins
- 🏆 Achievements System – Unlock milestones with rewards
- 🚩Stats - Track your progress over time
- ⚡ Power-Ups – Strategic boosts such as Peek, True Sight, and more
- 🎵 Sound & Music System – Interactive feedback and background audio
- 🎨 Custom Fonts & Assets – Handpicked visuals and typography
- 📱 Mobile-Only Enforcement – Desktop users are blocked by design
- 🌐 Expo Web Support – Allows mobile browsers without compromising UX

## 🛠️ Tech Stack

- Framework: Expo (React Native)
- Languages: JavaScript
- Platforms: iOS, Android, Web (mobile browsers only)
- State Management: React Hooks
- Assets: Expo Asset & Font loading
- Navigation: React Navigation
- Deployment (Web): Vercel

## 🚀 Getting Started
# Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo CLI
- npm install -g expo-cli

# Installation

Install dependencies:

- npm install
- Running the App
- Mobile (Recommended)
- expo start

# Scan the QR code using Expo Go (iOS/Android)

- Web (Mobile Browser Only)
- expo start --web


## ⚠️ Desktop browsers are intentionally blocked.
Resize your window to a mobile width or use a mobile browser.

## 📐 Design Philosophy

- Mobile-first, always
- No compromised desktop layouts
- Predictable gameplay over responsive guesswork
- Performance and simplicity over overengineering

This project intentionally avoids scaling gameplay for large screens.

## 🧩 Project Structure (Simplified)
src/
 ├── screens/
 │   ├── LoadingScreen/
 │   ├── MainMenuScreen/
 │   ├── GameScreen/
 │   └── ExtrasScreen/
 ├── components/
 ├── data/
 │   ├── achievements.js
 │   └── powerups.js
 ├── utils/
 │   └── soundManager.js
assets/
 ├── fonts/
 ├── animals/
 └── card/

## 🔒 Desktop Restriction

Desktop users are blocked at the Loading Screen level using runtime screen size detection. This ensures:

- No unnecessary asset loading
- No broken UI
- Clear user messaging

This behavior is intentional and permanent unless explicitly changed.

## 🌐 External Links

# Official Website:
https://phenomenalproductions.com.ng

All external links within the app point to the official Phenomenal Productions website.

## 🏢 Company
Phenomenal Productions -
Digital products, games, and interactive experiences.

For licensing or usage inquiries, written authorization is required.

## 📄 License
See the LICENSE file for full terms.
