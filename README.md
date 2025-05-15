# 🚇 Kanpur Metro Project – Android App & Web Platform

An intuitive, user-friendly transit solution built for **Kanpur Metro commuters**, designed to simplify journey planning, fare calculation, and access to metro information via both an Android mobile app and a responsive website.

---

## 📱 Overview

This project delivers a **cross-platform urban mobility experience** through:
- A full-featured **Android app** (built with React + Capacitor)
- A responsive **web interface** for public access & APK distribution

🎯 Goal: Make metro travel in Kanpur **smarter, faster, and accessible** using modern tech and user-centric design.

---

## ✨ Features

### ✅ Mobile App (Android)
- 🚉 **Plan Journey** – Route, travel time, platform info
- 💰 **Fare Calculator** – Smart Card vs Regular fare + savings
- 🏙️ **Station Info** – Lifts, platforms, line info, upcoming trains
- 🗺️ **Metro Map** – Interactive city metro network
- 📢 **Real-time Status** – Metro operational status
- 🌐 **Multilingual UI** – English (EN) supported

### 💻 Website
- 📥 **Direct APK Download** – App available outside Play Store
- 🌍 **Web Access** – All features available on any browser
- 🧭 **Responsive Design** – Works across devices

---

## 🛠️ Tech Stack

| Layer         | Tools / Libraries                          |
|---------------|---------------------------------------------|
| Frontend      | React, TypeScript, Vite                     |
| Mobile Shell  | Capacitor (WebView-based Android App)       |
| Styling       | Tailwind CSS, Radix UI, Shadcn Components   |
| State Mgmt    | React Context API, TanStack React Query     |
| Forms         | React Hook Form, Zod                        |
| Routing       | React Router DOM                            |
| UI/UX         | Lucide Icons, Tailwind Animate              |
| Build Tools   | Bun, ESLint, PostCSS, Autoprefixer          |

---

## 📁 Project Structure

├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based screens
│ ├── data/ # Static metro data (stations, routes, fares)
│ ├── contexts/ # Theme and metro data context
├── public/ # Static assets & APK
├── dist/ # Production build output


---

## 🚀 Getting Started

### 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Capacitor CLI](https://capacitorjs.com/docs/getting-started)
- [Android Studio](https://developer.android.com/studio) (for building and running APK)

---

## 📱 Android Build Instructions

Follow these steps to build and run the Android APK:

```bash
# Sync the Capacitor Android project
npx cap sync android

# Open the project in Android Studio
npx cap open android

# Then build and run the APK using Android Studio


---
