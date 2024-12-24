// src/utils/musicFolder.js
import React, { useState } from "react";

const MusicFolderContent = () => {
    const [playing, setPlaying] = useState(null);

    const tracks = [
        { id: 1, name: "8Bit - Revolution" },
        { id: 2, name: "Mah G" },
        { id: 3, name: "Memetrack" },
    ];

    const playMusic = (trackName) => {
        setPlaying(trackName);
        alert(`Now playing: ${trackName}`);
    };

    return (
        <div
            style={{
                textAlign:"left",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "10px",
                gap: "10px",
                fontFamily: "Arial, sans-serif",
                color: "black",
            }}
        >
            <h3>Music Folder</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => playMusic(track.name)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",

                        }}
                    >
                        🎵 {track.name}
                    </button>
                ))}
            </div>
            {playing && <p>Currently playing: {playing}</p>}
        </div>
    );
};

export default MusicFolderContent;
