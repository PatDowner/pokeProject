


$('#searchPokemon').click(() => {
  event.preventDefault()

  // first ajax request
  $.ajax(`https://pokeapi.co/api/v2/pokemon/${$('#pokemon').val()}`)
    .then(result => {
      console.log(result)

      // first ajax request
      $.ajax(`https://pokeapi.co/api/v2/ability/${result.id}`)
        .then(res => {
          console.log(res)
          console.log(res.effect_entries[1].effect)

          $('#results').html(`
            <img src="${result.sprites.front_default}" alt="Pokemon Front Image">
            ${res.effect_entries[1].effect}
            `)
            


         

            $('#stats').html(`
            <p>Stats: 
            <br>
            ${result.stats[0].stat.name} Base: ${result.stats[0].base_stat} <br>
            ${result.stats[1].stat.name} Base: ${result.stats[1].base_stat} <br> 
            ${result.stats[2].stat.name} Base: ${result.stats[2].base_stat} <br>
            ${result.stats[3].stat.name} Base: ${result.stats[3].base_stat} <br>
            ${result.stats[4].stat.name} Base: ${result.stats[4].base_stat} <br>
            ${result.stats[5].stat.name} Base: ${result.stats[5].base_stat} <br>

            </p>
            `)
            
            
            
            
          })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })


})