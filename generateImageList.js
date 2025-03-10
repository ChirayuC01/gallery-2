const fs = require("fs");
const path = require("path");

// Paths for images and video directories
const imagesDir = path.join(__dirname, "public/images");
const videoDir = path.join(__dirname, "public/video");

// Output file path
const outputFile = path.join(__dirname, "/src/lib/mediaList.ts");

// Function to recursively get files organized by folder names
const getMediaFiles = (dir, baseUrl) => {
    const result = {};

    const traverse = (currentPath, relativePath = "") => {
        const files = fs.readdirSync(currentPath);

        files.forEach((file) => {
            const fullPath = path.join(currentPath, file);
            const fileRelativePath = path.join(relativePath, file);
            const folderName = relativePath.split(path.sep)[0] || "root"; // Root folder for loose files

            if (fs.statSync(fullPath).isDirectory()) {
                traverse(fullPath, fileRelativePath);
            } else {
                if (!result[folderName]) result[folderName] = [];
                result[folderName].push(`${baseUrl}/${fileRelativePath.replace(/\\/g, "/")}`);
            }
        });
    };

    traverse(dir);
    return result;
};

// Get image and video files
const images = getMediaFiles(imagesDir, "/images");
const video = getMediaFiles(videoDir, "/video");

// Generate TypeScript file
const tsContent = `// Auto-generated file. Do not edit manually.

export const mediaList = {
  images: ${JSON.stringify(images, null, 2)},
  video: ${JSON.stringify(video, null, 2)}
};
`;

fs.writeFileSync(outputFile, tsContent, "utf8");

console.log("✅ Media list has been generated successfully!");
