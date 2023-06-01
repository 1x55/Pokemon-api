//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const potentialPet = new Poke (data.name, data.height, data.weight, data.types, data.sprites.other['official-artwork'].front_default)
        potentialPet.getTypes();
        })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }
  class Poke {
    constructor (name, height, weight, types, image) {
        this.name = name
        this.height = height
        this.types = types
        this.image = image
        this.weight = weight
        this.housepet = true
        this.reason = []
        this.typeList = []
  }

  getTypes() {
    for (const property of this.types) {
        this.typeList.push(property.type.name)
    }
    console.log(this.typeList)
  }

  weightToPounds(weight) {
    return Math.round((weight/4.536)*100)/100
  }

  heightToFeet (height) {
    return Math.round((height/3.048)*100)/100
  }
  isItHousepet() {
    //check height, weight and types
  }
}