interface Window {
    createUnityInstance: (canvas: HTMLCanvasElement, config: any, onProgress: (progress: number) => void) => Promise<object>; // Adjust the type if possible
}