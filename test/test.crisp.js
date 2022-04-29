function Login(username, password, expected){
    Open_Browser()
    Write_Username(username)
    value = Write_Password(password)
    Check(expected)}
function Test_Login(){
    Login("validName",    "validPassword",        true)
    Login("validName",    "invalidPassword",      false)}
function Gherkin_Example(LoginMethod){
    // Given
    Given_the_user_is_logged_in(LoginMethod)
    // When
    When_the_user_clicks_the_logo()
    // Then
    Then_the_user_is_taken_to_the_home_page()}
function Given_the_user_is_logged_in(LoginMethod){
    LoginMethod("validName", "validPassword", true)}
function When_the_user_clicks_the_logo(){
    console.log("Logo Clicked");}
function Then_the_user_is_taken_to_the_home_page(){
    console.log("On the main page!");}
var {Open_Browser, Write_Username, Write_Password, Check} = require("./test-helper.js");
module.exports = {Login,Test_Login,Gherkin_Example,Given_the_user_is_logged_in,When_the_user_clicks_the_logo,Then_the_user_is_taken_to_the_home_page}