let localSettings = JSON.parse(localStorage.getItem("settings")) ?? {};

export default {
    set: (key, value) => {
        localSettings[key] = value;
        localStorage.setItem("settings", JSON.stringify(localSettings));
    },
    get: (key, _default) => {
        return localSettings[key] ?? _default;
    },
    delete: (key) => {
        delete localSettings[key];
        localStorage.removeItem(key);
    }
}