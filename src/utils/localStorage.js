let localSettings = JSON.parse(localStorage.getItem("settings"));

if (localSettings === null)
    localSettings = {};

localSettings.default = (key, _default) => {
    return localSettings[key] ? localSettings[key] : (localSettings[key] = _default);
}

function saveToLocalSettings(key, value) {
    localSettings[key] = value;
    localStorage.setItem("settings", JSON.stringify(localSettings));
}

export {
    localSettings,
    saveToLocalSettings
};