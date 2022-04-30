# JSCrisp

JSCrisp enables JS developers to selectively write human readable jscrisp code that can be easily converted to JS code. The primary purpose of this is to allow less-technically-abled people to view - and perhaps even modify (scary!) - code that may otherwise be hard to parse without programming knowledge.

This is accomplished by taking a VERY simple custom syntax and slightly modifying it into JS src code. The idea is to be able to take the human readable jscrisp code:
```
Functionality: Say Hello World
    Say - "Hello World!"

```

and convert it to:

```
function Say_Hello_World(){
    Say("Hello World!")
}
```

A developer will always be needed to understand the output js and ensure it works with the rest of the application, however if many business critical parts of the code can be extracted to these jscrisp files, non-technical people should be able to understand code better.


## Cucumber Inspiration

Cucumber's `feature` files were a great inspiration for this side-project. I really liked the idea of business individuals to be able to view the critical pieces of testing. The very clean human readable format was nice to developers as well to at a glance understand *generally* what the test is doing.

However, it felt extremely one sided requiring even more work from the developer. The Gherkin syntax adds an extra language that developers have to learn, while non-developers have the "simplified" Gherkin syntax to learn rather than Java. The developers have to create the Java files that support the tests, possibly written in ways they normally wouldn't. The developers have to take the time and care to extract out whatever inputs they can through the phrases. The relationship doesn't give much back to the developer, except for their carefully crafted Test files being slightly easier to read for them. 

What JSCrisp aims to do is make it more of a benefit to developers... I know I like clean easy to read code, and the Gherkin syntax is very easy to read and articulate to non-developers. So, I wanted to take JS, which is already mostly human readable, give it a slightly even fresher and crisper look, so that the developer can use the very easy to read format just about anywhere in their code. So currently I am targetting the "functions", the core of JS. If we can make these human readable, then any JS developer ought to be able to take advantage of it pretty effectively.

## Usage


## Crisp Syntax

Might want to add some extra regex before all this searching...
For example, remove any white space lines?


Create Array:
    Match: _keyword arr_ [ ]

Comments: // - left alone, acts as js comment
    Found with regex: \/\/

JS Line: * ;  will be left alone, allows js lines
    Foudn with regex: ;\n

Scope: Certain keywords will cause new scopes to be entered/exited

Call function:
    Match: Any line not matched with another

Define a function:
    Match: _keyword function_ : _id_ - _args_

    To find "Functionality"
    \n.*:
    Improved: \n[^\n//]*:[^;]

    To find full functionality line:
        \n[^\n//]*:[^;].*
        Should add `{` to the end

        To find last line of function:
        \n\s+\S+.*\n\n
        Better?: \n\s+[^\s|\n]+.*\n\n
        Better: \n\s+[^\s\n]+.*(\n\n|\n$|$)
        Better: \n\s+[^\s\n]+.*(\n\n|\n$|$|\n\S)        Will want to addclose curly brace one line BEFORE the end index (due to \n\S)
        Needs work

        Doesnt account for functions inside of functions1!!!!
    

<!-- Create Object:
    Match: _keyword obj_ :: -->

_keyword_:
- function: Functionality, Function
<!-- - special_function: Scenario, Test Case, Feature, Scenario Outline, Examples
- obj: Configuration, Object, Settings, Data
- arr: Dataset, Array, List 
- schema: Schema - To be added, can enforce structure to coded objects

-->

_args_
csv of args
Regex: -.*

_id_ : Some text for a name/id (could include spaces)
    Will have spaces converted to underscores for js



General regex clips:
Rather than . use [^\n//]
And use [^;] at the end





Temp note: 
\n\s+\S+.*\n\n