export function sanitize(str: string): string {
    return str
        .replace(/<[^>]*>/g, '') // Enlever HTML
        .replace(/[<>'"]/g, '') // Enlever caractères dangereux
        .trim()
        .slice(0, 2000); // Limiter la longueur
}