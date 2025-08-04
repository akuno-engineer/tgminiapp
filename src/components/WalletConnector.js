import React, { useState, useEffect } from "react";
import { TonConnect } from "@tonconnect/sdk";

const WalletConnector = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [telegramWallet, setTelegramWallet] = useState(null);
  const [tonConnector, setTonConnector] = useState(null);

  useEffect(() => {
    // Initialize TON Connect
    const connector = new TonConnect({
      manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
    });
    setTonConnector(connector);

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

    // Listen for wallet connection changes
    connector.onStatusChange((wallet) => {
      if (wallet) {
        console.log("TON wallet connected:", wallet);
        setWalletAddress(wallet.account.address);
        setIsConnected(true);
      } else {
        console.log("TON wallet disconnected");
        setWalletAddress("");
        setIsConnected(false);
      }
    });

    // Check if already connected
    connector.getWallet().then((wallet) => {
      if (wallet) {
        setWalletAddress(wallet.account.address);
        setIsConnected(true);
      }
    });
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

  const connectTONWallet = async () => {
    if (tonConnector) {
      try {
        console.log("Connecting to TON wallet...");
        await tonConnector.connect();
      } catch (error) {
        console.error("TON wallet connection failed:", error);
        alert("Failed to connect to TON wallet. Please try again.");
      }
    }
  };

  const connectTelegramWallet = async () => {
    if (telegramWallet) {
      try {
        // Request wallet access in Telegram
        telegramWallet.showAlert("Connecting to TON wallet...");

        // Use TON Connect for Telegram too
        await connectTONWallet();
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

    if (tonConnector) {
      tonConnector.disconnect();
    }

    setWalletAddress("");
    setIsConnected(false);
  };

  const getShortAddress = (address) => {
    if (!address) return "";

    // Handle TON addresses (48 chars starting with EQ)
    if (address.startsWith("EQ") && address.length === 48) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Handle Solana addresses (44 chars)
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    return address;
  };

  if (isTelegram) {
    // Telegram Web App - use TON wallet
    console.log("Rendering TON wallet button for Telegram");
    return (
      <div className="wallet-connector">
        {!isConnected ? (
          <button
            className="telegram-wallet-button"
            onClick={connectTelegramWallet}
          >
            Connect TON Wallet
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
