// modules required to export
let fs = require("fs");
let path = require("path");
let types = require("./util.js");

function organizefn(src) {
    if(src==undefined){
        src = process.cwd(); // current folder
    }
    // Step 1 => Need to Create Organised Folder inside current directory    
    // Example : downloads folder is current folder
    // url : downloads/organised_folder
    //so basicallly we created a url(path) of new folder
    // now we will check wheter this url is present or not
    // through which we get to know whether folder is present or not

    let folderToMake = path.join( src , "Organized_Folder" );

    if(fs.existsSync(folderToMake) == false ){
        // folder(url) does not exist
        // so we create new folder

        fs.mkdirSync(folderToMake);
    }

    organize(src,folderToMake);
    // src          -> like downloads
    // folderToMake -> like downloads/organised_folder


}

function organize(src,dest){
    // src  -> like downloads
    // dest -> like downloads/organised_folder

    // There can be file or folder inside source
    //              if File   -> Check extension and copy to folder accordingly
    //              if Folder -> Recusive call to do work

    let isFile = isFileOrNot(src);
    if(isFile == true){
        // check extension
        let typeOfFolder = checkExtension(src);
        // now copy file from src to dest inside typeOfFolder
        sendFile(src , dest , typeOfFolder);
    }else{
        // folder is there
       let insideFiles =  readContent(src); // return array
       // recursion to get files inside folder
       for(let i = 0 ; i<insideFiles.length ; i++ ){
           let childfile =  insideFiles[i];
           let newpath = path.join(src,childfile);
           organize( newpath , dest );
       }
    }
}
function isFileOrNot(src){
    return fs.lstatSync(src).isFile();
}
function readContent(src){
   return fs.readdirSync(src);
}  
function checkExtension(src){

    //Example =>   F:\PAB_DEV\file_system_activity_1\activity\commands\help.js
    // so ( js ) is the extension
    //so split url with ( . )
    let array = src.split(".");
    let ext = array.pop(); // last element is returned
    for(let type in types.obj ){
        // ex : type = archieve
        // so types.type => it will search type inside types
        // but on types[type] => it will search on types.archieve
        for(let i = 0 ; i< types.obj[type].length ; i++ ){
          //  types[type]  give an array
          if ( types.obj[type][i] == ext ){
              return type;
          }
        }
    }
    return "others"
}

function sendFile(src,dest_Of_Organised_Folder,typeOfFolder){
    // src is path of file to be copied
    // dest_Of_Organised_Folder is path of organised_folder
    // ex->  dest_Of_Organised_Folder :  downloads/organised_folder/

    let dest = path.join(dest_Of_Organised_Folder,typeOfFolder);
    // ex->  dest :  downloads/organised_folder/archieve

    // Need to check Type of Extension Folder present in Destination or not

    if(fs.existsSync(dest)==false ){
        // folder not exist , so make it...
        fs.mkdirSync(dest);
    }
    // Steps => 
    //          1. now copy content from src to dest
    //          2. ex:  downloads/organised_folder/archieve/  copy here
    //          3. after copy => downloads/organised_folder/archieve/video.mp4
    //          4. src=> downloads/vi/video.mp4 -> path.basename(src) -> video.mp4

    let finalpath = path.join(dest,path.basename(src));
    // now => downloads/organised_folder/archieve/video.mp4

    // 2 files with same name in different folder can be there in source so

    if ( fs.existsSync(finalpath)==true ){
        let changed = path.join(dest,Math.random().toString()+path.basename(src));
        // now => C/downloads/organised_folder/text/0.5f1.txt  
        // name changes so copy content takes place at diff path
        fs.copyFileSync(src , changed );
    }else{
        // copyFileSync => copy from param1 and paste in param 2 path
        fs.copyFileSync(src, finalpath); 
    }

}


// nodejs -> export

module.exports = {
    org_fn: organizefn
}
