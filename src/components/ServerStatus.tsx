// components/ServerStatus.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ServerStatusProps {
    url: string;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ url }) => {
    const [isUp, setIsUp] = useState<boolean | null>(null);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setIsUp(true);
                } else {
                    setIsUp(false);
                }
            } catch (error) {
                setIsUp(false);
            }
        };

        checkServerStatus();
        const interval = setInterval(checkServerStatus, 60000); // Check every 60 seconds

        return () => clearInterval(interval);
    }, [url]);

    if (isUp === null) {
        return <p>Checking status...</p>;
    }

    return (
        <div>
            {isUp ? (
                <p>✅ Server is Up</p>
            ) : (
                <p>❌ Server is down</p>
            )}
        </div>
    );
};

export default ServerStatus;
