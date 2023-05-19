//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const potentialPet = new Poke ())_
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

  class Poke {
    constructor (name, height, weight, types, image) {
        this.name = name
        this.height = height
        this.types = types
        this.image = image
        this.weight = weight
        this.housepet = true
        this.reason = []
  }
}