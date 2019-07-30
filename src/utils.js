const fs = require('fs')

function readFile(filePath) {
    console.log("[utils] File to be opened: ", filePath)
    fs.access(filePath, function(error){
        if(error){
            dialog.showErrorBox("File Access Error", "Cannot open file:" + filePath )
        }
        else {
            var fileStream = fs.createReadStream(filePath, 'utf8')
            fileStream.on('data', function(data){
                //console.log(data);
                remote.getCurrentWindow().webContents.send('file-data', data)
            }).on('end', function(){
                console.log("End of file")
            })
        }
    })
}

ipcRenderer.on('filename-available', function(event, arg){
    console.log("Received filename-available event:", {event, arg})
    readFile(arg)
})

// module.exports = {
//     "openFileHandler": openFileHandler
// }