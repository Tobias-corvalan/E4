

const requestPokemon = async (id) => {
    const API = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    try{

        const response = await fetch(API);
        const data = await response.json();
        console.log(data)
        return data;

    }catch(error){
        console.log(error);
    }
}

