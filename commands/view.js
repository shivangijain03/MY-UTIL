// modules required to export
let fs = require("fs");
let path = require("path");
// ---------------------------

function viewHelper(dirName, mode) {
    if (mode == "tree") {
        viewTree(dirName , "");
    } else if (mode == "flat") {
        viewFlat(dirName);
    } else {
        console.log(`Wrong Mode  
                        Type --help for commands`);
    }
}
module.exports = {
    view_fn: viewHelper
}

// -----------------------------------------------------

function viewFlat(src){

    // Find if given path is file or directory 
    let isFile = isFileOrNot(src);
    if(isFile == true){
        console.log(src + "*" );
    }
    else{
        // print
        console.log(src);
        // content read from os
        let fname = readContent(src);
        // it returns array 
        for(let i = 0 ; i<fname.length ;i++ ){
            let child  = fname[i];
            // let dirPath = src + "\\" + child; not a good practice
            let dirPath = path.join(src,child); 
            viewFlat(dirPath);
        }
    }
}

function viewTree(src , indent){
    let isFile = isFileOrNot(src);
    if(isFile == true){ // it is file
        console.log(indent , path.basename(src) , "*" );
    }
    // path.basename(src) basically returns the last one
    
    else{ // it is directory(folder)
        console.log(indent , path.basename(src)); // ( , ) or ( + ) same thing 
        let fname = readContent(src);
        for(let i = 0 ; i<fname.length ;i++ ){
            let child  = fname[i];

            let dirPath = path.join(src,child); // src + "//" + child
            // as going deep in recursion give that much tab Space 
            viewTree(dirPath , indent + "\t" );
        }
    }
}

// --------------------------------------------------------
function isFileOrNot(src){
     return fs.lstatSync(src).isFile();
}
function readContent(src){
    return fs.readdirSync(src);
}            
// -------------------------------------------------------------

// => How to shorten the url
//   1.  let path="F:\\PAB_DEV\\2_File_System_10_02_2021";
//       let pathArray=path.split("\\");
//       console.log(pathArray[pathArray.length-1]);

//       ........or.........

//   2.  similiar thing we can do using
// *path.basename("F:\\PAB_DEV\\2_File_System_10_02_2021")*

//  Output : 2_File_System_10_02_2021 ......hence we get the last name of url