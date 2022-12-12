const number = document.getElementById("number");
const button = document.getElementById("btn");
const form = document.getElementById("form");
const container = document.querySelector(".container-card");


const createHTMLerror = (pokemon) => {

    return `
    <div class="error">
        <img src="${pokemon.img} " alt="error">
        <div class="card-body-error">
            <h2>${pokemon.name}</h2>
        </div>
    </div> `

}

const createHTML = (pokemon) => {
    return `
    <div class="card">
        <img src="${pokemon.sprites.front_default} " alt="pokemon">
        <div class="card-body">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <div class= "card-body__stats">
                <h4>Tipo</h4>
                <p>${pokemon.types.map(types => types.type.name)}</p>
                <p>Peso: ${pokemon.weight / 10} kg</p>
                <p>Altura: ${pokemon.height / 10} m</p>
            </div>
        </div>
    </div> `
}

const RenderMsj = (pokemon) => {

    if(pokemon.id === "" || pokemon.id == undefined){
        const pokemon_render = createHTMLerror(pokemon);
        container.innerHTML = pokemon_render;
        return pokemon_render;
    }else{
        const pokemon_render = createHTML(pokemon);
        container.innerHTML = pokemon_render;
        return pokemon_render;
    }
}
const SetLocalStorage = (pokemon) => {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
}


const searchPokemon = async (e)=> {

    e.preventDefault();
    const id = number.value;
    console.log(id);
    const pokemon = await requestPokemon(id);
    console.log(pokemon)
    if(id === ""){
        RenderMsj({id:"", name:"No se ingreso ningun valor", img:"./img/error.jpg"});

    }else if(pokemon === undefined){
        RenderMsj({id:undefined, name:"Pokemon no encontrado", img:"./img/error.jpg"});
    }else{
        RenderMsj(pokemon);
        SetLocalStorage(pokemon);
    }
    
    number.value = "";
}



function init(){

    const poke = JSON.parse(localStorage.getItem("pokemon"));
    if(poke !== null){
        RenderMsj(poke);
    }
    form.addEventListener("submit", searchPokemon);
}

init();