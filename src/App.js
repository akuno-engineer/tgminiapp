import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [webApp, setWebApp] = useState(null);

  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      setWebApp(tg);
    }
  }, []);

  const handlePop = () => {
    setCount((prevCount) => prevCount + 1);

    // Optional: Show a haptic feedback
    if (webApp && webApp.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Counter Mini App</h1>

      <div className="counter-container">
        <div className="counter-text">{count}</div>
        <button className="pop-button" onClick={handlePop}>
          Pop! +1
        </button>
      </div>

      <p style={{ fontSize: "14px", opacity: 0.7 }}>
        Tap the button to increase the counter
      </p>
    </div>
  );
}

export default App;
