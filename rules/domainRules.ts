export function isStringValid(string: string): boolean {

    if (typeof string !== 'string' || !(string.trim().length > 0)) return false

    return true

}

export function isNewValueValid(value: number): boolean {

    if (typeof value !== 'number' || value <= 0) return false

    return true

}