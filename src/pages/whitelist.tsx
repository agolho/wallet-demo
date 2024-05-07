import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const WhitelistComponent = () => {
    const publicKey = useWallet().publicKey;
    const [whitelist, setWhitelist] = useState<string[]>([]);

    useEffect(() => {
        fetch('/whitelist.txt') // Assuming whitelist.txt is in your public directory
            .then(response => response.text())
            .then(data => setWhitelist(data.split('\n').map(line => line.trim())))
            .catch(error => console.error('Error fetching whitelist:', error));
    }, []);

    // Check if the user's publicKey is in the whitelist
    const isInWhitelist = whitelist.includes(publicKey?.toString() as string);

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
