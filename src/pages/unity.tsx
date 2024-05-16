import React, { useEffect, useRef } from 'react';
import Home from "@/pages/index";
import {useWallet} from "@solana/wallet-adapter-react";
import {Button} from "react-bootstrap";

interface UnityProps {
    gameName: string;
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    scriptUrl: string;
    setUnityInstance: (instance: any) => void;
}

const UnityComponent: React.FC<UnityProps> = ({ gameName, dataUrl, frameworkUrl, codeUrl, scriptUrl, setUnityInstance }) => {
    const unityContainerRef = useRef<HTMLDivElement>(null); // Ref to Unity container
    const closeButtonRef = useRef<HTMLDivElement>(null); // Ref to Unity container
    const backgroundRef = useRef<HTMLDivElement>(null); // Ref to Unity container

    const { publicKey } = useWallet();

    useEffect(() => {
        const container = unityContainerRef.current;
        const canvas = container?.querySelector("#unity-canvas") as HTMLCanvasElement;

        if (!container || !canvas) {
            console.error("Unity component elements not found.");
            return;
        }

        // Check if the script has already been appended
        const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
        if (existingScript) {

            console.log("Script already exists, skipping appending.");
            return;
        }

        const config = {
            dataUrl: dataUrl,
            frameworkUrl: frameworkUrl,
            codeUrl: codeUrl,
            streamingAssetsUrl: "StreamingAssets",
            companyName: "StrayCatTribe",
            productName: gameName,
            productVersion: "1.0",
        };

        const script = document.createElement("script");
        script.src = scriptUrl;

        script.onload = () => {
            (window as any).createUnityInstance(canvas, config, (progress: any) => {
            }).then((unityGameInstance: any) => {
                (window as any).globalUnityInstance = unityGameInstance;
                console.log(unityGameInstance);

                if(publicKey != null) unityGameInstance.SendMessage("GameManager", "SetUsername", publicKey.toString())
            });
        };

        document.body.appendChild(script);

    }, [gameName, dataUrl, frameworkUrl, codeUrl, scriptUrl, setUnityInstance]);

    function handleCloseClick() {
        if ((window as any).globalUnityInstance) {
            (window as any).globalUnityInstance.Quit();
        }
        if (backgroundRef.current) {
            backgroundRef.current.style.display = "none";
        }
    }

    function unityFullScreen() {
        if ((window as any).globalUnityInstance) {
            (window as any).globalUnityInstance.SetFullscreen(1);
        }
    }

    return (
        <div ref={backgroundRef} className={"unityBackground"}>
            <div ref={closeButtonRef} className={"closeButton"}>
            <Button onClick={handleCloseClick}>
                X
            </Button>
            </div>
            <div ref={unityContainerRef} id="unity-container" className="unity-desktop">
                <canvas id="unity-canvas" width="960" height="600"></canvas>
                <div id="unity-loading-bar">
                    <div id="unity-logo">
                        <img src={"/TemplateData/unity-logo-dark.png"}></img>
                    </div>
                    <div id="unity-progress-bar-empty">
                        <div id="unity-progress-bar-full"></div>
                    </div>
                </div>
                <div id="unity-warning"> </div>
                <div id="unity-footer">
                    <div id="unity-webgl-logo"><img src={"/TemplateData/webgl-logo.png"}></img></div>
                    <div id="unity-fullscreen-button">
                        <a href={"#"} onClick={unityFullScreen}>
                            <img src={"/TemplateData/fullscreen-button.png"}></img>
                        </a>
                    </div>
                    <div id="unity-build-title">{gameName} @ Stray Cat Tribe</div>
                </div>
            </div>
        </div>

    );
};

export default UnityComponent;
