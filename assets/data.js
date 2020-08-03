


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

        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })


})