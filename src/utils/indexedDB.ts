export const dbName = "videoThumbnails";
export const storeName = "thumbnails";

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Failed to open IndexedDB");
    });
};

export const saveThumbnail = async (videoUrl: string, thumbnail: string) => {
    const db = await openDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(thumbnail, videoUrl);
};

export const getThumbnail = async (videoUrl: string): Promise<string | null> => {
    const db = await openDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return new Promise((resolve, reject) => {
        const request = store.get(videoUrl);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject("Failed to retrieve thumbnail");
    });
};
