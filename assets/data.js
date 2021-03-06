

// This first chunk of code is resposible for grabbing what was already in the local storage for a returning user, or starting off with an empty array if it is their first time
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

// this loop cycles through the searchHistory array
for (i = 0; i < searchHistory.length; i++) {

  let pokeElem = document.createElement('li')
  pokeElem.className = 'recentPokemon red-text'
  pokeElem.dataset.pokemon = searchHistory[i]
  pokeElem.innerHTML = `
  ${searchHistory[i]}
  `

  document.getElementById('dropdown1').append(pokeElem)

}



// Create a function to store the recent user searches to the local storage and put them into a list on the screen
const storePokemon = () => {

  // Push the users searched city into the searchHistory array that we have

  searchHistory.push(document.getElementById('pokemon').value)

  // Now store it into the local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))


  let searchHistoryElem = document.createElement('li')
  // give that element the following class names
  searchHistoryElem.className = 'recentPokemon red-text'
  searchHistoryElem.dataset.pokemon = document.getElementById('pokemon').value
  searchHistoryElem.innerHTML = `
    ${document.getElementById('pokemon').value}
    `
  // Now append this element into our recentSearchList Element
  document.getElementById('dropdown1').append(searchHistoryElem)
  // clear out the search form
  document.getElementById('pokemon').value = ''

}


const getPokemon = pokemon => {
  // first ajax request
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(result => {
      console.log(result.data)


      document.getElementById('pokemonPicture').innerHTML = `
      <p id="pokeName">${pokemon}</p>
        <img src="${result.data.sprites.front_default}" alt="Pokemon Front Image">
      `



      document.getElementById('pokemonInfo').innerHTML = `
      <p>Type: <button id="typeColor" class="btn waves-effect waves-light">${result.data.types[0].type.name}</button> </p>
      <p>Height: ${result.data.height}ft </p>
      <p>Weight: ${result.data.weight}lbs </p>
      `


      document.getElementById('typeColor').classList.add(`${result.data.types[0].type.name}`)


      document.getElementById('pokemonStats').innerHTML = `
       <p class="statNames">Stats:
        <br>
        Base: ${result.data.stats[0].stat.name}: ${result.data.stats[0].base_stat} <br>
        Base: ${result.data.stats[1].stat.name}: ${result.data.stats[1].base_stat} <br> 
        Base: ${result.data.stats[2].stat.name}: ${result.data.stats[2].base_stat} <br>
        Base: ${result.data.stats[3].stat.name}: ${result.data.stats[3].base_stat} <br>
        Base: ${result.data.stats[4].stat.name}: ${result.data.stats[4].base_stat} <br>
        Base: ${result.data.stats[5].stat.name}: ${result.data.stats[5].base_stat} <br>
        </p>
      `




      document.getElementById('abilities').innerHTML = ``


 

      for (i = 0; i < result.data.abilities.length; i++) {
        axios.get(`${result.data.abilities[i].ability.url}`)
          .then(res => {
            console.log(res.data)
            console.log(res.data.effect_entries[1].effect)


            let abilityElem = document.createElement('p')
            abilityElem.innerHTML = `
            <span class="abilityName">${res.data.name}</span>: ${res.data.effect_entries[1].effect}
            `

            document.getElementById('abilities').append(abilityElem)

          })
          .catch(err => {
            console.log(err)
          })
      }



    })
    .catch(err => {
      console.log(err)
    })


}



document.getElementById('searchPokemon').addEventListener('click', event => {
  event.preventDefault()


  getPokemon(document.getElementById('pokemon').value)

  storePokemon()

})



document.addEventListener('click', event => {
  event.preventDefault()

  if (event.target.classList.contains('recentPokemon')) {

    getPokemon(event.target.dataset.pokemon)
  }

})


