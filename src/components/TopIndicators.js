/***************************************************************************
 * TOP INDICATORS (DEXSCREENER VERSION)
 * This component fetches the token's price and 24-hour performance from a 
 * DexScreener pair endpoint. It displays price & 24h change top-left, and 
 * a contract address with a copy button top-right.
 ***************************************************************************/


import React, { useState, useEffect } from "react";
import { Button} from "react95";

const DEXSCREENER_PAIR_ADDRESS = "3gbbkbvn95e1uger8mynspjcldu59johk9rmcd24kdhz";
const CONTRACT_ADDRESS = "G8GdCEU4C7QrZTXKtpikGxDjp9xAAmT6Dmp4BfRypump";

const TopIndicators = () => {
    const [price, setPrice] = useState("Loading...");
    const [priceChange, setPriceChange] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDexScreenerData = async () => {
            try {
                const url = `https://api.dexscreener.com/latest/dex/pairs/solana/${DEXSCREENER_PAIR_ADDRESS}`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }
                const data = await res.json();

                // Check if the data has 'pair' info
                if (!data || !data.pair) {
                    throw new Error("No pair data found");
                }

                const currentPrice = parseFloat(data.pair.priceUsd);
                const change24h = data.pair.priceChange ? data.pair.priceChange.h24 : 0;

                setPrice(currentPrice.toFixed(6)); // 6 decimals or adjust as needed
                setPriceChange(change24h);
                setError(null);
            } catch (err) {
                console.error("Error fetching from DexScreener:", err);
                setPrice("Error");
                setPriceChange(0);
                setError(err.message);
            }
        };

        fetchDexScreenerData();
        const interval = setInterval(fetchDexScreenerData, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    let changeColor = 'white';
    if (priceChange > 0) changeColor = '#15bf64';
    else if (priceChange < 0) changeColor = 'red';

    const formattedChange = `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}%`;

    const shortAddress = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS)
            .then(() => alert('Address copied!'))
            .catch((err) => console.error('Could not copy address:', err));
    };

    return (
        <>
            {/* Top-left Price & 24h Performance */}
            <div
                style={{
                    position: 'absolute',
                    top: '80px',
                    right: '20px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px',
                }}
            >
                <span style={{ fontSize: '1.1rem', color: 'white', fontWeight: "lighter" }}>
                    {price}
                </span>
                {!error && (
                    <span style={{ transform: "translateY(-10px)", fontSize: '0.8rem', color: changeColor, fontWeight: "bold" }}>
                        {formattedChange}
                    </span>
                )}
            </div>

            {/* Top-right Contract Address + Copy Button */}
            <div
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontFamily: 'ms_sans_serif',
                }}
            >

                <Button
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: '1.0rem',
                        height: '30px',
                        width: "70px",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={copyToClipboard}
                >
                    Copy
                </Button>

                <span
                    style={{
                        color: "white",
                        width: "100px",
                        padding: '2px 4px',
                        fontSize: '1rem'
                    }}
                >
                    {shortAddress}
                </span>
            </div>
        </>
    );
};

export default TopIndicators;