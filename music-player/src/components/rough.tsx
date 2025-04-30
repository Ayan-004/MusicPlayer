return (
    <div className="song-preview-container w-2xs flex flex-col item-center">
        <div className="song-list w-full space-y-4">
            {track.map((items, index) => {
                return (
                    <div key={index} className="song-item bg-gray-200 p-10 rounded-4xl shadow-md">
                        <h2 className="text-2xl font-calsans mb-4">Top Tracks</h2>
                        <p className="font-montserrat-medium text-lg">{items.trackName} - {items.artistName}</p>
                        {items.previewUrl ? (
                            <audio controls src={items.previewUrl} className="w-full mt-2"></audio>
                        ) : (
                            <p className="text-xs text-gray-500">No preview available</p>
                        )
                    }
                    </div>  
                )
            })}
        </div>
    </div>
)






<div className="flex flex-col items-end pr-10 -mt-72 h-full rounded-4xl">