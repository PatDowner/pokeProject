

// First is what happens when the page loads/reloads, then below that is what happens when a search button is clicked.




// Randomized cards at landing screen
axios.get(`https://api.pokemontcg.io/v1/cards`)
  .then(res => {
    // function that will randomize the res.data.cards array
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }

    // run the function to tell it to shuffle the res.data.cards array and call it shuffledArray
    let shuffledArray = shuffle(res.data.cards)

    // this is for getting a random card, repeat 3 times for landing image
    for (let i = 0; i < 6; i++) {
      // make a div for each card
      let randomCard = document.createElement('div')

      // finds a random position number (n) in the API array of cards
      // let n = Math.floor(Math.random() * shuffledArray.length)

      // sets column width and gives it a class for styling purposes
      randomCard.className = 'col s12 m6 l4 cardDiv'

      // gets the image link and some other info specific to that card
      let imgLink = shuffledArray[i].imageUrlHiRes
      let cardRarity = shuffledArray[i].rarity
      let cardSeries = shuffledArray[i].series
      let cardSet = shuffledArray[i].set

      // res.data.cards[n].open(originalWidth)
      // res.data.cards[n].open(originalHeight)
      // puts all of those things into a single displayed pokeCardItem div
      // image of the card is pokeCard class
      // the specific info about the card is cardInfo class
      randomCard.innerHTML = `
        <img class="materialboxed" height="290" src="${imgLink}">
        <div class="cardInfo">
          <p id="cardRarity"><b>Rarity:</b> ${cardRarity}</p>
          <p id="cardSeries"><b>Card Series:</b> ${cardSeries}</p>
          <p id="cardSet"><b>Card Set:</b> ${cardSet}</p>
        </div>
      `
      let elems = document.querySelectorAll('.materialboxed')
      let instances = M.Materialbox.init(elems)
      // console.log(randomCard)

      // put that randomCard div into the div with id='randomDisplay' in the HTML file.
      document.getElementById('randomDisplay').append(randomCard)
    }
  })
  .catch(err => {
    console.log(err)
  })




// Everything after this is executed once a search button is clicked




// variable that makes the function searchClicked() work
let whichSearch = ''

const searchClicked = (x) => {
  // takes in the x which differentiates between the 'Name' or 'Type' search buttons
  whichSearch = x

  // swap out landing images with cards from search result
  document.getElementById('cardLanding').classList.add('hide')
  document.getElementById('cardDisplay').classList.remove('hide')

  // clear the cardDisplay div from previous searches
  document.getElementById('cardDisplay').innerHTML = ''

  // name typed into searchName field
  let pokeSearch = document.getElementById(`input${whichSearch}`).value

  // variable to make apiURL if statement work
  let apiURL = ''

  // lets it access the API at the correct point depending on which search button was used
  if (whichSearch === 'Name') {
    apiURL = `https://api.pokemontcg.io/v1/cards?name=${pokeSearch}`
  } else if (whichSearch === 'Type') {
    apiURL = `https://api.pokemontcg.io/v1/cards?types=${pokeSearch}`
  }

  // actual API pull using the correct API link as defined in the if statement above
  axios.get(apiURL)
    .then(res => {
      // function that will randomize the res.data.cards array
      function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
      }

      // run the function to tell it to shuffle the res.data.cards array and call it shuffledArray
      let shuffledArray = shuffle(res.data.cards)

      // console logs the array we're working with
      console.log(res.data.cards)


      // generates cards for each item in the array.
      // note: the type one only gives first 100 cards
      for (let i = 0; i < res.data.cards.length; i++) {
        // makes a div for each pokeCard
        let pokeCard = document.createElement('div')

        // sets the column width of the div as well as gives it a class for styling purposes
        pokeCard.className = 'col s12 m6 l4 xl3 cardDiv'

        // gets the image link and some other info specific to that card
        let imgLink = shuffledArray[i].imageUrlHiRes
        let cardRarity = shuffledArray[i].rarity
        let cardSeries = shuffledArray[i].series
        let cardSet = shuffledArray[i].set

        // image of the card is pokeCard class
        // the specific info about the card is cardInfo class
        pokeCard.innerHTML = `
          <img class="materialboxed" height="290" src="${imgLink}" class="pokeCard">
          <div class="cardInfo">
            <p id="cardRarity"><b>Rarity:</b> ${cardRarity}</p>
            <p id="cardSeries"><b>Card Series:</b> ${cardSeries}</p>
            <p id="cardSet"><b>Card Set:</b> ${cardSet}</p>
          </div>
        `

        let elems = document.querySelectorAll('.materialboxed')
        let instances = M.Materialbox.init(elems)

        // put that pokeCard div into the div with id='cardDisplay' in the HTML file.
        document.getElementById('cardDisplay').append(pokeCard)
        // end loop
      }

      // variable to make if statement work
      let infoText = ''

      // determines what shows up in the teal info bar that pops up after the search.
      if (whichSearch === 'Name') {
        infoText = `Pokemon: ${pokeSearch}`
        document.getElementById('typeNote').classList.add('hide')
      } else if (whichSearch === 'Type') {
        infoText = `Type: ${pokeSearch}`
        document.getElementById('typeNote').classList.remove('hide')
      }

      // populates that teal info bar
      document.getElementById('info').innerText = infoText

      // reveals that info bar (was hidden pre-search)
      document.getElementById('info').classList.remove('hide')

      if (whichSearch === 'Name') {
        // clears text from inputName
        document.getElementById(`input${whichSearch}`).value = ''

      } else if (whichSearch === 'Type') {
        // resets the type dropdown to the first/default option.
        document.getElementById(`input${whichSearch}`).value = 'Choose your option'
      }


      // end of .then
    })
    // catch any errors
    .catch(err => {
      console.log(err)
    })

  // end of searchClicked()
}



// When you click the search name button...
document.getElementById('searchName').addEventListener('click', event => {
  event.preventDefault()
  whichSearch = 'Name'
  searchClicked(whichSearch)
})

// when you click the search type button
// running into an issue where it's reaching the cap of 100 since there's so many of each type
document.getElementById('searchType').addEventListener('click', event => {
  event.preventDefault()
  whichSearch = 'Type'
  searchClicked(whichSearch)
})

// there to make the dropdown in search bar work (taken from materialize)
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select')
  let instances = M.FormSelect.init(elems)
})

// there to make the card sizes zoom in on click (material box from materialize)
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.materialboxed')
  let instances = M.Materialbox.init(elems)
})