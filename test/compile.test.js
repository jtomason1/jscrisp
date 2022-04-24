const {compile} =  require('../src/jscrisp')

const src = `
Functionality: Login - username, password, expected
    Open Browser
    Write Username - username
    Write Password - password
    Check - expected

Functionality: Test Login
    Login - validName, validPassword, true
    Login - validName, invalidPassword, false
`

const expected = `
function login(username, password, expected){
    openBrowser()
    writeUsername(username)
    writePassword(password)
    check(expected)
}
function testLogin(){
    login(validName, validPassword, true)
    login(validName, invalidPassword, false)
}
`

function testCompile(){
    const result = compile(src);
    console.log("Compile Result:", result);
    if(result!=expected){
        throw Error("Test Compile failed")
    }
}

module.exports = {
    testCompile
}