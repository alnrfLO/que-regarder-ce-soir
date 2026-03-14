function Watchlist({ watchlist, genres , onRemove})  {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-red-500 mb-4">Ma Watchlist ❤️</h2>
            {watchlist.length === 0 ? (
                <p className="text-center text-gray-400">Aucun film dans ta liste pour l'instant.</p>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {watchlist.map((film) => (
                        <div key={film.id} className="bg-gray-800 rounded-xl p-4 max-w-xs">
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className="rounded-lg mb-2" />
                            <h3 className="font-bold">{film.title}</h3>
                            <button onClick={() => onRemove(film.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
                                Retirer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Watchlist