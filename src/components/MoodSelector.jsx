function MoodSelector({ onMoodSelect }) {
    const moods = [
        { id: 35, emoji: "😂", name: "Bonne humeur" },
        { id: 27, emoji: "😱", name: "Frissons" },
        { id: 18, emoji: "😢", name: "Émotion" },
        { id: 878, emoji: "🚀", name: "Aventure" },
        { id: 10749, emoji: "❤️", name: "Romance" },
        { id: 28, emoji: "💥", name: "Action" },
    ]

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
            {moods.map((mood) => (
                <button
                    key={mood.id}
                    onClick={() => onMoodSelect(mood.id)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    {mood.emoji} {mood.name}
                </button>
            ))}
        </div>
    )
}

export default MoodSelector