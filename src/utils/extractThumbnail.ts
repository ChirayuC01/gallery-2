import { getThumbnail, saveThumbnail } from "./indexedDB";

export const extractThumbnail = async (videoUrl: string): Promise<string> => {
    const cachedThumbnail = await getThumbnail(videoUrl);
    if (cachedThumbnail) return cachedThumbnail;

    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.currentTime = 2;
        video.muted = true;
        video.playsInline = true;

        video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL("image/jpeg");
                saveThumbnail(videoUrl, thumbnail); // Store in IndexedDB
                resolve(thumbnail);
            } else {
                reject("Failed to create canvas context");
            }
        };

        video.onerror = () => reject("Failed to load video");
    });
};
