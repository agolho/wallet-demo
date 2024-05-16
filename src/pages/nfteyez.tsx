import React, { useEffect, useState, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { resolveToWalletAddress, getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const NftEyez = ({ walletPublicKey }: { walletPublicKey: string }) => {
    const [network] = useState(WalletAdapterNetwork.Mainnet);
    const connection = useMemo(() => new Connection(clusterApiUrl(network)), [network]);
    const { publicKey } = useWallet();
    const [nftAccounts, setNftAccounts] = useState<any[]>([]);

    useEffect(() => {
        const fetchNFTAccounts = async () => {
            try {
                if (!walletPublicKey) return;

                const publicAddress = await resolveToWalletAddress({ text: walletPublicKey });

                const nftArray = await getParsedNftAccountsByOwner({ publicAddress, connection });

                console.log('NFT Accounts:', nftArray);

                // Store the NFT accounts in state
                setNftAccounts(nftArray);
            } catch (error) {
                console.error('Error occurred while fetching Solana NFT list:', error);
            }
        };

        fetchNFTAccounts();
    }, [connection, walletPublicKey]);

    return (
       <></>
    );
};

export default NftEyez;
