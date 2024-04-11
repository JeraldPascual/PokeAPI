document.querySelector("#search").addEventListener("click", getPokemon);
const user = window.prompt("What`s your name?");


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);



  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
  
      document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div>
      <h2 class="shiny">Shiny:</h2>
      <img
        src="${data.sprites.other["showdown"].front_shiny}"
        alt="Pokemon name" class="shiny"
      />
    </div>
      <div class="pokemonInfos">
      <div class="pokemonHeroInfos">
      <h1>${capitalizeFirstLetter(data.name)}</h1>
      <h2>Types: ${data.types.map((type) => type.type.name).join(', ')}</h2>
      </div>
      <p>Id: ${data.id}</p>
        <p>Weight: ${data.weight}</p>
        <p>Height: ${data.height}<p/>
   
        <p>Attack: ${ data.stats.find(stat => stat.stat.name ==='attack')?.base_stat }<p/>
        <p>Defense: ${data.stats.find(stat => stat.stat.name ==='defense')?.base_stat}<p/>
        
      </div>`;
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <div class="error">
      <h4>${user} Blacked Out! </h4>
      <img
      src="pokemonNotFound.png"
      alt="Pokemon name" class="shiny"
    />
      </div>
 
      `;
      console.log("Pokemon not found", err);
    });

  e.preventDefault();
}
