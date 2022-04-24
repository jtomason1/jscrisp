

function compile(src, config){
    let result = src;


    const funcs = [...src.matchAll(new RegExp("\\bFunctionality: .*\n", 'g')) ]
    console.log(funcs)
    funcs.forEach((match) => {
        const line = match[0];
        console.log("Function found at ", line);
        let info = line.split(":")[1];
        let infoArray = info.split("-");

        let name = infoArray[0]
        name = name.trim();
        name = name.replace(/ /g,"_");

        let args = infoArray[1] || ''
        args = args.trim()
        // console.log("Func name:", name)
        result = result.replace(new RegExp(`\b${match[0]}\b`, 'g'), match[0] + '{') 

        let newLine = `function ${name}(${args || ''}){`

        console.log("New line:", newLine);

        // note about starting regex: myRegex.lastIndex = 3
    });

    



    return result;
}

module.exports = {
    compile
}

