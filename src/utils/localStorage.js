let localSettings = JSON.parse(localStorage.getItem("settings"));
let settings = localSettings !== null ? localSettings : {};

function saveToLocalSettings(section, sectionSettings) {
    settings[section] = sectionSettings;
    localStorage.setItem("settings", JSON.stringify(settings));
}

function getFromLocalSettings(section) {
    return settings[section];
}

function getLocalSettings() {
    return settings;
}

export {
    saveToLocalSettings,
    getFromLocalSettings,
    getLocalSettings
};