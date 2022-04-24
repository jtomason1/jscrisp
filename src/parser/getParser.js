

var peg = require("pegjs");

const fs = require('fs')


function getParser(){
  let parser = null;
  try {
    const data = fs.readFileSync('./src/parser/jscrisp.pegjs', 'utf8')
    console.log(data)
    parser = peg.generate(data);
  } catch (err) {
    console.error(err)
  }
  return parser;
}


module.exports = {
  getParser
}