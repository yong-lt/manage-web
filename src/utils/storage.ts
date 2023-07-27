export const Local = {
    set(key: string, val: any) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    get(key: string) {
        const json = window.localStorage.getItem(key) || "{}";
        return JSON.parse(json);
    },
    remove(key: string) {
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    },
};
