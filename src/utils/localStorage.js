let localSettings = JSON.parse(localStorage.getItem("settings"));

if (localSettings === null)
    localSettings = {};

function saveToLocalSettings(key, value) {
    localSettings[key] = value;
    localStorage.setItem("settings", JSON.stringify(localSettings));
}

export {
    localSettings,
    saveToLocalSettings
};