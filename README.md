# 🎂 Happy Birthday React Website ✨

A modern, romantic, interactive birthday experience rewritten in **React + Vite** with a modular structure designed for effortless customization!

---

## 🚀 Features

- 💖 **Interactive Landing (Intro)**:
  - Custom heart cursor following the pointer (auto-detects touch vs mouse)
  - Floating ambient hearts & emoji atmosphere
  - Typewriter greeting effect with blinking cursor
  - Dynamic CTA button with celebratory confetti burst

- 🌟 **Why You're My Best Friend (Reasons)**:
  - Step-by-step progressive reveal of heartfelt reasons
  - Interactive hover GIF memory overlays
  - Dynamic reason counter badge
  - Transforming animated button ("Enter Our Storylane 💫")
  - Teddy hug showcase

- 📸 **Storylane & Memories**:
  - Memory photo cards with 3D hover shine and zoom effects
  - Click-to-expand lightbox photo preview modal
  - Heartfelt letter with pulsating title animation
  - Celebratory multi-color confetti cannons
  - Replay button to relive the entire experience from the beginning

- 🎵 **Floating Music Player**:
  - Soft romantic background music toggle (play/pause & mute)
  - Spinning vinyl disc animation

---

## 📁 Modular Project Structure

```text
HappyBirthdayGF/
├── public/                 # Static media assets (photos & gifs)
│   ├── d1.jpg
│   ├── d2.jpg
│   ├── d3.jpg
│   ├── gif1.gif
│   └── gif2.gif
├── src/
│   ├── data/
│   │   └── birthdayData.js # ⚙️ CENTRAL CONFIG: Edit names, text, photos & reasons here!
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomCursor.jsx   # Heart mouse follower
│   │   │   ├── FloatingHearts.jsx # Ambient floating emoji particles
│   │   │   ├── SparkleEffect.jsx  # Background twinkling sparkles
│   │   │   └── MusicPlayer.jsx    # Audio player widget
│   │   └── views/
│   │       ├── IntroView.jsx      # Page 1: Typewriter & intro
│   │       ├── ReasonsView.jsx    # Page 2: Interactive reasons & gifs
│   │       └── MemoriesView.jsx   # Page 3: Photo gallery & finale
│   ├── App.jsx             # Main router & state orchestrator
│   ├── index.css           # Global pastel gradient styling
│   └── main.jsx            # React root entrypoint
├── legacy/                 # Backup of original vanilla HTML/CSS/JS files
├── package.json
└── vite.config.js
```

---

## 🛠️ How to Customize for Future Birthdays

All configurable content is centralized in **`src/data/birthdayData.js`**!  
You do **not** need to touch the component code to change:

1. **Name & Title**:
   Edit `recipient.name`, `recipient.nickname`, and `intro.title`.
2. **Greeting**:
   Edit `intro.greeting` (the typewriter will automatically adapt to any length).
3. **Reasons**:
   Add, remove, or modify items in `reasonsSection.reasons` (text, emoji, GIF).
4. **Photos & Memories**:
   Put your pictures in `/public/` and update `memoriesSection.memories` (title, caption, image path).
5. **Final Message**:
   Edit paragraphs in `memoriesSection.finalMessage.paragraphs`.
6. **Music Track**:
   Change `music.url` to any MP3 link or local file in `/public/`.

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
