// setting up some arrays variables to populate later
let fourFrom150 = []
let randomNum
let answers = []


// pick 4 numbers out of the 150 pokemon IDs in the initial set of pokemon to be our answer choices, add them to the array fourFrom150
for (let i = 0; i < 4; i++) {
  let y = Math.floor(Math.random() * 150) + 1
  console.log(y)
  fourFrom150.push(y)
}

// generates which will be our correct answer based on position within the 4 possible answers in fourFrom150, this will determine which image we pull.
for (let i = 0; i < 4; i++) {
  randomNum = Math.floor(Math.random() * 4)
}

console.log(randomNum)

console.log(fourFrom150)


// Takes the pokemon ID#s from the fourFrom150 and puts their corresponding names into array answers
// maybe call this setAnswers??? or answerButtons??
const answerButtons = () => {

  for (let i = 0; i < 4; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${fourFrom150[i]}`)
      .then(res => {

        // console.log(res.data)
        answers.push(res.data.name)

        // creates a button with that pokemon's name to put in the answers section of the HTML
        answersElem = document.createElement('button')
        answersElem.dataset.pokeName = res.data.name
        answersElem.dataset.number = i
        answersElem.innerHTML = `
      ${res.data.name}
      `
        document.getElementById('answers').append(answersElem)

      })

  }
  document.getElementById('answersDiv').classList.remove('hide')
}


// This figures out the image to populate into the question by reverse engineering the question from our predetermined correct answer.
const questionInfo = () => {

  // answers[randomNum] tells us the name which the pokemon from the answers we are designating as our correct answer
  axios.get(`https://pokeapi.co/api/v2/pokemon/${answers[randomNum]}`)
    .then(res => {
      console.log(answers)
      console.log(res.data)
      console.log(res.data.sprites.back_default)

      // go pull the sprite image that matches the name of the pokemon that we've designated as the correct answer and puts its image on the screen
      document.getElementById('questionIMG').innerHTML = `
      <img src="${res.data.sprites.back_default}">
    `

    })

  document.getElementById('instructionsDiv').classList.add('hide')
  document.getElementById('questionsDiv').classList.remove('hide')


}


// when we click start...
document.getElementById('startBtn').addEventListener('click', event => {
  event.preventDefault()

  // generate a sprite for the question and shows the question div
  questionInfo()
  // generate the answer buttons
  answerButtons()

})


// questionTypes[
  //   {
    //     question: "Which Pokemon is this?"
    //     question: "What type of Pokemon is this?"
    //     question: "Which of the following types is this pokemon weak against?"
//     question: "Which of the following types is this pokemon strong against?"
//   }
// ]