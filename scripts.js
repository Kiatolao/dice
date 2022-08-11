let scores, currentScore, activePlayer, playing;
const audioDice = new Audio('sounds/rolling-dice.wav')
const audioHold = new Audio('sounds/hold.wav')
const audioNew = new Audio('sounds/new-game.wav')
const audioFail = new Audio('sounds/fail.mp3')
const audioVictory = new Audio('sounds/victory.wav')

//Rules modal
document.querySelector('.quest').addEventListener('click', function(){
    $('#myModal2').modal('show');
});

//New game - reset scores
document.querySelector('.new-game').addEventListener('click', init);
init();

// Button roll -- Dice random generator + dice png switch + current score (+=)
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(playing) {
        audioDice.play();
        document.querySelector('.dice').src= "images/rolling-dice.gif"

        let locked = document.querySelector('.btn-roll');
        locked.disabled=true;

        const delay = 1000;
        setTimeout (function(){
        let dice = Math.floor(Math.random() * 6) + 1;
        

        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`.current-score-${activePlayer}`).textContent = currentScore;
        } else {
            audioFail.play();
            switchPlayer();
        }

        document.querySelector('.dice').src =(`images/dice-${dice}.png`)

        locked.disabled = false;
    }, delay);
}    
});

// Button hold -- add current score to global +  add & check win condition
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (playing) {
        audioHold.play();
        scores[activePlayer] += currentScore;

        document.querySelector(`.global-score-${activePlayer}`).textContent = scores[activePlayer];
        
        if (scores[activePlayer] >= 100) {
            playing = false;
            audioVictory.play();
            
            //Modal winner
            $('#myModal').modal('show');
            if (document.querySelector(`.active-player-${activePlayer}`).classList.contains('active')){
                document.querySelector('.winner').innerHTML = "Player 1 wins!" + "</br>" +"Scores have been reseted."
            } else {
                document.querySelector('.winner').innerHTML = "Player 2 wins!" + "</br>" +"Scores have been reseted."
            }
            init();

        } else{

            switchPlayer();
        }

        locked = document.querySelector('.btn-hold')
        locked.disabled = true;
        const delay = 500;
        setTimeout(function() {
            locked.disabled = false;
        },delay)
    }
});

// Switch to next player
function switchPlayer() {

    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    document.querySelector('.current-score-0').textContent = '0';
    document.querySelector('.current-score-1').textContent = '0';
    document.querySelector('.player-0').classList.toggle('fa-spin');
    document.querySelector('.player-1').classList.toggle('fa-spin');
    document.querySelector('.active-player-0').classList.toggle('.active');
    document.querySelector('.active-player-1').classList.toggle('.active');
     // Need to be improved, for some reasons ('active','bg-light') doesn't work
    document.querySelector('.active-player-0').classList.toggle('bg-light');
    document.querySelector('.active-player-1').classList.toggle('bg-light');


}

// Reset function
function init() {
    audioNew.play();
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    document.querySelector('.global-score-0').textContent = '0';
    document.querySelector('.global-score-1').textContent = '0';
    document.querySelector('.current-score-0').textContent = '0';
    document.querySelector('.current-score-1').textContent = '0';
    document.querySelector('.player-0').classList.remove('fa-spin');
    document.querySelector('.player-1').classList.remove('fa-spin');
    document.querySelector('.player-0').classList.add('fa-spin');
    document.querySelector('.active-player-0').classList.remove('.active');
    document.querySelector('.active-player-1').classList.remove('.active');
    document.querySelector('.active-player-0').classList.add('.active');
    // Same issue than switchPlayer();
    document.querySelector('.active-player-0').classList.remove('bg-light');
    document.querySelector('.active-player-1').classList.remove('bg-light');
    document.querySelector('.active-player-0').classList.add('bg-light');

}

