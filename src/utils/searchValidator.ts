export function validateSearch(query?: string) : boolean {
    if (!query) return false;
    const regex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s\-_.,]+$ /;
    return !regex.test(query);
}