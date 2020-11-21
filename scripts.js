// make a button allowing you to start the quiz

//access pokemon api


//select random generation 1 pokemon to display on the screen

//style png to create silhouette


// make textform for people to submit answer

//allow player to submit when hitting enter

// use prevent default so the page doesn't refresh

// use conditional to give play a point if they are right and display it on the page

// if player is right or wrong, reveal the pokemon

// create "Idk, blasting off again" button so they can skip to the next pokemon if they don't know the answer

//cycle to next pokemon when answered

// Stretch goal:

// make sure there is no duplication of pokemon during the game

// make timer and display/lives

// have landing page animated with text sliding in and "who's that pokemon" sound

//load pokemon on start
//if correct reveal pokemon and display badge
//prevent default on form
//display next button to reveal the next pokemon
//if incorrect nothing changes
// if skipped revel pokemon but no badge given and next button appers to go on to the next pokemon
//clear page and rerun ajax
// make an array so the badges are displayed
// use a for each diplay the nadge indvidually with each point
// make a limit of 8 rounds before the game ends
// notify game has ended and create a replay button 
//global counter property 

// Javascript


//questions 
// how to get the value from the ajax into the event callback function
// how would you go about getting the badges on the screen. Would you use an array and append or just toggle classes with visibility 


//testing


// app object
const pokeQuiz = {};
pokeQuiz.badge = [];


//pokemon submisson click event 
pokeQuiz.nextPokemon = $('.nextPokemon').on('click', (e) => {
    e.preventDefault();
    pokeQuiz.questionCounter++;
    console.log(pokeQuiz.questionCounter)
    if (pokeQuiz.questionCounter === 8) {
        console.log('the game is over')
        $('h1').html('you finished');
    }
})
pokeQuiz.dataRetrieve = function (pokemon) {
    pokeQuiz.clickCorrect = $('.correct').on('click', (e) => {
    e.preventDefault();
    const lowercasePoke = $('.textBox').val().toLowerCase();
    console.log(pokemon.name)
    if (lowercasePoke === pokemon.name) {
        $('.nextPokemon').css('visibility', 'visible');
            console.log("you're right")
            $('.pokeImg').removeClass('shadow');
        }else{
            // $('#shake').effect('shake');
            console.log("that's not the right pokemon you dummy")
        }
});
pokeQuiz.clickPass = $('.pass').on('click', (e) => {
    e.preventDefault();
    $('.nextPokemon').css('visibility', 'visible');
    console.log('this is the pass button')
    $('.pokeImg').removeClass('shadow');
});
}
pokeQuiz.clickNext = $('.nextPokemon').on('click', (e) => {
    e.preventDefault();
    $('.textBox').val('');
    pokeQuiz.pokeRandomizer = Math.floor(Math.random() * 151) + 1;
    $('.pokeImg').addClass('shadow');
    pokeQuiz.pokeInfo(pokeQuiz.pokeRandomizer);
    $('.nextPokemon').css('visibility', 'hidden');
})

// url
pokeQuiz.apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

pokeQuiz.pokeRandomizer = Math.floor(Math.random() * 151) + 1;
// function that will make request for pokemon information
pokeQuiz.pokeInfo = (pokeRandom) => {
    $.ajax({
        url: `${pokeQuiz.apiUrl}${pokeRandom}`,
        method: 'GET',
        dataType: 'json'
    }).then((pokemon) => {
        const displayPokemon = pokemon.sprites.front_default;
        pokeQuiz.name = pokemon.name
        $('.pokeImg').attr('src', displayPokemon);
        pokeQuiz.dataRetrieve(pokemon);
    });

console.log(pokeQuiz.pokeRandomizer);
};

pokeQuiz.init = () => {
pokeQuiz.pokeInfo(pokeQuiz.pokeRandomizer);
pokeQuiz.questionCounter = 0;
}
$(function () {
  pokeQuiz.init();
});
