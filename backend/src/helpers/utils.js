import path from "path";
import url from "url";

export function getPaths(fileUrl) {
    const __filename = url.fileURLToPath(fileUrl);
    const __dirname = path.dirname(__filename);

    return { __filename, __dirname };
}