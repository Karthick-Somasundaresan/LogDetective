const {remote, ipcRenderer} = require('electron')
const Menu = remote.Menu
const dialog = remote.dialog
const app = remote.app

function openFileHandler(filePath) {
    console.log("[index]File to be opened: ", filePath)
    var infoHeader = document.getElementById("info_header")
    infoHeader.innerHTML = "Analysing file:" + filePath[0]
    remote.getCurrentWindow().webContents.send('filename-available', filePath[0])
  }

function createApplicationMenu() {
    var menu = Menu.buildFromTemplate([
        {
            label: "LogDetective",
            submenu:[
                {
                    label: "Preferences "
            }
            ]
        }, 
        {
            label: "File",
            submenu: [
                        {
                            label: "Open",
                            click(){dialog.showOpenDialog({properties:['openFile']}, openFileHandler)}
                        },
                        {
                            label: "Exit",
                            click(){app.quit()}
                        }
                    ]
        },
        {
            label: "Help",
            submenu: [
                {label: "About"}
            ]
        }
    ])
  Menu.setApplicationMenu(menu)
  
}
ipcRenderer.on('file-data', function(event, arg){
    //console.log("file-data event received", {event, arg});
    var logArea = document.getElementById("log_area")
    logArea.innerHTML += arg
})
console.log("Inside Renderer process")
createApplicationMenu()