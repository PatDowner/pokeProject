

// This first chunk of code is resposible for grabbing what was already in the local storage for a returning user, or starting off with an empty array if it is their first time
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

// this loop cycles through the searchHistory array
for (i = 0; i < searchHistory.length; i++) {
 
  $('#dropdown1').append(`
    <li class="recentPokemon red-text">${searchHistory[i]}</li>
  `)

}



// Create a function to store the recent user searches to the local storage and put them into a list on the screen
const storePokemon = () => {

  // Push the users searched city into the searchHistory array that we have
  // searchHistory.push(document.getElementById('city').value)
  searchHistory.push($('#pokemon').val())

  // Now store it into the local storage
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))


  $('#dropdown1').append(`
    <li class="recentPokemon red-text">${$(`#pokemon`).val()}</li>
  `)

}



const getPokemon = pokemon => {
  // first ajax request
  $.ajax(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(result => {
      console.log(result)


      $('#pokemonPicture').html(`
      <h4 id="pokeName">${pokemon}</h4>
        <img src="${result.sprites.front_default}" alt="Pokemon Front Image">
      `)





      $('#pokemonInfo').html(`
      <p>Type: <button id="typeColor" class="btn waves-effect waves-light">${result.types[0].type.name}</button> </p>
      <p>Height: ${result.height}ft </p>
      <p>Weight: ${result.weight}lbs </p>
      `)

      $('#typeColor').addClass(`${result.types[0].type.name}`)



      // work on this later!!!
      // $('#test').removeClass(`yellow ${result.types[0].type.name}`)
      // $('#test').addClass(`${result.types[0].type.name}`)


      $('#pokemonStats').html(`
        <p>Stats:
        <br>
        Base: ${result.stats[0].stat.name}: ${result.stats[0].base_stat} <br>
        Base: ${result.stats[1].stat.name}: ${result.stats[1].base_stat} <br> 
        Base: ${result.stats[2].stat.name}: ${result.stats[2].base_stat} <br>
        Base: ${result.stats[3].stat.name}: ${result.stats[3].base_stat} <br>
        Base: ${result.stats[4].stat.name}: ${result.stats[4].base_stat} <br>
        Base: ${result.stats[5].stat.name}: ${result.stats[5].base_stat} <br>
        </p>
      `)




      $('#abilities').html('')

      for (i = 0; i < result.abilities.length; i++) {
        $.ajax(`${result.abilities[i].ability.url}`)
          .then(res => {
            console.log(res)
            console.log(res.effect_entries[1].effect)

            $('#abilities').append(`<p>${res.name}: ${res.effect_entries[1].effect}</p><br>`)

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




$('#searchPokemon').click(() => {
  event.preventDefault()

  
  getPokemon($('#pokemon').val())
  
  storePokemon()
  
})








$('.recentPokemon').click(function () {
  event.preventDefault()
  console.log('works')
  console.log($(this).text())

  getPokemon($(this).text())


})








