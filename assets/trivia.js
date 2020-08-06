// setting up some arrays variables to populate later
let pick4 = []
let random
let answers = []

// get 4 new pokemon (and a correct one) to pull for a question
const newValues = () => {
  pick4 = []

  // picks 4 values for the pick4 array
  for (let i = 0; i < 4; i++) {
    let y = Math.floor(Math.random() * 150) + 1
    // this if statement makes sure that we're not duplicating values
    if (pick4.includes(y)) {
      console.log('try again')
      i--
    } else {
      console.log('accepted number')
      pick4.push(y)
    }
  }

  console.log(pick4)

  // Of those 4, generates which will be our correct answer
  random = Math.floor(Math.random() * 4)
  // uses that random number to pull the value of our correct answer
  console.log(random)
  random = pick4[random]
  console.log(random)

  // end newValues
}


// this generates the data from the pick4 value to get the name value (aka: pokemon ID# converted to pokemon names)
const answerButtons = (x, y) => {
  // pass the values through from newValues
  pick4 = x
  random = y

  // confirms if values got passed through
  console.log(pick4)
  console.log(random)


  // loop to make answer buttons
  for (let i = 0; i < 4; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pick4[i]}`)
      .then(res => {

        // console.log(res.data)
        answers.push(res.data.name)

        // creates a button with that pokemon's name to put in the answers section of the HTML
        answersElem = document.createElement('button')
        answersElem.className = "answerBtn"
        answersElem.dataset.pokeName = res.data.name
        answersElem.dataset.number = i
        answersElem.innerHTML = `
      ${res.data.name}
      `
        document.getElementById('test').append(answersElem)

      })
      .catch(err => { console.log(err) })
  }
  pick4 = answers
  console.log(pick4)

  axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
    .then(res => {
      random = res.data.name
      console.log(random)
    })
    .catch(err => { console.log(err) })

  // end answerButtons
}

const questionImage = (y) => {
  // pass through value from answerButtons
  random = y
  console.log(random)

  axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
    .then(res => {
      console.log(res.data.sprites.back_default)
    })
    .catch(err => { console.log(err) })

}
newValues()
answerButtons(pick4, random)
questionImage(random)



// newQuestion()
// // Takes the pokemon ID#s from the pick4 and puts their corresponding names into array answers
// const answerButtons = () => {

//   for (let i = 0; i < 4; i++) {
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${pick4[i]}`)
//       .then(res => {

//         // console.log(res.data)
//         answers.push(res.data.name)

//         // creates a button with that pokemon's name to put in the answers section of the HTML
//         answersElem = document.createElement('button')
//         answersElem.className = "answerBtn"
//         answersElem.dataset.pokeName = res.data.name
//         answersElem.dataset.number = i
//         answersElem.innerHTML = `
//       ${res.data.name}
//       `
//         document.getElementById('answers').append(answersElem)

//       })

//   }
//   document.getElementById('answersDiv').classList.add('hide')

// }


// // This figures out the image to populate into the question by reverse engineering the question from our predetermined correct answer.
// const questionInfo = () => {

//   // answers[random] tells us the name which the pokemon from the answers we are designating as our correct answer
//   axios.get(`https://pokeapi.co/api/v2/pokemon/${answers[random]}`)
//     .then(res => {
//       console.log(answers)
//       console.log(res.data)
//       console.log(res.data.sprites.back_default)

//       // go pull the sprite image that matches the name of the pokemon that we've designated as the correct answer and puts its image on the screen
//       document.getElementById('questionIMG').innerHTML = `
//       <img src="${res.data.sprites.back_default}">
//       `

//     })



// }

// // generate the answer buttons
// answerButtons()

// // when we click start...
// document.getElementById('startBtn').addEventListener('click', event => {
//   event.preventDefault()
//   document.getElementById('instructionsDiv').classList.add('hide')
//   document.getElementById('questionsDiv').classList.remove('hide')
//   document.getElementById('answersDiv').classList.remove('hide')
//   // generate a sprite for the question and shows the question div
//   newQuestion()
//   questionInfo()

// })

// // global event listener
// document.addEventListener('click', event => {

//   event.preventDefault()

//   if (event.target.classList.contains('answerBtn')) {
//     console.log('works')
//     if (event.target.dataset.pokeName === answers[random]) {
//       console.log('correct')
//       newQuestion()
//       questionInfo()
//     } else {
//       console.log('wrong')
//       newQuestion()
//       questionInfo()
//     }
//   }






// })










// questionTypes[
  //   {
    //     question: "Which Pokemon is this?"
    //     question: "What type of Pokemon is this?"
    //     question: "Which of the following types is this pokemon weak against?"
//     question: "Which of the following types is this pokemon strong against?"
//   }
// ]