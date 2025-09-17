# React Pokédex  

> A **Stylish Pokédex** built with **React** and **Vite**. Browse and explore Pokémon with a modern, responsive UI.  

![React](https://img.shields.io/badge/React-19.1-blue?logo=react)  
![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)  
![License](https://img.shields.io/badge/license-MIT-green)  
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)  

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup & Run](#setup--run)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)

---

## Features
- Browse Pokémon with **interactive cards** showing images types and moves  
- **Modal pop-ups** for detailed information regareding Pokémon moves
- Responsive **side navigation** and header  
- Lightweight and fast thanks to **Vite**  
- Component-based architecture (`PokeCard`, `TypeCard`, `Modal`, etc.)  
- **Caching of Pokémon data** for faster load times and reduced network requests  
- **Data fetched from the Pokémon API** for up-to-date Pokémon information  

---

## Demo
🔗 [Click here to try the app](https://flashypokedex.netlify.app/)   
  
<img width="817" height="431" alt="React Pokédex Screenshot" src="https://via.placeholder.com/800x400.png?text=React+Pok%C3%A9dex" />


---

## Technologies
- **React 19** — front-end library with hooks (`useState`, `useEffect`)  
- **Vite** — fast development and build tool  
- **ESLint** — code quality enforcement  
- **CSS** — custom styling (`fanta.css`, `index.css`)  
- ***Pokémon API** — external API providing Pokémon data  

---

## Getting Started

### Prerequisites
- Node.js ≥ 18  
- npm ≥ 9  

### Setup & Run
```bash
# Clone the repo
git clone https://github.com/<your-username>/react-pokedex.git

# Navigate into the project
cd react-pokedex

# Install dependencies
npm install

# Run the development server
npm run dev
```
Open your browser at http://localhost:5173 to see the app in action.

---

### Usage
- Browse Pokémon: Scroll through the Pokédex on the Side Bar
- View details: Click on a Pokémon to open a details with pictures, types, stats, and moves
- View Move Details: Click on a move to open Modal with move description
- Navigation: Use the side navigation or header
- Filter or search Pokémon 
---

### Project Structure
```bash
react-pokedex/
├── public/
│   └── pokemon/          # Pokémon images (001–151)
├── src/
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   ├── PokeCard.jsx
│   │   ├── SideNav.jsx
│   │   └── TypeCard.jsx
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   ├── fanta.css         # Custom styles
│   └── index.css         # Global styles
├── package.json
├── vite.config.js
└── README.md
```
---
### Credits
- Pokémon images preloaded from public domain / official sprites
- CSS styling inspired by Fantacss by jamezmca — MIT License

### License 
This project is licensed under the MIT License 