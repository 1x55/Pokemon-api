//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

//Button for random Pokemon
document.querySelector('#random').addEventListener('click', getRandomPokemon)

function getFetch(){
  const choice = document.querySelector('input').value.replaceAll(' ','-').replaceAll('.','').toLowerCase(); 
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  fetchAndDisplayPokemon(url)
}

// added function for code reuse
function fetchAndDisplayPokemon(url){
  //clear location information
  document.getElementById('locations').innerText = '';
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const potentialPet = new PokeInfo   (data.name, data.height, data.weight, data.types, data.sprites.other['official-artwork'].front_default, data.location_area_encounters, data.abilities)
        
        potentialPet.getTypes();
        potentialPet.isItHousepet(); //important 

        let decision = ''   
        if (potentialPet.housepet) {
            decision = `This Pokemon is small enough, light enough, and safe enough to be a good pet! You can find ${potentialPet.name} in the following location(s): `
            potentialPet.encounterInfo();
            // document.getElementById('locations').innerText = '' 
        } else {
            decision = `This Pokemon would not be a good pet because: ${potentialPet.reason.join(' and ')}.`
          }
        document.querySelector('h2').innerText = decision
        document.querySelector('img').src = potentialPet.image
        displayAbilities(potentialPet);
     })
      .catch(err => {
          console.log(`error ${err}`)
      });
  }

    function getRandomPokemon() {
      const randomNumber = Math.floor(Math.random()*898) + 1;
      const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
      fetchAndDisplayPokemon(url) //fetch and display the random pokemon
    }
  class Poke {
    constructor (name, height, weight, types, image, abilities) {
        this.name = name
        this.height = height
        this.types = types
        this.image = image
        this.weight = weight
        this.housepet = true
        this.reason = []
        this.typeList = []
        this.abilities = abilities.map(ability => ability.ability.name);
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

  heightToFeet(height) {
    return Math.round((height/3.048)*100)/100
  }
  isItHousepet() {
    //check height, weight and types
    let badTypes = ['fire', 'electric', 'fighting', 'poison', 'ghost', 'psychic'];
    if (this.weightToPounds(this.weight) > 400) {
        this.reason.push(`it is too heavy at ${this.weight} pounds`)
        this.housepet = false
    }
    if (this.heightToFeet(this.height) > 7) {
        this.reason.push(`it is too tall at ${this.height} feet`)
        this.housepet = false
    }
    if (badTypes.some (r => this.typeList.indexOf(r) >= 0)) {
        this.reason.push(`it has a bad type of ${this.typeList.join(', ')}`)
        this.housepet = false
    }
        console.log(this.reason)
  }

}  

class PokeInfo extends Poke {
    constructor (name, height, weight, types, image, location, abilities) {
        super(name, height, weight, types, image, abilities)
        this.locationURL = location
        this.locationList = []
        this.locationString = ''      
    }

    encounterInfo() {
      fetch(this.locationURL)
      .then(res => res.json())  // parse response as JSON
      .then(data => {
        console.log(data)
        //check if location data array is empty. If empty set location information message indicating there is no loaction
        if (data.length === 0 ) {
          let target = document.getElementById('locations') // Fix typo here too
          target.innerText = 'No location information available for this Pokemon.'
        } else {
          for (const item of data) {
            this.locationList.push(item.location_area.name)
          }
          // console.log(this.locationList)
          // console.log(this.locationCleanup())
          let target = document.getElementById('locations')
          target.innerText = this.locationCleanup()
        }
      })
      .catch(err => {
        console.log(`error ${err}`)
      });
  }
//located inside a extended class, method we are calling inside another method, which contains a fetch
locationCleanup() {
  //get first 5 elements of an array
  const words = this.locationList.slice(0,5).join(', ').replaceAll('-',' ').split(' ') 

  for (let i = 0; i < words.length; i++){
    words[i] = words[i][0].toUpperCase() + words[i].slice(1) 
  }
  return words.join(' '); 
}
}

function displayAbilities(pokemon) {
  const abilityList = document.getElementById('abilities');
  abilityList.innerHTML = '';

  // Create a header element and set its text
  const abilitiesHeader = document.createElement('h2');
  abilitiesHeader.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} has the following abilities:`;
  abilityList.appendChild(abilitiesHeader); // append the header to the abilityList

  pokemon.abilities.forEach(ability => {
    const listItem = document.createElement('li');listItem.textContent = ability;
    abilityList.appendChild(listItem);
  });
}