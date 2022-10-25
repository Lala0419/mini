// API Information
const POKEMON_ENDPOINT = "pokemon-color"; //pokemon, pokemon-species, type
const POKEMON_QUERY = "pink";

// Form
const form = document.querySelector(".form");
const formInput = document.querySelector(".form__input");
const button = document.querySelector(".form__button");

// Submit form
const buttonClicked = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const birthday = e.target.birthday.value;
  const color = e.target.color.value;
  console.log(name);
  console.log(birthday);
  console.log(color);

  //   Add pokemon + unsplash image
  getPokemonImage(color);
  getUnsplashImage(color);

  form.classList.add("form--hidden");
  //   Unhide the card
  const card = document.querySelector(".card");

  card.classList.add("card--unhide");
};

form.addEventListener("submit", buttonClicked);

function getPokemonImage(color) {
  const GET_POKEMON_BY_COLOR_URL = `https://pokeapi.co/api/v2/${POKEMON_ENDPOINT}/${color}`;

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

      return axios.get(pokemonURL);
    })
    .catch(function (error) {
      // handle error -- to fix - handling error message
      console.log(error);
      const errorEl = document.createElement("p");
      const body = document.querySelector("body");
      errorEl.innerText = error.response.data.message;
      body.appendChild(errorEl);
    })
    .then((res) => {
      const pokemonImage = document.querySelector(".pokemon__img");
      console.log(pokemonImage);
      pokemonImage.setAttribute(
        "src",
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`
      );
    });
}

// Unsplash API
const UNSPLASH_ACCESS_KEY = "ooIRJ7ansEiKhHfOACJ29DNlq-ths_z7C7OV7IAk6CQ";
const UNSPLASH_SECRET_KEY = "zeNu4O__ujeXBYEnDuaqjUJY_NsoUDDO1VXP5iSCdBo";
function getUnsplashImage(color) {
  const UNSPLASH_URL = `https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_ACCESS_KEY}&color=${color}&query=birthday`;

  const unsplashRes = axios
    .get(UNSPLASH_URL)
    .then(function (response) {
      console.log(response);
      console.log(response.data.results[0].urls.small);
      const imageURL = response.data.results[0].urls.small;

      //   render the image
      const unsplashImage = document.querySelector(".card__front-unsplash");
      unsplashImage.setAttribute("src", imageURL);
    })
    .catch(function (error) {
      console.log(error);
    });
}
