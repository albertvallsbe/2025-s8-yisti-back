# 🎓 2025-S7 Pràctica Acadèmica / 2025-S7 Academic Practice

🎬 Yisti Back 🎬

![Imatge de la card](./src/assets/images/welcome.png)
![Imatge de la card](./src/assets/images/login.png)
![Imatge de la card](./src/assets/images/cards.png)
![Imatge de la card](./src/assets/images/aside-preview.png)
![Imatge de la card](./src/assets/images/detail-top.png)
![Imatge de la card](./src/assets/images/detail-down.png)

## 📚 Índex / Table of Contents

1. [Sobre el projecte / About](#1-sobre-el-projecte--about)
2. [Funcionalitats / Features](#2-funcionalitats--features)
3. [Tecnologia / Tech Stack](#3-tecnologia--tech-stack)
4. [Demo en línia / Live Demo](#4-demo-en-línia--live-demo)
5. [Repositori front / Front repository](#5-repositori-front--front-repository)
6. [Repositori backend / Backend repository](#6-repositori-back--back-repository)
7. [Instal·lació / Installation](#7-instal·lació--installation)

## 1. Sobre el projecte / About

**CAT:**

🧭 **Yisti** és una aplicació web creada com a projecte acadèmic que combina gestió d’usuaris, mapes, calendari i gràfics dins d’una arquitectura completa _frontend–backend_.

L’objectiu és integrar diferents tecnologies modernes per oferir una experiència funcional i visualment clara.

💻 El frontend està desenvolupat amb `React i TypeScript sobre Vite`, incorpora `Redux Toolkit` per a la gestió d’estat i `SCSS amb metodologia BEM` per als estils.
Inclou un CRUD d’usuaris, calendari d’esdeveniments, mapes interactius i gràfics visuals per a una experiència completa i dinàmica.

⚙️ El backend creat amb `Node.js, Express i Sequelize`, connecta amb `PostgreSQL` per gestionar dades i autenticació amb contrasenyes xifrades.
Ofereix rutes REST per a usuaris, esdeveniments i ubicacions, seguint una estructura modular i segura.

🗄️ Implementada amb `PostgreSQL` en contenidors `Docker`, amb suport de `pgAdmin` per la seva administració i consulta durant el desenvolupament.

☁️ El **frontend** està allotjat a `Netlify` i el **backend** a `Railway`, mantenint els serveis separats per garantir escalabilitat i mantenibilitat.

**EN:**

🧭 **Yisti** is a web application created as an academic project that combines user management, maps, calendar, and charts within a complete _frontend–backend_ architecture.

The goal is to integrate modern technologies to deliver a functional and visually clear experience.

💻 The frontend is developed with `React and TypeScript using Vite`, incorporates `Redux Toolkit` for state management, and `SCSS with BEM methodology` for styling.  
It includes a full user CRUD, event calendar, interactive maps, and visual charts for a complete and dynamic experience.

⚙️ The backend, built with `Node.js, Express, and Sequelize`, connects to `PostgreSQL` to manage data and authentication with encrypted passwords.  
It provides REST routes for users, events, and locations, following a modular and secure structure.

🗄️ Implemented with `PostgreSQL` in `Docker` containers, with `pgAdmin` support for database administration and inspection during development.

☁️ The **frontend** is hosted on `Netlify` and the **backend** on `Railway`, keeping services separated to ensure scalability and maintainability.

## 2. Funcionalitats / Features

- ✅ **Node.js** with **Express** for routing and REST API
- ✅ **React + TypeScript** with **Vite** for frontend development
- ✅ **Redux Toolkit** for global state management
- ✅ **PostgreSQL** with **Sequelize ORM** for data management
- ✅ **Authentication with encrypted passwords**
- ✅ **Interactive maps** using **Mapbox GL**
- ✅ **Event calendar** with **FullCalendar**
- ✅ **Visual charts** using **Chart.js**
- ✅ **Testing** with **Jest** and **React Testing Library**
- ✅ **Docker containers** with **pgAdmin** for database management
- ✅ **Deployment** on **Netlify** (frontend) and **Railway** (backend)

---

## 3. Tecnologia / Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **React**
- **Vite**
- **Redux Toolkit**
- **SCSS (BEM)**
- **Sequelize**
- **PostgreSQL**
- **Passport**
- **Mapbox GL**
- **FullCalendar**
- **Chart.js**
- **Jest**
- **Docker**
- **pgAdmin**
- **Netlify**
- **Railway**

## 4. Demo en línia / Live Demo

**Live:** 👉 https://yisti.netlify.app/home

User: `guest@gmail.com`
Password: `guest2025`

**CAT:**
Visita la demo en línia per veure l’aplicació en funcionament.

**EN:**
Check out the live demo to see the application in action.

## 5. Repositori front / Front repository

**Github:** 👉 https://github.com/albertvallsbe/2025-s8-f-yisti

## 6. Repositori backend / Backend repository

**Github:** 👉 https://github.com/albertvallsbe/2025-s8-b-yisti

## 7. Instal·lació / Installation

**CAT:**

_Segueix aquests passos per clonar el projecte i fer servir el compilador Node i ExpressJS per obrir el projecte en mode developer en local._

**EN:**

_Follow these steps to clone the project and use the Node and ExpressJS compiler to open the project in local developer mode._

**Requeriments / Prerequisites**

- Node.js
- Docker
- WSL - Windows subsistem for Windows
- PostgresSQL and PgAdmin

### 1) Clonar el repositori / Clone the repository

```bash
git clone https://github.com/albertvallsbe/2025-s8-b-yisti.git
```

### 2) Entrar al directori del projecte / Navigate into the project directory

```
cd 2025-s7-b-yisti
```

### 3) Instal·lar dependències / Install dependencies

```
npm i
```

### 4) Crea el fitxer `.env` en base al `.env.example` i demana les dades / Create your local `.env` from the provided template and fill in the required values.

```
cp .env.example .env
```

### 5) Executar el compilador de Node and Express per a desenvolupament / Run Node and Express compiler in developer mode

```
npm run build-w
```

```
npm run start-w
```

### 6) Obre el live Server de Vite / Open the Live Server of Vite

```
http://localhost:3006
```

### 7) Crea la base de dades de PostgreSQL amb Docker / Create PostgreSQL database with Docker

```
docker compose up -d postgres-yisti
```

```
docker compose up -d pgadmin-yisti
```

### 8) Corre les migracions i les dades llavor / Run migrations and seed

```
npm run migrations:run
```

```
npm run migrations:seeds:run
```
