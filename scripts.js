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


//pokemon submisson click event 
pokeQuiz.nextPokemon = $('.nextPokemon').on('click', (e) => {
    e.preventDefault();
    // Counting up to 8 question (global variable value is set to 1 so questionCounter is set to 9)
    pokeQuiz.questionCounter++;
    // console.log(pokeQuiz.questionCounter);
    // After clicking .nextPokemon 8 times, redirect user to either:
        // Congratulation page, or the try again page
    if (pokeQuiz.questionCounter === 9) {
        // if (pokeQuiz.correctQuestion === 8) {
        //     window.location.href = "pokemonMaster.html"
        // }else  {
        //     window.location.href = "notMaster.html"
        // };
        console.log('the game is over');
        $('h3').html('you finished');
    };
});



// submit button effects:
pokeQuiz.clickCorrect = $('.submit').on('click', (e) => {
    e.preventDefault();
    const lowercasePoke = $('.textBox').val().toLowerCase();
    console.log(pokeQuiz.name);
    
    // If answer is correct:
    if (lowercasePoke === pokeQuiz.name) {
        $('.nextPokemon').css('visibility', 'visible');
        
        $('.pokeImg').removeClass('shadow');
        $(`#${pokeQuiz.questionCounter}`).removeClass('badgeShadow');
        $('.buttonhide').css('display', 'none');
        $('.pokemonAnswer').html(pokeQuiz.name + '!!!');
        
        
        // If answer is wrong:
    } else {
        // text input form shakes when user writes wrong answers
        $('#shake').effect('shake', {distance:4, times: 3});
    };
});




// Pass button
pokeQuiz.clickPass = $('.pass').on('click', (e) => {
    e.preventDefault();
    // Reveals the pokemon img and the pokemon name
    $('.nextPokemon').css('visibility', 'visible');
    $('.buttonhide').css('display', 'none');
    console.log('this is the pass button')
    $('.pokeImg').removeClass('shadow');
    $('.pokemonAnswer').html(pokeQuiz.name + '!!!');
    // Remove the text input form and replace it with the correct answer ("It's..." + ${pokemon name} + "!!!")
});



// Next pokemon button
pokeQuiz.clickNext = $('.nextPokemon').on('click', (e) => {
    e.preventDefault();
    // reset text input form by putting in an empty string on click
    $('.textBox').val('');
    // Put shadow back on pokemon image
    $('.pokeImg').addClass('shadow');
    pokeQuiz.pokeInfo();
    // Hide the next pokemon once new pokemon loads
    $('.nextPokemon').css('visibility', 'hidden');
    $('.buttonhide').css('display', 'initial');
    $('.pokemonAnswer').html('');
});




// API url
pokeQuiz.apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// store pokemons that already came up in the previous questions to prevent duplicates:
pokeQuiz.storedPokemon = [];

// function that will make request for pokemon information
pokeQuiz.pokeInfo = () => {
    let pokeRandom = Math.floor(Math.random() * 151) + 1;

    // prevents duplicate pokemons:
    // looks for pokemon stored in storedPokemon array and run again if it does
    while (pokeQuiz.storedPokemon.includes(pokeRandom)) {
        pokeRandom = Math.floor(Math.random() * 151) + 1;
    };
    pokeQuiz.storedPokemon.push(pokeRandom);


    $.ajax({
        url: `${pokeQuiz.apiUrl}${pokeRandom}`,
        method: 'GET',
        dataType: 'json'
    }).then((pokemon) => {
        const displayPokemon = pokemon.sprites.front_default;
        pokeQuiz.name = pokemon.name;
        // Replace pokemon img src with a random one
        $('.pokeImg').attr('src', displayPokemon);
        console.log(pokeRandom);
    });
};



// Initialization
pokeQuiz.init = () => {
    pokeQuiz.pokeInfo();
    pokeQuiz.chosenPokemon = [];
    pokeQuiz.questionCounter = 1;
    pokeQuiz.correctQuestion = 0;
};
$(function () {
    pokeQuiz.init();
});
