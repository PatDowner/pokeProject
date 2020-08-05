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
  whichSearch = x

  // swap out landing images with cards from search result
  document.getElementById('cardLanding').classList.add('hide')
  document.getElementById('cardDisplay').classList.remove('hide')

  // clear the div from previous searches
  document.getElementById('cardDisplay').innerHTML = ''

  // name typed into searchName field
  let pokeSearch = document.getElementById(`input${whichSearch}`).value

  // variable to make if statement work
  let apiURL = ''

  if (whichSearch === 'Name') {
    apiURL = `https://api.pokemontcg.io/v1/cards?name=${pokeSearch}`
  } else if (whichSearch === 'Type') {
    apiURL = `https://api.pokemontcg.io/v1/cards?types=${pokeSearch}`
  }

  axios.get(apiURL)
    .then(res => {
      console.log(res.data.cards)


      for (let i = 0; i < res.data.cards.length; i++) {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'col s3 cardDiv'
        let imgLink = res.data.cards[i].imageUrlHiRes
        let cardRarity = res.data.cards[i].rarity
        let cardSeries = res.data.cards[i].series
        let cardSet = res.data.cards[i].set
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
        document.getElementById('cardDisplay').append(pokeCard)
      }

      // variable to make if statement work
      let infoText = ''

      if (whichSearch === 'Name') {
        infoText = `Pokemon: ${pokeSearch}`
      } else if (whichSearch === 'Type') {
        infoText = `Type: ${pokeSearch}`
      }

      document.getElementById('info').innerText = infoText

      document.getElementById('info').classList.remove('hide')

      // clears text from nameInput
      document.getElementById(`input${whichSearch}`).value = ''

      // end of .then
    })
    .catch(err => {
      console.log(err)
    })

  // end of searchClicked
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