import React, { useState, useEffect } from "react";

const WalletConnector = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [telegramWallet, setTelegramWallet] = useState(null);

  useEffect(() => {
    console.log("WalletConnector mounted");
    // Check if we're in Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Detected Telegram Web App");
      setIsTelegram(true);
      const tg = window.Telegram.WebApp;

      // Initialize Telegram wallet if available
      if (tg.MainButton && tg.initDataUnsafe?.user) {
        setTelegramWallet(tg);
      }
    } else {
      console.log("Detected web browser");
    }
  }, []);

  const connectPhantomWallet = async () => {
    try {
      // Check if Phantom is installed
      if (!window.solana || !window.solana.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        return;
      }

      // Connect to Phantom
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
      setIsConnected(true);

      console.log(
        "Connected to Phantom wallet:",
        response.publicKey.toString()
      );
    } catch (error) {
      console.error("Phantom connection failed:", error);
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

  console.log(
    "WalletConnector render - isTelegram:",
    isTelegram,
    "isConnected:",
    isConnected
  );

  return (
    <div
      className="wallet-connector"
      style={{ border: "2px solid red", padding: "10px" }}
    >
      <div style={{ color: "red", fontSize: "12px", marginBottom: "5px" }}>
        DEBUG: WalletConnector is rendering
      </div>
      {isTelegram ? (
        // Telegram Web App - use Telegram wallet
        !isConnected ? (
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
        )
      ) : // Web browser - use Phantom wallet
      !isConnected ? (
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
};

export default WalletConnector;
