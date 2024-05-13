import React, { useEffect, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const FreeStrayComponent = () => {
    const publicKey = useWallet().publicKey;
    const [whitelistFromEnv, setWhitelistFromEnv] = useState<string[]>([]);

    useEffect(() => {
        // Fetch whitelist from whitelist.txt file

        // Parse public keys from process.env.ALLOWED_WALLETS
        const allowedWallets = process.env.ALLOWED_WALLETS?.split(',').map(key => key.trim());
        setWhitelistFromEnv(allowedWallets || []);
    }, []);

    // Combine both whitelists
    const combinedWhitelist = [...whitelistFromEnv];

    // Check if the user's publicKey is in the combined whitelist
    const isInWhitelist = combinedWhitelist.includes(publicKey?.toString() as string);

    return (
        <div className={"freelist"}>
            {isInWhitelist && (
                <div className={"fsBadge"} >
                    <img src={"/icons/kitten.png"} className={"img-fluid img"} height={30} width={30}></img>
                    <span className="wlText">FreeStray</span>
                </div>
            )}
        </div>
    );
};

export default FreeStrayComponent;

