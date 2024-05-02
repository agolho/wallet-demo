import React from "react";

const Homepage = () => {
    return (
        <div className={"main-content-inside"}>
            {/* Add your Connect Wallet page content here */}
            <video src={"/video/lofi.mp4"} autoPlay muted></video>
            <div className={"homepage-titles"}>
                <h1>Stray Cat Tribe</h1>
                <h3>Game HUB</h3>
            </div>
        </div>
    );
};

export default Homepage;