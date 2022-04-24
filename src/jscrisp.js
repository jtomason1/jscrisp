

function compile(src, config){
    let result = src.replace(new RegExp("\\bFunctionality: \\b", 'g'), "function ") 
    result = result.replace(new RegExp("^[\n \t\n]*$", 'g'), "}") 



    const funcs = [...src.matchAll(new RegExp("\\bFunctionality: .*\n", 'g'), "function ") ]
    console.log(funcs)
    funcs.forEach((match) => {
        console.log("Function found at ", match[0]);
    });



    return result;
}

module.exports = {
    compile
}

