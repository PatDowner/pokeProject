// const getSearch = pokeName => {

// }

// when you click the search name button
document.getElementById('searchName').addEventListener('click', event => {
  event.preventDefault()

  // console.log the searched name
  console.log(document.getElementById('nameInput').value)
  // console.log(res.data.cards[0].name)

  // name typed into searchName field
  let pokeName = document.getElementById('nameInput').value

  axios.get(`https://api.pokemontcg.io/v1/cards?name=${pokeName}`)
    .then(res => {

      console.log(res.data.cards)

      // // test
      // console.log(res.data.cards[5].name)


      for (let i = 0; i < res.data.cards.length; i++) {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'col s3 cardDiv'
        let imgLink = res.data.cards[i].imageUrlHiRes
        pokeCard.innerHTML = `
        <img src="${imgLink}" class="pokeCard">`
        document.getElementById('cardDisplay').prepend(pokeCard)
      }

      pokeName = ''

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
        pokeCard.innerHTML = `
        <img src="${imgLink}" class="pokeCard">`
        document.getElementById('cardDisplay').prepend(pokeCard)
      }

      pokeType = ''
      // end of .then
    })
    .catch(err => {
      console.log(err)
    })
  // end of clicked searchType button event listener
})
