// const getSearch = pokeName => {

// }

// when you click the search name button
document.getElementById('searchName').addEventListener('click', event => {
  event.preventDefault()

  // clear the div from previous searches
  document.getElementById('cardDisplay').innerHTML = ''

  // console.log the searched name
  console.log(document.getElementById('nameInput').value)
  // console.log(res.data.cards[0].name)

  // name typed into searchName field
  let pokeName = document.getElementById('nameInput').value

  axios.get(`https://api.pokemontcg.io/v1/cards?name=${pokeName}`)
    .then(res => {

      console.log(res.data.cards)


      for (let i = 0; i < res.data.cards.length; i++) {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'col s3 cardDiv'
        let imgLink = res.data.cards[i].imageUrlHiRes
        let cardSet = res.data.cards[i].set
        let cardRarity = res.data.cards[i].rarity
        pokeCard.innerHTML = `
        <div class="pokeCardItem">
          <img src="${imgLink}" class="pokeCard">
          <div class="cardInfo">
            <p class="cardRarity"><b>Rarity:</b> ${cardRarity}</p>
            <p class="cardSet"><b>Card set:</b> ${cardSet}</p>
          </div>
        </div>
        `
        document.getElementById('cardDisplay').append(pokeCard)
      }

      document.getElementById('info').innerText = `Pokemon: ${pokeName}`

      document.getElementById('info').classList.remove('hide')

      // clears text from nameInput
      document.getElementById('nameInput').value = ''

      // end of .then
    })
    .catch(err => {
      console.log(err)
    })
  // end of clicked searchName button event listener

})



// when you click the search type button
document.getElementById('searchType').addEventListener('click', event => {
  event.preventDefault()

  // clear the div from previous searches
  document.getElementById('cardDisplay').innerHTML = ''

  // console.log the searched name
  console.log(document.getElementById('typeInput').value)
  // console.log(res.data.cards[0].name)

  // name typed into searchType field
  let pokeType = document.getElementById('typeInput').value

  axios.get(`https://api.pokemontcg.io/v1/cards?types=${pokeType}`)
    .then(res => {

      console.log(res.data.cards)

      // // test
      // console.log(res.data.cards[5].name)


      for (let i = 0; i < res.data.cards.length; i++) {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'col s3 cardDiv'
        let imgLink = res.data.cards[i].imageUrlHiRes
        let cardSet = res.data.cards[i].set
        let cardRarity = res.data.cards[i].rarity
        pokeCard.innerHTML = `
        <div class="pokeCardItem">
          <img src="${imgLink}" class="pokeCard">
          <div class="cardInfo">
            <p class="cardRarity"><b>Rarity:</b> ${cardRarity}</p>
            <p class="cardSet"><b>Card set:</b> ${cardSet}</p>
          </div>
        </div>
        `
        document.getElementById('cardDisplay').append(pokeCard)
      }

      document.getElementById('info').innerText = `Type: ${pokeType}`

      document.getElementById('info').classList.remove('hide')

      // clears text from typeInput
      document.getElementById('typeInput').value = ''

      // end of .then
    })
    .catch(err => {
      console.log(err)
    })
  // end of clicked searchType button event listener
})
