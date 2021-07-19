
function helperfn() {
    console.log(`List of all the commands:

    node myUtil.js view <dir-name> flat
    node myUtil.js view <dir-name> tree
    node myUtil.js organize <dir-name>
    node myUtil.js organize 
    node myUtil.js help

    ---------------------------------------
    --------------------------------------

    For GLOBAL Commands

    myutil view <dir-name> flat
    myutil view <dir-name> tree
    myutil organize <dir-name>
    myutil organize 
    myutil help
`);
}

// nodejs -> export
module.exports={
    help_fn:helperfn
}
