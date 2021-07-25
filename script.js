const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=50";
var pokemonDetails = [];

async function getAllPokemon() {
  let resp = await fetch(pokeUrl);
  let data = await resp.json();
  getPokemon(data.results);
}

getAllPokemon();

async function getPokemon(allPokemon) {
  try {
    for (element of allPokemon) {
      let resp = await fetch(element.url);
      let data = await resp.json();
      let image = "https://pokeres.bastionbot.org/images/pokemon/"+data.id+".png";
      let name = element.name;
      let weight = data.weight;
      let abilities = data.abilities.map((element) => element.ability.name);
      let moves = data.moves.map((element) => element.move.name);

      pokemonDetails.push({ image, name, weight, abilities, moves });
    }

    displayData(pokemonDetails);
  } catch (e) {
    console.log("Error fetching the Pokemon details >>> " + e);
  }
}

async function displayData(pokemon) {
  try {
    let body = document.body;
     body.style.padding = "60px 30px";
     
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    row.style.margin = "30px 30px";
    pokemon.forEach((element) => {
      let col = document.createElement("div");
      col.setAttribute("class", "col-sm-4");

      let card = document.createElement("div");
      card.setAttribute("class", "card h-80 mb-3");

      let cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");

      let cardImg = document.createElement("img");
      cardImg.setAttribute("class", "card-img-top");
      cardImg.setAttribute("src", element.image);

      let cardTitle = document.createElement("h2");
      cardTitle.setAttribute("class", "h2");
      cardTitle.innerHTML = element.name;

      let cardAbilities = document.createElement("p");
      cardAbilities.setAttribute("class", "p");
      cardAbilities.innerHTML = "Abilities: "+(element.abilities).slice(0,3);

      let cardWeight = document.createElement("p");
      cardWeight.setAttribute("class", "p");
      cardWeight.innerHTML = "Weight: "+(element.weight);

      let cardMoves = document.createElement("p");
      cardMoves.setAttribute("class", "p");
      cardMoves.innerHTML = "Moves: "+(element.moves).slice(0,3);

      cardBody.append(cardTitle, cardAbilities, cardMoves, cardWeight);
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
