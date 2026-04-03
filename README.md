# MyBMI — Modern & Accessible BMI Calculator

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

A professional, fully optimized BMI (Body Mass Index) calculator built with React, TypeScript, and Tailwind CSS. This application is designed for speed, accessibility (WCAG compliant), and complete user privacy.

## ✨ Features

- 🧮 **Instant Calculations** — Real-time Body Mass Index results based on height and weight.
- 📏 **Multi-Unit Support** — Seamlessly switch between Metric (kg, cm) and Imperial (lbs, in, ft) units.
- 📄 **PDF Reports** — Generate and download high-quality PDF reports of your BMI results.
- 📱 **Fully Responsive** — Beautifully crafted UI optimized for all devices (mobile, tablet, and desktop).
- 🌓 **Theme Aware** — Modern glassmorphism design that adapts to your environment.
- ♿ **Accessible** — Built with semantic HTML and ARIA labels for an inclusive experience.
- 🔍 **SEO Optimized** — Includes structured data, meta tags, and PWA manifest for search engine visibility.

## 🛡️ Privacy & Security

MyBMI is built with a **Privacy-First** approach:
- All calculations are performed **locally in your browser**.
- No personal data (name, height, weight, etc.) is transmitted to or stored on any server.
- PDF reports are generated entirely on your device.
- No third-party tracking or advertising scripts are included.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bmi-calculator.git
   cd bmi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to see the application.

## 📦 Deployment

### Vercel (Recommended)
This project is configured for one-click deployment on Vercel.

1. Connect your repository to Vercel.
2. Vercel will automatically detect the Vite environment.
3. Deploy!

### Manual Build
To create a production-ready build:
```bash
npm run build
```
The optimized files will be available in the `dist/` directory.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
