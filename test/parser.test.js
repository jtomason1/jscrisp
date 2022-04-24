const {getParser} =  require('../src/parser/getParser')

let parser = null;

function testGetParser(){
    parser = getParser();
    if(parser == null){
        throw Exception("testGetParser failed");
    }
}

function testParser(){
    var output = parser.parse("1 + 2 * 3");

    if(output != "7"){
        throw Exception("testParser failed");
    }
    console.log(output);
}

module.exports = {
    testGetParser,
    testParser
}