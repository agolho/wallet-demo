import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const WhitelistComponent = () => {
    const publicKey = useWallet().publicKey;
    const [whitelistFromFile, setWhitelistFromFile] = useState<string[]>([]);
    const [whitelistFromEnv, setWhitelistFromEnv] = useState<string[]>([]);

    useEffect(() => {
        // Fetch whitelist from whitelist.txt file
        fetch('/whitelist.txt') // Assuming whitelist.txt is in your public directory
            .then(response => response.text())
            .then(data => setWhitelistFromFile(data.split('\n').map(line => line.trim())))
            .catch(error => console.error('Error fetching whitelist from file:', error));

        // Parse public keys from process.env.ALLOWED_WALLETS
        const allowedWallets = process.env.ALLOWED_WALLETS?.split(',').map(key => key.trim());
        setWhitelistFromEnv(allowedWallets || []);
    }, []);

    // Combine both whitelists
    const combinedWhitelist = [...whitelistFromFile, ...whitelistFromEnv];

    // Check if the user's publicKey is in the combined whitelist
    const isInWhitelist = combinedWhitelist.includes(publicKey?.toString() as string);

    return (
        <div className={"whitelist"}>
            {isInWhitelist && (
                <div className={"wlBadge"} >
                    <img src={"/icons/fluffy.png"} className={"img-fluid img"} height={30} width={30}></img>
                    <span className="wlText">Whitelist</span>
                </div>
            )}
        </div>
    );
};

export default WhitelistComponent;

