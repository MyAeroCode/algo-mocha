import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: true,
    });
    window.maximize();
    window.loadFile(path.join(__dirname, "..", "..", "index.html"));
});
