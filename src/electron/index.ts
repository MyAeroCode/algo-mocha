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

    if (process.env.NODE_ENV === "dev") {
        window.loadURL("http://localhost:8080");
    } else {
        window.loadFile(path.join(__dirname, "..", "..", "index.html"));
    }
});
