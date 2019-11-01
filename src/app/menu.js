const DIVIDER = "__DIVIDER__";

const onNewFile = () => {
    console.log("clicked new file");
}

const onSaveFile = () => {
    console.log("clicked save file");
}

const onCloseFile = () => {
    console.log("clicked close file");
}

const menuOptionsConfig = {
    File: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ],
    Edit: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ],
    View: [
        {
            optionLabel: "New File",
            optionFunc: onNewFile
        },
        {
            optionLabel: "Save",
            optionFunc: onSaveFile
        },
        DIVIDER,
        {
            optionLabel: "Close",
            optionFunc: onCloseFile
        }
    ]
}

export default menuOptionsConfig;