// I've got an issue with how the cards lay out in the columns. In some places the columns wrap in a way that makes sense. In other places it doesn't. Ideas of what's happening?? We can ask Q if needed.


// Randomized cards at landing screen
axios.get(`https://api.pokemontcg.io/v1/cards`)
  .then(res => {
    // this is for getting a random card
    for (let i = 0; i < 3; i++) {
      let randomCard = document.createElement('div')

      let x = Math.floor(Math.random() * res.data.cards.length)

      randomCard.className = 'col s4 randomCardItem'

      let imgLink = res.data.cards[x].imageUrlHiRes
      randomCard.innerHTML = `<img src="${imgLink}" class="randomCard>`

      console.log(randomCard)
      document.getElementById('randomDisplay').append(randomCard)
    }
  })
  .catch(err => {
    console.log(err)
  })

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
      // console logs the array we're working with
      console.log(res.data.cards)


      // generates cards for each item in the array.
      // note: the type one only gives first 100 cards
      for (let i = 0; i < res.data.cards.length; i++) {
        // makes a div for each pokeCard
        let pokeCard = document.createElement('div')

        // sets the column width of the div as well as gives it the cardDiv class for styling purposes
        pokeCard.className = 'col s12 l3 cardDiv'

        // gets the image link and some other info specific to that card
        let imgLink = res.data.cards[i].imageUrlHiRes
        let cardRarity = res.data.cards[i].rarity
        let cardSeries = res.data.cards[i].series
        let cardSet = res.data.cards[i].set

        // puts all of those things into a single displayed pokeCardItem div. Note: the reason this is a separate div inside the cardDiv is that having a pokeCardItem div allows us to style a border around this stuff w/o being the full width of the column.
        // image of the card is pokeCard class
        // the specific info about the card is cardInfo class
        pokeCard.innerHTML = `
        <div class="pokeCardItem">
          <img src="${imgLink}" class="pokeCard">
          <div class="cardInfo">
            <p id="cardRarity"><b>Rarity:</b> ${cardRarity}</p>
            <p id="cardSeries"><b>Card Series:</b> ${cardSeries}</p>
            <p id="cardSet"><b>Card Set:</b> ${cardSet}</p>
          </div>
        </div>
        `

        // put that pokeCard div into the div with id='cardDisplay' in the HTML file.
        document.getElementById('cardDisplay').append(pokeCard)
      // end loop
      }

      // variable to make if statement work
      let infoText = ''

      // determines what shows up in the teal info bar that pops up after the search.
      if (whichSearch === 'Name') {
        infoText = `Pokemon: ${pokeSearch}`
      } else if (whichSearch === 'Type') {
        infoText = `Type: ${pokeSearch}`
      }

      // populates that teal info bar
      document.getElementById('info').innerText = infoText

      // reveals that info bar (was hidden pre-search)
      document.getElementById('info').classList.remove('hide')

      // clears text from nameInput
      document.getElementById(`input${whichSearch}`).value = ''

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