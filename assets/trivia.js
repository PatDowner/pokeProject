// Set high score to zero
let highScore = 0

// user name indicates no high score until player has logged an initial high score
let userName = 'No current high score'

// recalls last high score if user has visited page before or sets up an empty array ready to accept a new high score
let pokeScoreLog = JSON.parse(localStorage.getItem('pokeScoreLog')) || []

// if there's data in localStorage for pokeScoreLog, use that to set the highScore and user
for (let i = 0; i < pokeScoreLog.length; i++) {
  highScore = pokeScoreLog[i].highScore
  userName = pokeScoreLog[i].userName
}

// Display current highScore in HTML
document.getElementById('highScore').innerHTML = `
High Score:&nbsp;${highScore}<br>
User: ${userName}
`





// setting up some arrays variables to populate later
let pick4 = []
let random
let answers = []
let answer
let score = 0
document.getElementById('score').innerHTML = `Score: ${score}`

// Set timer start value
let seconds = 10

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

  answers = []

  // clear out the div to make room for new questions
  document.getElementById('answersDiv').innerHTML = ''

  // some how in this loop the answer order shifts. Same overall answers, but shifted by 1 (with the last one looped around to take the first position).
  // loop to make answer buttons
  for (let i = 0; i < 4; i++) {
    // console.log(i)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pick4[i]}`)
      .then(res => {

        // console.log(res.data)
        answers.push(res.data.name)

        // creates a button with that pokemon's name to put in the answers section of the HTML
        answersElem = document.createElement('button')
        answersElem.className = "answerBtn"
        answersElem.dataset.pokeName = res.data.name
        answersElem.dataset.number = res.data.id
        answersElem.innerHTML = `
      ${res.data.name}
      `
        document.getElementById('answersDiv').append(answersElem)

      })
      .catch(err => { console.log(err) })
  }
  pick4 = answers
  console.log(pick4)

  axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
    .then(res => {
      random = res.data.name
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


const endGame = () => {
  document.getElementById('questionsDiv').classList.add('hide')
  document.getElementById('answersDiv').classList.add('hide')
  document.getElementById('finished').classList.remove('hide')

  if (score > highScore) {
    // set user's score to be the current highScore
    highScore = score

    // display text congratulating user
    document.getElementById('finalScore').innerHTML = `
      <p>Congratulations! You have achieved a new high score!!</p>
      <p>Your Score: ${highScore}</p>
      `

    // unhide finalScore element
    document.getElementById('finalScore').classList.remove('hide')

    document.getElementById('userSet').classList.remove('hide')

    document.getElementById('save').addEventListener('click', event => {
      event.preventDefault()

      // take user's input and store as userName
      userName = document.getElementById('initials').value

      // scoreObj array that will be pushed onto pokeScoreLog
      let scoreObj = {
        highScore: highScore,
        userName: userName
      }

      // push the scoreObj to pokeScoreLog
      pokeScoreLog.push(scoreObj)

      // pushing pokeScoreLog to localStorage making userName and highScore available for reference on refresh
      localStorage.setItem('pokeScoreLog', JSON.stringify(pokeScoreLog))

      // display confirmation that new highScore is saved
      document.getElementById('input').innerHTML = `
      <p class="text-success">New high score saved!<br>
      High Score: ${highScore}<br>
      User: ${userName}</p>
      `
      document.getElementById('save').classList.add('hide')

      // Display current high score in HTML
      document.getElementById('highScore').innerHTML = `
        High Score: ${highScore}<br>
        User: ${userName}
        `
      // show start over button
      document.getElementById('startOver').classList.remove('hide')
    })

  } else {
    // otherwise, just display final score
    document.getElementById('finalScore').innerHTML = `
    <p>Your score: ${score}</p>
    <p>High score: ${highScore}<br>
    (by user: ${userName})</p>
    `

    // unhide finalScore element and start over button
    document.getElementById('finalScore').classList.remove('hide')
    document.getElementById('startOver').classList.remove('hide')

  }
}




// when we click start...
document.getElementById('startBtn').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('instructionsDiv').classList.add('hide')
  document.getElementById('questionsDiv').classList.remove('hide')
  document.getElementById('answersDiv').classList.remove('hide')

  newValues()
  answerButtons(pick4, random)
  questionImage(random)
  // console.log(pick4)
  // console.log(random)

  // start a timer that runs over intervals of 1 second (1000 ms)
  timer = setInterval(() => {
    // for each interval, subtract a second from the timer
    seconds--

    // and update that time in the HTML page
    document.getElementById('time').textContent = seconds

    // once the seconds are less than or equal to zero...
    if (seconds <= 0) {
      // clear the timer
      clearInterval(timer)
      // and run the endGame() function
      endGame()
    }
  }, 1000)



})

document.getElementById('startOver').addEventListener('click', event => {
  location.reload()
})

// global event listener
document.addEventListener('click', event => {

  event.preventDefault()

  if (event.target.classList.contains('answerBtn')) {
    console.log('works')
    if (event.target.dataset.pokeName === random) {
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