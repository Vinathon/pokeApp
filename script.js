const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=50";
var pokemonDetails = [];

async function getAllPokemon() {
  let resp = await fetch(pokeUrl);
  let data = await resp.json();
  console.log(data.results);
  console.log("ID >>> ",data.id);
  getPokemon(data.results);
}

getAllPokemon();

async function getPokemon(allPokemon) {
  try {
    for (element of allPokemon) {
      let resp = await fetch(element.url);
      let data = await resp.json();
      console.log("Element ID >>> ", element.id);
      let image = "https://pokeres.bastionbot.org/images/pokemon/"+data.id+".png";
      let name = element.name;
      let weight = data.weight;
      let abilities = data.abilities.map((element) => element.ability.name);
      let moves = data.moves.map((element) => element.move.name);

      pokemonDetails.push({ image, name, weight, abilities, moves });
      console.log(JSON.stringify(pokemonDetails));
    }

    displayData(pokemonDetails);
  } catch (e) {
    console.log("Error fetching the Pokemon details >>> " + e);
  }
}

async function displayData(pokemon) {
  try {
    console.log("inside display :", pokemon);
    let body = document.body;
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    pokemon.forEach((element) => {
      let col = document.createElement("div");
      col.setAttribute("class", "col-4");

      let card = document.createElement("div");
      card.setAttribute("class", "card h-100 mb-3");

      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");

      let cardImg = document.createElement("img");
      cardImg.setAttribute("class", "card-img-top");
      cardImg.setAttribute("src", element.image);

      let cardTitle = document.createElement("h2");
      cardTitle.setAttribute("class", "h2");
      cardTitle.innerHTML = element.name;

      cardBody.append(cardTitle);
      card.append(cardImg, cardBody);
      col.append(card);
      row.append(col);
    });
    container.append(row);

    body.append(container);
  } catch (error) {
    console.log("Error while displaying data >>> " + e);
  }
}