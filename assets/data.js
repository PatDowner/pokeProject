


$('#searchPokemon').click(() => {
  event.preventDefault()

  // first ajax request
  $.ajax(`https://pokeapi.co/api/v2/pokemon/${$('#pokemon').val()}`)
    .then(result => {
      console.log(result)


      $('#pokemonPicture').html(`
      <h4 id="pokeName">${$('#pokemon').val()}</h4>
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
})