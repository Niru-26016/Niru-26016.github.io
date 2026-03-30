# 👨‍💻 Niranjan Reddy — Developer Portfolio

A modern, GitHub-themed developer portfolio built with **React**, **Tailwind CSS**, and **Framer Motion**. Features live GitHub data (pinned repos, contribution graph) via an Express backend proxy.

🌐 **Live:** [niranjanreddy.me](https://niranjanreddy.me)

---

## ✨ Features

- 🎨 **GitHub Dark Theme** — Authentic GitHub-inspired UI with monospaced typography
- 📊 **Live Contribution Graph** — Real-time heatmap fetched from GitHub GraphQL API
- 📌 **Pinned Repositories** — Automatically displays your pinned repos with stars, forks, and topics
- 💻 **Tech Stack Showcase** — Interactive badges with brand-colored hover glows
- 🏆 **Certifications** — Dynamic brand-colored card effects
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- ⚡ **Premium Animations** — Cursor-tracking spotlight, magnetic buttons, shimmer effects
- 🌙 **Dark Mode** — Beautiful dark-first design

## 🛠️ Tech Stack

| Layer      | Technologies                                        |
| ---------- | --------------------------------------------------- |
| Frontend   | React 19, Vite, Tailwind CSS 3, Framer Motion       |
| Backend    | Express.js (serverless on Vercel)                    |
| API        | GitHub GraphQL API                                   |
| Deployment | Vercel                                               |
| Icons      | Lucide React, Devicons                               |

## 🚀 Local Development

### Prerequisites

- **Node.js** 18+
- **GitHub Personal Access Token** with `read:user` scope — [Generate one here](https://github.com/settings/tokens)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Niru-26016/Niru-26016.github.io.git
cd Niru-26016.github.io

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Configure environment
cp server/.env.example server/.env
# Edit server/.env and add your GITHUB_TOKEN

# 4. Start development servers
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:3001`.

## 🌐 Deployment (Vercel)

This project is configured for **one-click Vercel deployment**:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the environment variable `GITHUB_TOKEN` in Vercel → Settings → Environment Variables
4. Deploy!

The `vercel.json` configuration handles routing `/api/*` to the Express serverless function and everything else to the React frontend.

## 📁 Project Structure

```
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Root component
│   │   └── index.css       # Global styles
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Express backend (GitHub API proxy)
│   ├── index.js            # API routes
│   ├── .env.example        # Environment template
│   └── package.json
├── vercel.json             # Vercel deployment config
└── README.md
```

## 📄 License

MIT © [Niranjan Reddy](https://github.com/Niru-26016)

---

Built with ❤️ by Niranjan Reddy