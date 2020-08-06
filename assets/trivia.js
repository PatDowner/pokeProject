// an array we're gonna use to pick our 4 pokemon for the answers
let fourFrom150 = []
let randomNum


// pick 4 numbers out of the 150 to be our answer choices, add them to the array
for (let i = 0; i < 4; i++) {
  let y = Math.floor(Math.random() * 150) + 1
  console.log(y)
  fourFrom150.push(y)
}


for (let i = 0; i < 4; i++) {
  randomNum = Math.floor(Math.random() * 4)
}

console.log(randomNum)

console.log(fourFrom150)

let answers = []

// array for possible answers

// Sets position 0 so we can use that as a correct answer
// axios.get(`https://pokeapi.co/api/v2/pokemon/${fourFrom150[0]}`)
//   .then(res => {
//     console.log(res.data)
//     // answers.push(res.data.name)

//     document.getElementById('test').innerHTML = `
//     <p>Whos that pokemon</p>
//     <img src="${res.data.sprites.back_default}">
//     `
//     // <p>${res.data.name}</p>


//   })




const myFunction = () => {

  // generates link to reference the data for each of the 4 pokemon
  for (let i = 0; i < 4; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${fourFrom150[i]}`)
    .then(res => {

      console.log(res.data)
      answers.push(res.data.name)
      
      
      answersElem = document.createElement('button')
      answersElem.dataset.pokeName = res.data.name
      answersElem.dataset.number = i
      answersElem.innerHTML = `
      ${res.data.name}
      `
      document.getElementById('answers').append(answersElem)
      
    })
    
  }
  
}


const correctInfo = () => {

  axios.get(`https://pokeapi.co/api/v2/pokemon/${answers[randomNum]}`)
    .then(res => {

      console.log(res.data)
      console.log(res.data.sprites.back_default)

      document.getElementById('test').innerHTML = `
    <img src="${res.data.sprites.back_default}">
    `

    })

}

myFunction()

document.getElementById('startBtn').addEventListener('click', event => {
  event.preventDefault()
  
  correctInfo()
  
  
})


// // set a variable that selects a random position in the main array. This will determine which position in the array has our correct answer
// let target = shuffledArray[0] // remember, since it's a shuffledArray, item 0 will always be a different pokemon
// // we can then use this to pull from if we need an image or whatever else


// // start loop i=0; i<4; i++
// // make an array and push correct, otherAns1, otherAns2, otherAns3 to it
// // run that shuffle function to tell it to shuffle the res.data.cards array and call it shuffledArray
// let shuffledArray = shuffle(res.data.cards)
// answerArray = []
// let answer = shuffledArray[i] //then add .whatever for the category we need for an answer
// // push answer to answerArray
// // end loop

// // now put our answer array in a random order, so the correct answer isn't always in the same position
// shuffle(answerArray)


// questionTypes[
//   {
//     question: "Who is this pokemon?" //or name that pokemon
//     pokeName: //name of a randomly selected pokemon ... do NOT show this on this question
//       questionImage: // pulls image of that pokemon ... show this
//     correctAnswer: // name of that pokemon
//       answers: // need an array here to represent 4 possible answers. IDK if we need to include the correct answer here. Possibly since we will shuffle this when we display it.
//   },
//   {
//     question: "What type of Pokemon is this?"
//     pokeName: //name of a randomly selected pokemon, can display or not...up to us
//       questionImage: // pulls image of that pokemon ... show this
//     correctAnswer: // type of that pokemon
//       answers: // need an array here to represent 4 possible answers. IDK if we need to include the correct answer here. Possibly since we will shuffle this when we display it.
//   },
//   {
//     question: "Which of the following types is this pokemon weak against?"
//     pokeName: //name of a randomly selected pokemon ... we can show this or not
//       questionImage: // pulls image of that pokemon ... show this
//     correctAnswer: // type it's weak against
//       answers: // need an array here to represent 4 possible answers. IDK if we need to include the correct answer here. Possibly since we will shuffle this when we display it.
//   },
//   {
//     question: "Which of the following types is this pokemon strong against?"
//     pokeName: //name of a randomly selected pokemon ... we can show this or not
//       questionImage: // pulls image of that pokemon ... show this
//     correctAnswer: // type it's strong against
//       answers: // need an array here to represent 4 possible answers. IDK if we need to include the correct answer here. Possibly since we will shuffle this when we display it.
//   }
// ]