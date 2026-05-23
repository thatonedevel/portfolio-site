// parser module to add basic formatting for post descriptions

export function parseString(parentElement, textContent)
{
    // takes a parent element argument as a target for the text content & where to insert the text
    let lineIndex = 0;
    let parseComplete = false;
    let lines = textContent.split("\n");
    let paragraphEndIndices = [];
    let paragraphs = [];

    parentElement.textContent = ""; // clear the placeholder text

    // go through the lines array
    for (let i = 0; i < lines.length; i++)
    {
        if (lines[i].trim().length === 0) // empty string
        {
            // paragraph needs to end here
            paragraphEndIndices.push(i);
        }
    }

    paragraphEndIndices.push(lines.length - 1); // do this to force para inclusion

    console.log(paragraphEndIndices);

    for (let j = 0; j < paragraphEndIndices.length; j++)
    {
        console.log("paragraphs: ", paragraphEndIndices.length);
        // create a paragraph tag for each one in the array
        let newPar = Object.assign(document.createElement("p"), {
            class: ".parsed-paragraph"
        });

        if (lineIndex !== paragraphEndIndices[j])
        {
            // make a slice from the start index to the given end index
            let slice = lines.slice(lineIndex, paragraphEndIndices[j]);
            console.log("Slice: ", slice);
            newPar.textContent = slice.join();
        }
        else 
        {
            // one "line"
            console.log("text is one paragraph");
            newPar.textContent = lines[lineIndex];
        }

        paragraphs.push(newPar);

        // set lineindex to the next start location
        lineIndex = paragraphEndIndices[j] + 1;
    }

    // once this is done, iterate over paragraphs and add these to the parent element
    paragraphs.forEach((para) => {
        parentElement.appendChild(para);
    });
}

export function removeText(parentElement)
{
    // removes a parsed string from the dom and removes contained linebreak elements
    let linebreaks = parentElement.querySelectorAll(".parsed-paragraph");
    
    for (let i = 0; i < linebreaks.length; i++)
    {
        parentElement.removeChild(linebreaks[i]);
    }

    parentElement.textContent = ""; // set to empty string to clear completely
}