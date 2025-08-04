import React, { useState, useEffect } from "react";
import { ponzimonCards } from "./cardData";

function App() {
  const [buzzCount, setBuzzCount] = useState(0);
  const [webApp, setWebApp] = useState(null);
  const [currentCard, setCurrentCard] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // Audio files for zapp sounds
  const zappSounds = ["/sfx/zapp1.mp3", "/sfx/zapp2.mp3", "/sfx/zapp3.mp3"];

  // Preload critical images
  useEffect(() => {
    // Preload logo and grass tile
    const preloadImages = [
      "/images/ponzimonlogo.png",
      "/images/tile_grass.png",
      "/images/background.png",
    ];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload first few Ponzimon cards for faster initial load
    const preloadCards = ponzimonCards.slice(0, 10);
    preloadCards.forEach((card) => {
      const img = new Image();
      img.src = `/images/cards/${card}`;
    });
  }, []);

  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      setWebApp(tg);
    }

    // Set initial random card
    setCurrentCard(getRandomCard());

    // Play ponzimonSFX on page load as looping soundtrack
    const ponzimonAudio = new Audio("/sfx/ponzimonSFX.mp3");
    ponzimonAudio.volume = 0.1; // 10% volume
    ponzimonAudio.loop = true; // Loop the soundtrack
    ponzimonAudio.preload = "auto"; // Preload the audio

    // Try to play the soundtrack
    const playSoundtrack = async () => {
      try {
        await ponzimonAudio.play();
      } catch (error) {
        console.log("Ponzimon SFX autoplay failed:", error);
        // Add a click event listener to start the soundtrack on first user interaction
        const startSoundtrack = () => {
          ponzimonAudio
            .play()
            .catch((e) => console.log("Soundtrack play failed:", e));
          document.removeEventListener("click", startSoundtrack);
        };
        document.addEventListener("click", startSoundtrack);
      }
    };

    playSoundtrack();
  }, []);

  const getRandomCard = () => {
    return ponzimonCards[Math.floor(Math.random() * ponzimonCards.length)];
  };

  const formatCardName = (filename) => {
    // Remove .png extension and card_ prefix
    const nameWithoutExt = filename.replace(".png", "");
    // Split by underscore and get the name part (after the number)
    const parts = nameWithoutExt.split("_");
    if (parts.length >= 3) {
      // Join all parts after the first two (card_ and number)
      return parts.slice(2).join(" ");
    }
    return nameWithoutExt.replace("card_", "");
  };

  const playRandomZapp = () => {
    const randomZapp =
      zappSounds[Math.floor(Math.random() * zappSounds.length)];
    const audio = new Audio(randomZapp);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      console.log("Audio play failed:", error);
    });
  };

  const handleBuzz = () => {
    setBuzzCount((prevCount) => prevCount + 1);

    // Reset animation state first
    setIsShaking(false);
    setIsFlashing(false);

    // Small delay to ensure state reset
    setTimeout(() => {
      // Start animations
      setIsShaking(true);
      setIsFlashing(true);
    }, 10);

    // Play random zapp sound
    playRandomZapp();

    // Change to new random card
    setCurrentCard(getRandomCard());

    // Stop shake animation after 500ms
    setTimeout(() => {
      setIsShaking(false);
    }, 500);

    // Stop flash animation after 300ms
    setTimeout(() => {
      setIsFlashing(false);
    }, 300);

    // Optional: Show a haptic feedback
    if (webApp && webApp.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred("medium");
    }
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img
          src="/images/ponzimonlogo.png"
          alt="Ponzimon Logo"
          className="logo"
        />
      </div>

      <div className="counter-container">
        <div
          className="background-overlay"
          style={{
            backgroundImage: "url(/images/background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: "0.05",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            animation: "backgroundScroll 30s linear infinite",
          }}
        ></div>

        <div className="coming-soon-text">
          Coming Soon to Telegram!
          <br />
          maybe?
        </div>

        <div className="card-container">
          <div className="card-wrapper">
            <div className="composite-card">
              <img
                src="/images/tile_grass.png"
                alt="Grass Ground"
                className="grass-tile"
              />
              <img
                src={`/images/cards/${currentCard}`}
                alt="Ponzimon Card"
                className={`creature-image ${isShaking ? "jump" : ""}`}
              />
            </div>
            <div className="card-name">{formatCardName(currentCard)}</div>
            {/* Blue flash overlay for card and name */}
            {isFlashing && <div className="card-flash-overlay"></div>}
          </div>
        </div>

        <button className="buzz-button" onClick={handleBuzz}>
          BUZZ!
        </button>

        <div className="counter-text">Buzzed {buzzCount} times</div>
      </div>

      <p className="instruction-text">
        Tap BUZZ to shake the card and get a new Ponzimon!
      </p>
    </div>
  );
}

export default App;
