const readlineSync = require('readline-sync');


const sampleDataList = ["12:00", "14:20", "16:40", "19:00", "21:20"];
const sampleDataGrid = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];


function getChoice(choices, label, maxColWidth = null){
    while(true){
        if(maxColWidth && maxColWidth > 0){
            let currentRow = [];
            let tbl = [];

            for (let i = 0; i <= choices.length; i++) {

                if(i > 0 && i % maxColWidth === 0){
                    //console.log(currentRow.join("   "));
                    tbl.push(currentRow);

                    currentRow = [];
                }
                currentRow.push(`${i + 1}. ${choices[i]}`);
            }
            console.table(tbl);
        }else{
            choices.forEach((element, index) => {
                console.log(`${index + 1}. ${element}`);
            })
        }

        const choice = readlineSync.question(`Please choose a ${label}: `);
        const choiceAsNumber = parseInt(choice);

        if(choiceAsNumber > 0 && choiceAsNumber <= choices.length){
            return choiceAsNumber - 1;
        }else{
            console.log(`Invalid choice: ${choice}, Please try again.`)
        }
    }

}

function getMultiChoice(numberOfChoices, choices,  maxColWidth = null){
    let results = [];
    while(results.length < numberOfChoices){

       if(!results.length){
           const firstChoice = getChoice(choices, "first item", maxColWidth);
           results.push(firstChoice)

       }else{
           const nextChoice = readlineSync.question(`Please choose #${results.length + 1} item: `);
           const choiceAsNumber = parseInt(nextChoice);

           if(choiceAsNumber > 0 && choiceAsNumber <= choices.length){
               results.push(choiceAsNumber - 1);
           }else{
               console.log(`Invalid choice: ${nextChoice}, Please try again.`)
           }
       }

    }
    return results
}

//const choiceIndex = getChoice(sampleDataGrid, "seats", 3);

// const choices = getMultiChoice(3, sampleDataList)
//
//
// console.log(`User selected choice at index: ${choices}`)


module.exports = {getChoice, getMultiChoice};