import React, { useState, useEffect } from "react";

const WalletConnector = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [telegramWallet, setTelegramWallet] = useState(null);

  useEffect(() => {
    // Check if we're in Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // More specific check for Telegram Web App
      if (tg.initDataUnsafe && tg.initDataUnsafe.user && tg.platform) {
        console.log("Detected Telegram Web App");
        setIsTelegram(true);
        setTelegramWallet(tg);
      } else {
        console.log("Detected web browser (not Telegram)");
        setIsTelegram(false);
      }
    } else {
      console.log("Detected web browser (no Telegram object)");
      setIsTelegram(false);
    }
  }, []);

  const connectPhantomWallet = async () => {
    console.log("Attempting to connect to Phantom wallet...");
    console.log("window.solana:", window.solana);
    console.log("window.solana.isPhantom:", window.solana?.isPhantom);

    try {
      // Check if Phantom is installed
      if (!window.solana || !window.solana.isPhantom) {
        console.log("Phantom not detected, redirecting to install page...");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      console.log("Phantom detected, attempting connection...");
      // Connect to Phantom
      const response = await window.solana.connect();
      console.log("Phantom connection response:", response);

      setWalletAddress(response.publicKey.toString());
      setIsConnected(true);

      console.log(
        "Connected to Phantom wallet:",
        response.publicKey.toString()
      );
    } catch (error) {
      console.error("Phantom connection failed:", error);
      alert(
        "Failed to connect to Phantom wallet. Please make sure Phantom is installed and try again."
      );
    }
  };

  const connectTelegramWallet = async () => {
    if (telegramWallet) {
      try {
        // Request wallet access in Telegram
        telegramWallet.showAlert("Connecting to Telegram wallet...");

        // Simulate wallet connection (replace with actual Telegram wallet API)
        const mockAddress = "telegram-wallet-" + Date.now();
        setWalletAddress(mockAddress);
        setIsConnected(true);

        console.log("Telegram wallet connected:", mockAddress);
      } catch (error) {
        console.error("Telegram wallet connection failed:", error);
        telegramWallet.showAlert("Failed to connect wallet");
      }
    }
  };

  const disconnectWallet = () => {
    if (isTelegram && telegramWallet) {
      telegramWallet.showAlert("Wallet disconnected");
    } else if (window.solana) {
      window.solana.disconnect();
    }

    setWalletAddress("");
    setIsConnected(false);
  };

  const getShortAddress = (address) => {
    if (!address) return "";
    return address.length > 10
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  };

  if (isTelegram) {
    // Telegram Web App - use Telegram wallet
    console.log("Rendering Telegram wallet button");
    return (
      <div className="wallet-connector">
        {!isConnected ? (
          <button
            className="telegram-wallet-button"
            onClick={connectTelegramWallet}
          >
            Connect Telegram Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <span className="wallet-address">
              {getShortAddress(walletAddress)}
            </span>
            <button className="disconnect-button" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  } else {
    // Web browser - use Phantom wallet
    console.log("Rendering Phantom wallet button");
    return (
      <div className="wallet-connector">
        {!isConnected ? (
          <button
            className="phantom-wallet-button"
            onClick={connectPhantomWallet}
          >
            Connect Phantom Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <span className="wallet-address">
              {getShortAddress(walletAddress)}
            </span>
            <button className="disconnect-button" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default WalletConnector;
