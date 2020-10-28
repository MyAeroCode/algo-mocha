import { app, BrowserWindow } from "electron";
import path from "path";

app.whenReady().then(() => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: 1200,
        height: 800,
        resizable: false,
    });

    if (process.env.NODE_ENV === "dev") {
        window.loadURL("http://localhost:8080");
        window.webContents.openDevTools();
    } else {
        window.loadFile(path.join(__dirname, "..", "..", "index.html"));
    }
});
