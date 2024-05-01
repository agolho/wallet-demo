import React, { useEffect, useRef } from 'react';
import Home from "@/pages/index";

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
            });
        };

        document.body.appendChild(script);

    }, [gameName, dataUrl, frameworkUrl, codeUrl, scriptUrl, setUnityInstance]);

    return (
        <div ref={unityContainerRef} id="unity-container" className="unity-desktop">
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
                <div id="unity-build-title">{gameName} @ Stray Cat Tribe</div>
            </div>
        </div>
    );
};

export default UnityComponent;
