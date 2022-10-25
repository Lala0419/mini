birthdayMessage = [
  "Growing up with you was never boring, but I wouldn’t have it any other way.",
  "You brighten the lives of everybody you touch. It's why I stay within reach. Have an amazing birthday!",
  "Your birthday will be made of wishes happy birthday!",
  "Merry birthday! They say 'The more the merrier' after all.",
  "I hope you get everything you wanted except for one thing, that way there's something left for me to give. Have a wonderful birthday!",
  "Best wishes on your birthday – may you have many, many more.",
  "Great people have great friends who wish them a fantastic birthday. Have a fantastic birthday!",
  "Surround yourself with laughter and happiness on your birthday. That means inviting me! Happy birthday.",
  "I hope your birthday is as happy as a puppy getting scratched behind the ear. Have a great one!",
  "You make your age look fantastic! Happy birthday!",
  "Getting older sucks, but you make it look easy.",
  "An FFB (Freaking Fantastic Birthday) to my BFF!",
  "I wish you the most spectacularly beautiful birthday!",
  "Lots of love to my birthday beau.",
  "I’d tell you to spoil yourself today, but you’re already pretty rotten!",
  "Congratulations! You survived another year!",
];

// API Information
const POKEMON_ENDPOINT = "pokemon-color"; //pokemon, pokemon-species, type
const POKEMON_QUERY = "pink";

// Form
const form = document.querySelector(".form");
const formInput = document.querySelector(".form__input");
const button = document.querySelector(".form__button");
const date = document.querySelector(".card__date");
const yourName = document.querySelector(".card__name");
const message = document.querySelector(".card__message");

//

// Submit form
const buttonClicked = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const birthday = e.target.birthday.value;
  const color = e.target.color.value;

  console.log(name);
  console.log(birthday);
  console.log(color);
  console.log(name);
  getPokemonImage(color);
  form.classList.add("form--hidden");
  //   Unhide the card
  const card = document.querySelector(".card");
  card.classList.add("card--unhide");

  date.innerText = birthday;
  yourName.innerText = name + ",";
  message.innerText = generateMessage();
};

form.addEventListener("submit", buttonClicked);

function generateMessage() {
  const index = Math.floor(Math.random() * birthdayMessage.length);
  console.log(birthdayMessage[index]);
  return birthdayMessage[index];
}
generateMessage();

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
