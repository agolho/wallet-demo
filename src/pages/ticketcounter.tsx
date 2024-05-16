import React from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js"; // Import PublicKey
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Button} from "react-bootstrap";

const TicketCounter = () => {
    const publicKey = useWallet().publicKey;

    // Check if publicKey is not null
    const showCounter = publicKey !== null;




    return (
        <div className="ticketCounter">
            {showCounter && (
                <>
                    <p><img src={'/icons/ticketicon.png'} width={30} height={30} alt="Ticket Icon" /></p>
                    <ProgressBar now={calculateProgress(publicKey!)} label={getTicketCount(publicKey!)} />
                </>
            )}
        </div>
    );
};

// Function to get ticket count (replace with your logic)
const getTicketCount = (publicKey: PublicKey) => {
    // Replace with your logic to fetch ticket count based on publicKey
    return '1'; // Example
};

// Function to calculate progress (replace with your logic)
const calculateProgress = (publicKey: PublicKey) => {
    // Replace with your logic to calculate progress based on ticket count
    return 20; // Example
};

export default TicketCounter;
