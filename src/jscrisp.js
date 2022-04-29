const fs = require("fs")
const path = require("path")

// global phrases? May want to have some namespacing as to not get over burdened here
const phrases = [];

function replacePhrases(src){
    let srcLines = src.split("\n");
    let output = srcLines.map((line, li)=>{
        let newLine = line;
        phrases.forEach(({phrase, func}, pi)=>{
            const phraseRegex = new RegExp(phrase.replace("%s", ".*"));
            // phrase did match, convert to non-phrased function call

            console.log("My phrase regex", phraseRegex)
            if(phraseRegex.test(line)){
                console.log("FOUND IT")
                const phraseParts = phrase.split("%s");

                const funcName = func.name;

                let reducedLine = phraseParts.reduce((prev, curr)=>{
                    return prev.replace(curr, "@@");
                }, line)

                let argArr = reducedLine.split("@@").filter(v=>v).filter(v=>v.trim());

                let assignment = "";
                if(argArr.length>0){
                    if(argArr[0].includes("=")){
                        assignment = argArr.shift();
                    }
                }

                const args = argArr.join(",")
                newLine = `${assignment}${funcName} - ${args}`

                console.log("NEWLINE", newLine)
                
            }
        })
        return newLine
    })

    console.log("Replaced", output)

    return output.join("\n");
}

function compile(src, config){
    let result = src;

    
    result = replacePhrases(result)


    let lines = result.split("\n")
    // console.log(lines);

    let inFunc = false;

    let exports = [];

    lines = lines.filter((l,index)=>{
        if(!l || !l.trim()){
            return false;
        }else{
            return true;
        }
    })

    const newLines = lines.map((l,index)=>{


        const funcRegex = new RegExp(".*: .*");
        const jsLineRegex = new RegExp(".*;");
        const jsCommentRegex = new RegExp(".*//.*");

        

        // above tested lines do not affect scope

        let nextLine = "";
        if(index+1<lines.length){
            nextLine = lines[index+1];
        }

        const lineTabCount = l.length - l.trimStart().length
        const nextLineTabCount = nextLine.length - nextLine.trimStart().length;
        let startScope = false;
        let endScope = false;


        if(lineTabCount==nextLineTabCount){
            // no change in scope
        }else if(lineTabCount<nextLineTabCount){
            startScope = true;
        }else if(lineTabCount>nextLineTabCount){
            endScope = true;
        }

        
        // console.log(l, lineTabCount, nextLineTabCount)

        
        
        let newLine = l;

        if(jsLineRegex.test(l)){
            newLine = l;
        }else if(jsCommentRegex.test(l)){
            newLine = l;
        }else if(funcRegex.test(l)){
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

            newLine = `function ${name}(${args || ''})`
            exports.push(name);

            // console.log("New line:", newLine);


            // note about starting regex: myRegex.lastIndex = 3
        
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

            newLine = `${tab}${assignment}${call}(${args})`


        }

        
        return `${newLine}${endScope ? "}" : ""}${startScope ? "{" : ""}`;

    })


    console.log(newLines);

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
    compileDir,
    phrases
}
