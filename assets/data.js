


$('#searchPokemon').click(() => {
  event.preventDefault()

  // first ajax request
  $.ajax(`https://pokeapi.co/api/v2/pokemon/${$('#pokemon').val()}`)
    .then(result => {
      console.log(result)




      $('#results').html(`
        <img src="${result.sprites.front_default}" alt="Pokemon Front Image">
        <p>Type: <button id="typeColor" class="btn waves-effect waves-light">${result.types[0].type.name}</button> </p>
        <p>height: ${result.height}ft </p>
        <p>Weight: ${result.weight}lbs </p>
        `)

      $('#typeColor').addClass(`${result.types[0].type.name}`)
      





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
                  



      $('#abilities').html('')

      for (i = 0; i < result.abilities.length; i++) {
        $.ajax(`${result.abilities[i].ability.url}`)
          .then(res => {
            console.log(res)
            console.log(res.effect_entries[1].effect)
         
            $('#abilities').append(`<p>${res.name}: ${res.effect_entries[1].effect}</p>`)

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