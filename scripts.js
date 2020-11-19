// make a button allowing you to start the quiz

//(Access)access pokemon api


//[select](//select) random generation 1 pokemon to display on the screen

//st](//stlye)yle png to create silhouette


// / creat) /make textform for people to submit answer

//allow](//allow) player to submit when hitting enter

// use prevent default so the page doesn't refresh

// use conditional to give play a point if they are right and display it on the page

// if player is right or wrong, reveal the pokemon

// create "Idk, blasting off again" button so they can skip to the next pokemon if they don't know the answer

//cycle](//cycle) to next pokemon when answered

// Stretch goal:

// make sure there is no duplication of pokemon during the game

// make timer and display/lives

// have landing page animated with text sliding in and "who's that pokemon" sound



// Javascript

// app object
const pokeQuiz = {};

// url
pokeQuiz.apiUrl = 'https://pokeapi.co/api/v2/';

// function that will make request for pokemon information
pokeQuiz.pokeInfo = () => {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon/10',
        method: 'GET',
        dataType: 'json'
    }).then((pokemon) => {
        const displayPokemon = pokemon.sprites.front_default;
        $('.pokeImg').attr('src', displayPokemon);
    });

};
pokeQuiz.pokeInfo();


