import { useState, useEffect } from 'react'
import Filters from './components/Filters'
import MovieCard from './components/MovieCard'
import Watchlist from './components/Watchlist'

function App() {

  const [film, setFilm] = useState(null)
  const [genres, setGenres] = useState([])

  const [watchlist, setWatchlist] = useState(() => {
      const saved = localStorage.getItem("watchlist")
      return saved ? JSON.parse(saved) : []
  })

  const addToWatchlist = (film) => {
      const dejaPresent = watchlist.some(f => f.id === film.id)
      if (!dejaPresent) {
          const nouvelleWatchlist = [...watchlist, film]
          setWatchlist(nouvelleWatchlist)
          localStorage.setItem("watchlist", JSON.stringify(nouvelleWatchlist))
      }
  }
  const removeFromWatchlist = (filmId) => {
    const nouvelleWatchlist = watchlist.filter(f => f.id !== filmId)
    setWatchlist(nouvelleWatchlist)
    localStorage.setItem("watchlist", JSON.stringify(nouvelleWatchlist))
  }

  // Chargement des genres une seule fois au démarrage
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=65aa18a7bf9a1a98ae883bf0e1c74d06&language=fr-FR`)
      .then(res => res.json())
      .then(data => setGenres(data.genres))
  }, [])
  const fetchRandomMovie = () => {
    const pageAleatoire = Math.floor(Math.random() * 500) + 1
    const indexAleatoire = Math.floor(Math.random() * 20)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${pageAleatoire}`)
        .then(response => response.json())
        .then(data => setFilm(data.results[indexAleatoire]))
        .catch(error => console.error("Erreur :", error))
  }
  // Récupération d'un film selon les filtres
  const fetchMovie = (genre, annee, note) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&with_genres=${genre}&primary_release_year=${annee}&vote_average.gte=${note}`)
      .then(response => response.json())
      .then(data => setFilm(data.results[0]))
      .catch(error => console.error("Erreur :", error))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div>
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8 tracking-wide">Que regarder ce soir ?</h1>
        <hr className="border-gray-700 mb-8" />
        <Filters onSearch={fetchMovie} onRandom={fetchRandomMovie} />
        {film && <MovieCard film={film} genres={genres} onAddToWatchlist={addToWatchlist} />}
        <hr className="border-gray-700 my-12" />
        <Watchlist watchlist={watchlist} genres={genres} onRemove={removeFromWatchlist} />
      </div>
    </div>
  )
}

export default App