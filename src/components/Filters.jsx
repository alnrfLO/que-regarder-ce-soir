import { useState, useEffect } from 'react'

function Filters({ onSearch, onRandom }) {

    // 1. Les useState
    const [genre, setGenre] = useState("")
    const [annee, setAnnee] = useState("")
    const [note, setNote] = useState(0)
    const [genres, setGenres] = useState([])

    // 2. Les useEffect
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`)
                const data = await response.json()
                setGenres(data.genres)
            } catch (error) {
                console.error("Erreur lors du chargement des genres :", error)
            }
        }
        fetchGenres()
    }, [])

    // 3. Les fonctions handler
    const handleGenreChange = (e) => {
        setGenre(e.target.value)
    }
    const handleAnneeChange = (e) => {
        setAnnee(e.target.value)
    }
    const handleNoteChange = (e) => {
        setNote(e.target.value)
    }
    const handleSuggerer = () => {
        onSearch(genre, annee, note)
    }

    const handleAleatoire = () => {
        onRandom()
    }

    // 4. Le return
    return (
       <div className="flex flex-wrap gap-4 justify-center mb-8">
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500" value={genre} onChange={handleGenreChange}>
                <option value="">Tous les genres</option>
                {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>
            <input type="number" className="bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:border-red-500" placeholder="Année de sortie" value={annee} onChange={handleAnneeChange} />
            <div className="flex flex-col items-center gap-1">
                <span className="text-sm text-gray-400">Note min : <span className="text-red-400 font-bold">{note}/10</span></span>
                <input 
                    type="range" 
                    min="0" max="10" step="0.5" 
                    value={note} 
                    onChange={handleNoteChange}
                    className="w-32 accent-red-500 cursor-pointer"
                />
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={handleSuggerer}>Suggérer un film</button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={handleAleatoire}>Mode aléatoire 🎲</button>
        </div>
    )

}

export default Filters