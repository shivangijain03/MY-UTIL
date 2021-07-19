#!/usr/bin/env node

let helperFile = require("./commands/help.js");
let viewFile = require("./commands/view");
let organizeFile = require("./commands/organize");

let input = process.argv.slice(2);
// node mycli.js [view ,dirName, tree]
let command = input[0];
// path
switch (command) {
    case "view":
        viewFile.view_fn(input[1], input[2]);
        break;
    case "organize":
        organizeFile.org_fn(input[1]);
        break;
    case "help":
        helperFile.help_fn();
        break;
    default:
        console.log("wrong command , Type help for all the commands");
        break;
}
//view
//organize
//help