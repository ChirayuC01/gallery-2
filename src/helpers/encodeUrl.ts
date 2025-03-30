export function encodeSpaces(url: string): string {
    return url.replace(/ /g, '%20');
}