# 🎬 Que regarder ce soir ?

Une application web pour trouver facilement un film à regarder grâce aux données de l'API TMDB.

🔗 **Demo en ligne** : [que-regarder-ce-soir.vercel.app](https://que-regarder-ce-soir.vercel.app)

---

## ✨ Fonctionnalités

- 🔍 **Recherche par filtres** — genre, année de sortie, note minimale
- 🎲 **Mode aléatoire** — un film surprenant en un clic
- 😂😱😢🚀❤️💥 **Suggestions par humeur** — trouve un film selon ton état d'esprit
- ❤️ **Watchlist** — sauvegarde et retire des films de ta liste personnelle
- 🎞️ **Affichage complet** — affiche, titre, résumé, genre, année, note
- ⚡ **Animations** — fade in et spinner de chargement

---

## 🛠️ Technologies utilisées

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Vercel](https://vercel.com/) pour le déploiement

---

## 🚀 Installation locale
```bash
git clone https://github.com/alnrfLO/que-regarder-ce-soir.git
cd que-regarder-ce-soir
npm install
```

Crée un fichier `.env` à la racine :
```
VITE_API_KEY=ta_clé_tmdb
```

Lance le projet :
```bash
npm run dev
```

---

## 📁 Structure du projet
```
src/
├── components/
│   ├── Filters.jsx       # Filtres genre, année, note
│   ├── MovieCard.jsx     # Carte d'affichage d'un film
│   ├── MoodSelector.jsx  # Suggestions par humeur
│   └── Watchlist.jsx     # Liste des films sauvegardés
├── App.jsx               # Composant principal
└── main.jsx              # Point d'entrée
```

---

## 🔑 API

Ce projet utilise l'API de [The Movie Database (TMDB)](https://www.themoviedb.org/).  
Pour obtenir une clé API gratuite, crée un compte sur TMDB et demande une clé dans les paramètres.

---

*Projet réalisé dans le cadre d'un apprentissage de React.*
