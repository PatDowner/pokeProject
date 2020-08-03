// const getSearch = pokeName => {

// }


axios.get(`https://api.pokemontcg.io/v1/cards/name`)
  .then(res => {
    // console.log(res.data)
    document.getElementById('search').addEventListener('click', event => {
      event.preventDefault()

      // start at index 0 so we can go through the whole index later
      let currentIndex = 0

      // console.log(currentIndex)

      // console.log the searched name
      console.log(document.getElementById('nameInput').value)
      // console.log(res.data.cards[0].name)

      // name typed into search field
      let pokeName = document.getElementById('nameInput').value
      let pokeNameIndex = ''
      // // Run a loop to find which item in teh array matches that name
      // for (let i = 0; i < res.data.cards.length; i++) {

      //   // finds index position of that name
      //   if (pokeName === res.data.cards[i].name) {
      //     pokeNameIndex = currentIndex

      //   } else {
      //     // console.log('else ' + pokeName)
      //     // console.log([i])
      //     currentIndex++
      //   }
      //   // end of loop
      // }
      // console.log(pokeNameIndex)

      // Run loop to fetch all the cards for pokeName
      for (let i = 0; i < res.data.cards.length; i++)
        if (pokeName === res.data.cards[i].name) {
          console.log(res.data.cards[i].name)
          console.log(res.data.cards[i].imageUrlHiRes)
        } else {
          console.log('oops')
        }
      // console.log(imgLink)
      // let pokeCard = document.createElement('img')
      // pokeCard.innerHTML = `<img src="${imgLink}" class="pokeCard">`
      // console.log(`https://api.pokemontcg.io/v1/cards?name=${pokeName}`)
      // document.getElementById('cardDisplay').append(pokeCard)

      // end of button click listener
    })

    // end of .then
  })
  .catch(err => {
    console.log(err)
  })
