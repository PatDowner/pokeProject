// const getSearch = pokeName => {

// }


document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()

  // console.log the searched name
  console.log(document.getElementById('nameInput').value)
  // console.log(res.data.cards[0].name)

  // name typed into search field
  let pokeName = document.getElementById('nameInput').value

  axios.get(`https://api.pokemontcg.io/v1/cards?name=${pokeName}`)
    .then(res => {

      console.log(res.data.cards)

      // // test
      // console.log(res.data.cards[5].name)


      for (let i = 0; i < res.data.cards.length; i++) {
        let pokeCard = document.createElement('div')
        let imgLink = res.data.cards[i].imageUrlHiRes
        pokeCard.innerHTML = `<img src="${imgLink}" class="pokeCard">`
        document.getElementById('cardDisplay').prepend(pokeCard)
      }

      // end of .then
    })
    .catch(err => {
      console.log(err)
    })
  // end of clicked search button event listener
})
