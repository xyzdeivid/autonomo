export function isStringValid(name: string): boolean {

    return name.trim().length > 0

}

export function canEditName(name: string): boolean {

    // Verificando se nome é valido
    if (typeof name !== 'string' || !isStringValid(name)) return false

    return true

}