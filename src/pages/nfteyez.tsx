import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

const NftEyez = ({ walletPublicKey, nftCollectionId }: { walletPublicKey: string, nftCollectionId: string }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [hasNftFromCollection, setHasNftFromCollection] = useState(false);

    useEffect(() => {
        const fetchNFTAccounts = async () => {
            try {
                if (!publicKey) return;

                const ownerPublicKey = new PublicKey(walletPublicKey);
                const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
                    programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // Solana SPL Token program ID
                });

                // Filter NFT accounts by collection ID
                const nftAccountsInCollection = tokenAccounts.value.filter((account) => {
                    return account.account.data.parsed.info.mint === nftCollectionId;
                });

                // Check if at least one NFT from the collection is found
                const hasNftFromCollection = nftAccountsInCollection.length > 0;
                setHasNftFromCollection(hasNftFromCollection);
            } catch (error) {
                console.error('Error occurred while fetching Solana NFT list:', error);
            }
        };

        fetchNFTAccounts().then(r => {});
    }, [connection, walletPublicKey, publicKey, nftCollectionId]);

    return hasNftFromCollection;
};

export default NftEyez;
