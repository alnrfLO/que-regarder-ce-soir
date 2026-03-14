function MovieCard({ film , genres , onAddToWatchlist }) {

    const genreNames = film.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : "Inconnu";
    }).join(", ");
    return (
        <div className="fade-in max-w-sm mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mt-8">
            <img className="w-full object-cover" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
            <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{film.title}</h2>
                <p className="text-gray-300 mb-4">
                    {film.overview ? film.overview : "Aucune description disponible pour ce film."}
                </p>
                <p className="text-gray-400">
                    <span className="font-bold">Genre :</span> {genreNames.length > 0 ? genreNames : "Non renseigné"}
                </p>
                <p className="text-gray-400">
                    <span className="font-bold">Année :</span> {film.release_date ? film.release_date.slice(0, 4) : "Inconnue"}
                </p>
                <p className="text-gray-400">
                    <span className="font-bold">Note :</span> {film.vote_average ? film.vote_average.toFixed(1) : "Non noté"}
                </p>
                <button onClick={() => onAddToWatchlist(film)}className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"> Ajouter à ma liste</button>
            </div>
        </div>
    )
}

export default MovieCard