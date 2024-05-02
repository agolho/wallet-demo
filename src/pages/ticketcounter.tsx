import React from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import ProgressBar from 'react-bootstrap/ProgressBar';

const TicketCounter = () => {
    const publicKey = useWallet().publicKey;

    // Check if publicKey is not null or empty
    const showCounter = publicKey && publicKey !== '';

    return (
        <div className="ticketCounter">
            {showCounter && (
                <>
                    <p><img src={'/icons/ticketicon.png'} width={30} height={30}></img> </p>
                    <ProgressBar now={calculateProgress(publicKey)} label={getTicketCount(publicKey)} />
                </>
            )}
        </div>
    );
};

// Function to get ticket count (replace with your logic)
const getTicketCount = (publicKey: string) => {
    // Replace with your logic to fetch ticket count based on publicKey
    return 1; // Example
};

// Function to calculate progress (replace with your logic)
const calculateProgress = (publicKey: string) => {
    // Replace with your logic to calculate progress based on ticket count
    return 10; // Example
};

export default TicketCounter;
