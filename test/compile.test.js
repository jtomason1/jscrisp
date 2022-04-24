const {compile} =  require('../src/jscrisp')

const src = `
Functionality: Login - username, password, expected
    Open Browser
    Write Username - username
    value = Write Password - password
    Check - expected

Functionality: Test Login
    Login - validName, validPassword, true
    y = 1+4;
    Login - validName, invalidPassword, false
    
`

const expected = `
function Login(username, password, expected){
    Open_Browser()
    Write_Username(username)
    value = Write_Password(password)
    Check(expected)
}
function Test_Login(){
    Login(validName, validPassword, true)
    y = 1+4;
    Login(validName, invalidPassword, false)
}
module.exports = {Login,Test_Login}
`

function testCompile(){

    const result = compile(src);
    console.log("Compile Result:", result);
    let cleanResult = result.replace(/\s/g,"");
    let cleanExpected = expected.replace(/\s/g,"")
    // console.log("Check", cleanResult, cleanExpected)
    if(cleanResult!=cleanExpected){
        throw Error("Test Compile failed")
    }
}

function testCompileResult(){
    const fs = require('fs')
    try {
        const src = fs.readFileSync('./test/test.crisp', 'utf8')
      
        const result = compile(src);
        fs.writeFileSync('./test/test.crisp.js', result)
        const { Test_Login }= require('./test.crisp.js');
        Test_Login();
    } catch (err) {
      console.error(err)
    }
    
}

module.exports = {
    testCompile,
    testCompileResult
}