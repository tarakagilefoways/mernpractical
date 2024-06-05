
export const saveKeyValue = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
}

export const getKeyValue = (key: string) => {
    return sessionStorage.getItem(key);
}