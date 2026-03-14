import { useState, useEffect } from 'react'
import Filters from './components/Filters'
import MovieCard from './components/MovieCard'
import Watchlist from './components/Watchlist'
import MoodSelector from './components/MoodSelector'

function App() {
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=65aa18a7bf9a1a98ae883bf0e1c74d06&language=fr-FR`)
      .then(res => res.json())
      .then(data => setGenres(data.genres))
  }, [])

  const fetchRandomMovie = () => {
    setLoading(true)
    const pageAleatoire = Math.floor(Math.random() * 500) + 1
    const indexAleatoire = Math.floor(Math.random() * 20)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${pageAleatoire}`)
        .then(response => response.json())
        .then(data => {
            setFilm(data.results[indexAleatoire])
            setLoading(false)
        })
        .catch(error => {
            console.error("Erreur :", error)
            setLoading(false)
        })
  }

  const fetchMovie = (genre, annee, note) => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&with_genres=${genre}&primary_release_year=${annee}&vote_average.gte=${note}`)
      .then(response => response.json())
      .then(data => {
          const indexAleatoire = Math.floor(Math.random() * data.results.length)
          setFilm(data.results[indexAleatoire])
          setLoading(false)
      })
      .catch(error => {
          console.error("Erreur :", error)
          setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pb-16">
      <div>
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8 tracking-wide">Que regarder ce soir ?</h1>
        <hr className="border-gray-700 mb-8" />
        <MoodSelector onMoodSelect={(genreId) => fetchMovie(genreId, "", 0)} />
        <hr className="border-gray-700 my-8" />
        <Filters onSearch={fetchMovie} onRandom={fetchRandomMovie} />
        {loading ? (
            <div className="flex justify-center mt-8">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : (
            film && <MovieCard key={film.id} film={film} genres={genres} onAddToWatchlist={addToWatchlist} />
        )}
        <hr className="border-gray-700 my-12" />
        <Watchlist watchlist={watchlist} genres={genres} onRemove={removeFromWatchlist} />
      </div>
    </div>
  )
}

export default App