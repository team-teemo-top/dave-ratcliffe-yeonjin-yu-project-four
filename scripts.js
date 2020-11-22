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
        if (pokeQuiz.correctQuestion === 8) {
            window.location.href = "pokemonMaster.html"
        }else  {
            window.location.href = "notMaster.html"
        };
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



// Initializations and global variables
pokeQuiz.init = () => {
    pokeQuiz.pokeInfo();
    pokeQuiz.chosenPokemon = [];
    pokeQuiz.questionCounter = 1;
    pokeQuiz.correctQuestion = 0;
};
$(function () {
    pokeQuiz.init();
});
