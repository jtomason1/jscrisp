
function Login(username, password, expected){
    Open_Browser()
    Write_Username(username)
    value = Write_Password(password)
    Check(expected)
}
function Test_Login(){
    Login("validName", "validPassword", true)
    y = 1+4;
    Login("validName", "invalidPassword", false)
}
var {Open_Browser, Write_Username, Write_Password, Check} = require("./test-helper.js");

module.exports = {Login,Test_Login}