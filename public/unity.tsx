import React, { useEffect } from 'react';

const UnityComponent = () => {
    useEffect(() => {
        const container = document.querySelector("#unity-container");
        const canvas = document.querySelector("#unity-canvas");
        const loadingBar = document.querySelector("#unity-loading-bar");
        const progressBarFull = document.querySelector("#unity-progress-bar-full");
        const fullscreenButton = document.querySelector("#unity-fullscreen-button");
        const warningBanner = document.querySelector("#unity-warning");

        // Define unityShowBanner and other functions here...

        const buildUrl = "Data/Speedy";
        const loaderUrl = buildUrl + "/speedypaws.loader.js";
        const config = {
            dataUrl: buildUrl + "/speedypaws.data.unityweb",
            frameworkUrl: buildUrl + "/speedypaws.framework.js.unityweb",
            codeUrl: buildUrl + "/speedypaws.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "StrayCatTribe",
            productName: "SpeedyPaws",
            productVersion: "1.0",
        };

        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Mobile device style: fill the whole browser client area with the game canvas:
            // Handle mobile-specific configurations
        } else {
            // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
            // Handle desktop-specific configurations
        }

        loadingBar.style.display = "block";

        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            window.createUnityInstance(canvas, config, (progress) => {
                progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
                loadingBar.style.display = "none";
                fullscreenButton.onclick = () => {
                    unityInstance.SetFullscreen(1);
                };
            }).catch((message) => {
                alert(message);
            });
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div id="unity-container" className="unity-desktop">
            <canvas id="unity-canvas" width="1280" height="720"></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-warning"> </div>
            <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">Speedy Paws @ Stray Cat Tribe</div>
            </div>
        </div>
    );
};

export default UnityComponent;
