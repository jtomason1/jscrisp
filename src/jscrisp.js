const fs = require("fs")
const path = require("path")

function compile(src, config){
    let result = src;


    const funcs = [...src.matchAll(new RegExp("\n\n", 'g')) ]
    console.log("Dev", funcs)
    // funcs.forEach((match) => {
    //     const line = match[0];
    //     console.log("Function found at ", line);
    //     let info = line.split(":")[1];
    //     let infoArray = info.split("-");

    //     let name = infoArray[0]
    //     name = name.trim();
    //     name = name.replace(/ /g,"_");

    //     let args = infoArray[1] || ''
    //     args = args.trim()
    //     // console.log("Func name:", name)
    //     result = result.replace(new RegExp(`\b${match[0]}\b`, 'g'), match[0] + '{') 

    //     let newLine = `function ${name}(${args || ''}){`

    //     console.log("New line:", newLine);

    //     // note about starting regex: myRegex.lastIndex = 3
    // });


    const lines = src.split("\n")
    // console.log(lines);

    let inFunc = false;

    let exports = [];

    const newLines = lines.map((l,index)=>{
        if(!l || !l.trim()){
            if(inFunc == true){
                inFunc = false;
                return "}"
            }
            return "";
        }
        const funcRegex = new RegExp("\\bFunctionality: .*");
        const jsLineRegex = new RegExp(".*;");
        const jsCommentRegex = new RegExp(".*//.*");
        if(funcRegex.test(l)){
            inFunc = true;
                
            const line = l;
            // console.log("Function found at ", line);
            let info = line.split(":")[1];
            let infoArray = info.split("-");

            let name = infoArray[0]
            name = name.trim();
            name = name.replace(/ /g,"_");

            let args = infoArray[1] || ''
            args = args.trim()
            // console.log("Func name:", name)
            result = result.replace(new RegExp(`\b${l}\b`, 'g'), l + '{') 

            let newLine = `function ${name}(${args || ''}){`
            exports.push(name);

            // console.log("New line:", newLine);

            return newLine;

            // note about starting regex: myRegex.lastIndex = 3
        }else if(jsLineRegex.test(l)){
            return l;
        }else if(jsCommentRegex.test(l)){
            return l;
        }else{
            let li = l.split("=");
            let assignment = "";
            let expression = "";
            if(li.length>1){
                assignment = `${li[0].trim()} = `
                expression = li[1];
            }else{
                expression = li[0]
            }
            let stepArr = expression.split("-");
            let call = stepArr[0].trim();
            call = call.replace(/ /g,"_");

            let args = stepArr[1]|| "";
            args = args.trim()

            const tab = inFunc ? "    " : "";

            let newLine = `${tab}${assignment}${call}(${args})`

            return newLine

        }

    })

    // console.log(newLines);

    const exportLine = `module.exports = {${exports.join(",")}}`
    newLines.push(exportLine);
    result = newLines.join("\n")

    

    


    return result;
}

const getAllFiles = function(dirPath, arrayOfFiles) {
    
    

    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

function compileDir(dirName){
    console.log("Compiling Dir "+dirName+ " from crisp to js for:")
    getAllFiles(dirName).forEach((file, i)=>{
        const fileNameParts = file.split(".");
        const extension = fileNameParts.pop();
        if( extension == "crisp"){   
            console.log(file)
            try {
                const src = fs.readFileSync(file, 'utf8')
              
                const result = compile(src);

                fileNameParts.push("crisp");
                fileNameParts.push("js");
                const outputFile = fileNameParts.join(".");
                fs.writeFileSync(outputFile, result)
            } catch (err) {
              console.error(err)
            }
        }
    })
    
}

module.exports = {
    compile,
    compileDir
}
