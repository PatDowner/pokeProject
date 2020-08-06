// setting up some arrays variables to populate later
let pick4 = []
let random
let qType = ['name', 'types']
let type
let answers = []
let answer
let score = 0
document.getElementById('score').innerHTML = `Score: ${score}`

// get 4 new pokemon (and a correct one) to pull for a question
const newValues = () => {
  pick4 = []

  // picks 4 values for the pick4 array
  for (let i = 0; i < 4; i++) {
    let y = Math.floor(Math.random() * 150) + 1
    // this if statement makes sure that we're not duplicating values
    if (pick4.includes(y)) {
      // console.log('try again')
      i--
    } else {
      // console.log('accepted number')
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

  // determines which question type will be generated
  type = Math.floor(Math.random() * 2)
  console.log('q type index: ' + type)
  type = qType[type]
  console.log('q type value: ' + type)

  // end newValues
}

// this generates the data from the pick4 value to get the name value (aka: pokemon ID# converted to pokemon names)
const answerButtons = (x, y, z) => {
  // pass the values through from newValues
  pick4 = x
  random = y
  type = z

  // confirms if values got passed through
  console.log(pick4)
  console.log(random)
  console.log(type)

  answers = []

  // clear out the div to make room for new questions
  document.getElementById('answersDiv').innerHTML = ''

  // some how in this loop the answer order shifts. Same overall answers, but shifted by 1 (with the last one looped around to take the first position).
  // loop to make answer buttons
  for (let i = 0; i < 4; i++) {
    // console.log(i)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pick4[i]}`)
      .then(res => {

        if (type = 'name') {
          type = res.data.name
          console.log(res.data.name)
        } else if (type = 'types') {
          type = res.data.types[0].type.name
          console.log(res.data.types[0].type.name)
        }
        console.log(type)
        answers.push(type)

        // creates a button with that pokemon's name to put in the answers section of the HTML
        answersElem = document.createElement('button')
        answersElem.className = "answerBtn"
        answersElem.dataset.pokeData = type
        answersElem.dataset.number = res.data.id
        answersElem.innerHTML = `
      ${type}
      `
        document.getElementById('answersDiv').append(answersElem)

      })
      .catch(err => { console.log(err) })
  }
  pick4 = answers
  console.log(pick4)

  axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
    .then(res => {
      random = res.data.type
      console.log(random)
      answer = random
      console.log(answer)
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
      document.getElementById('questionIMG').innerHTML = `
      <img src="${res.data.sprites.back_default}">
      `
    })
    .catch(err => { console.log(err) })

  console.log(random)
  // end questionImage
}







// when we click start...
document.getElementById('startBtn').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('instructionsDiv').classList.add('hide')
  document.getElementById('questionsDiv').classList.remove('hide')
  document.getElementById('answersDiv').classList.remove('hide')

  newValues()
  answerButtons(pick4, random, type)
  questionImage(random)
  // console.log(pick4)
  // console.log(random)
})

// global event listener
document.addEventListener('click', event => {

  event.preventDefault()

  if (event.target.classList.contains('answerBtn')) {
    console.log('works')
    if (event.target.dataset.pokeData === random) {
      console.log('correct')
      document.getElementById('feedback').innerText = 'correct'
      score++
      document.getElementById('score').innerHTML = `Score: ${score}`
      newValues()
      answerButtons(pick4, random)
      questionImage(random)
    } else {
      console.log('wrong')
      document.getElementById('feedback').innerText = 'wrong'
      newValues()
      answerButtons(pick4, random)
      questionImage(random)
    }
  }






})










// questionTypes[
  //   {
    //     question: "Which Pokemon is this?"
    //     question: "What type of Pokemon is this?"
    //     question: "Which of the following types is this pokemon weak against?"
//     question: "Which of the following types is this pokemon strong against?"
//   }
// ]