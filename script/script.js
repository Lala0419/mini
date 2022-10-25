//   this is for the pokemon APi

const POKEMON_ENDPOINT = "pokemon-color"; //pokemon, pokemon-species, type
const POKEMON_QUERY = "pink";
const GET_POKEMON_BY_COLOR_URL = `https://pokeapi.co/api/v2/${POKEMON_ENDPOINT}/${POKEMON_QUERY}`;

let GET_POKEMON_URL;

const pokemonByColorRes = axios
  .get(GET_POKEMON_BY_COLOR_URL)
  .then(function (response) {
    // handle success
    console.log(response);
    const pokemonSpecies = response.data.pokemon_species;
    console.log("pokemonSpecies", pokemonSpecies);
    // Randomly choose one from the query array
    const index = Math.floor(Math.random() * pokemonSpecies.length);
    const pokemonSearch = response.data.pokemon_species[index];
    const pokemonName = pokemonSearch.name;
    const pokemonURL = pokemonSearch.url;

    // console.log(pokemonName, pokemonURL);
    return axios.get(pokemonURL);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    const errorEl = document.createElement("p");
    const body = document.querySelector("body");
    errorEl.innerText = error.response.data.message;
    body.appendChild(errorEl);
  })
  .then((res) => {
    console.log(res);

    const pokemonImage = document.querySelector(".pokemon__img");
    console.log(pokemonImage);
    pokemonImage.setAttribute(
      "src",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`
    );
  });
