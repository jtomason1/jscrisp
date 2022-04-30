function Example(Test_Method){
Run()
Test_Method("First File...")
Test_Method("Also succesfully ran")
}
var {Run} = require("./secondFile.crisp.js");
module.exports = {Example}