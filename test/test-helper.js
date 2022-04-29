const {phrases} = require("../src/jscrisp");

function Open_Browser(){
    console.log("Opened the browser");
}

function Write_Username(username){
    console.log("Wrote username "+username);
}

phrases.push({phrase:"Write .* to password", func: Write_Password})
function Write_Password(pass){
    console.log("Write_Password "+pass);
}

function Check(expected){
    console.log("Expected: "+expected);
}

module.exports = {Open_Browser, Write_Username, Write_Password, Check}