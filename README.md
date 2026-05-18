# Amediå — Digital Hub

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-green?style=flat-square&logo=greensock)](https://gsap.com/)

Official digital hub for **amediå** — marketing and software development studio. Currently featuring the main corporate landing page, with the architecture built to support our internal ecosystem and future studio projects.

---

## 🚀 Overview

This repository serves as the central hub for Amediå's digital presence. While we are launching with our premium corporate website, this workspace is designed to scale and house a variety of applications and tools.

### Ecosystem Roadmap
- **Corporate Landing Page** (Current): A premium, animated experience showcasing our services and portfolio.
- **Internal Ecosystem** (Planned): Tools and platforms used internally by the studio.
- **Studio Projects** (Planned): Future and ongoing products developed by Amediå.


## ✨ Features

- **Premium Aesthetics**: Modern UI with a focus on visual excellence.
- **Advanced Animations**: Powered by GSAP and Framer Motion for a dynamic user experience.
- **Smooth Scrolling**: Integrated with Lenis for a seamless feel.
- **Multilingual Support**: Localization system (NO/RU/EN) for global reach.
- **Optimized Performance**: Built on the latest Next.js and React stack.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Runtime**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📁 Project Structure

```text
Amedia/
├── website_public/      # Main corporate website and public hub
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context providers
│   │   ├── lib/         # Utility functions
│   │   └── locales/     # Translation files (JSON)
│   └── public/          # Static assets
└── images/              # Shared assets and documentation images
```

## 🏁 Getting Started

To run the public website locally:

1. Navigate to the project directory:
   ```bash
   cd website_public
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

© 2026 Amediå. All rights reserved.
