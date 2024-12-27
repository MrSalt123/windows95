import React, { useState } from "react";

// Example placeholder images — in a real app, replace these with actual file paths!
import musicIco from "../assets/images/musicIco.png";


const MusicFolderContent = () => {
  const [playing, setPlaying] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Each track includes a 'name' plus an 'icon' (the image)
  const tracks = [
    { id: 1, name: "Revolution", icon: musicIco },
    { id: 2, name: "Mah G", icon: musicIco },
    { id: 3, name: "Memetrack", icon: musicIco },
  ];

  const playMusic = (trackName) => {
    setPlaying(trackName);
    alert(`Now playing: ${trackName}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "Arial, sans-serif",
        color: "black",
        padding: "10px",
      }}
    >

      {/* Row container for all track items */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px", // space between track icons
          alignItems: "flex-start",
        }}
      >
        {tracks.map((track) => {
          const isHovered = hoveredId === track.id;

          return (
            <div
              key={track.id}
              onMouseEnter={() => setHoveredId(track.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => playMusic(track.name)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100px",
                cursor: "pointer",
                padding: "10px",
                backgroundColor: isHovered ? "#e8e8e8" : "transparent",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* Large track icon (image) */}
              <img
                src={track.icon}
                alt={track.name}
                style={{ width: "100%", height: "100%", marginBottom: "5px" }}
              />

              {/* Track name below the icon */}
              <span style={{ textAlign: "center" }}>{track.name}</span>
            </div>
          );
        })}
      </div>

      {/* Display the currently playing track (if any) */}
      {playing && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Currently playing: {playing}
        </p>
      )}
    </div>
  );
};

export default MusicFolderContent;
