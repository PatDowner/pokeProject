// const getSearch = pokeName => {

// }


axios.get(`https://api.pokemontcg.io/v1/cards`)
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
      // Run a loop to find which item in teh array matches that name
      for (let i = 0; i < res.data.cards.length; i++) {

        // finds index position of that name
        if (pokeName === res.data.cards[i].name) {
          pokeNameIndex = currentIndex

        } else {
          // console.log('else ' + pokeName)
          // console.log([i])
          currentIndex++
        }
        // end of loop
      }
      console.log(pokeNameIndex)
      console.log(res.data.cards[pokeNameIndex].id)
      let setCode = res.data.cards[pokeNameIndex].setCode
      console.log(setCode)
      let number = res.data.cards[pokeNameIndex].number
      console.log(number)

      let card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `<img src = "https://images.pokemontcg.io/${setCode}/${number}_hires.png">`

      document.getElementById('cardDisplay').append(card)

      // end of button click listener
    })

    // end of .then
  })
  .catch(err => {
    console.log(err)
  })
