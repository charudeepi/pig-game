/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// PG - Dice Game

// var scores, roundScore, PG.activePlayer, PG.currentScore;
//
// scores = [0,0]; // score of [player1, player2]
// PG.activePlayer = 0;
// PG.currentScore = 0;

var PG = {

    scores: [0,0],
    activePlayer: 0,
    currentScore: 0,
    isPlaying: false,


    switchPlayer: function () {

        PG.currentScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Activate Next player
        PG.activePlayer === 0 ? PG.activePlayer = 1 : PG.activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        setTimeout(function () {
            document.querySelector('.dice').style.display = "none";
        }, 1000);


    },

    rollDice: function () {

        if(PG.isPlaying){

            var dice = Math.floor(Math.random() * 6) + 1,
                diceEle = document.querySelector('.dice');

            //Update dice image and show
            diceEle.src = 'img/dice-'+dice+'.png';
            diceEle.style.display = 'block';

            if(dice === 1){
                PG.switchPlayer();

            }else{
                PG.currentScore += dice ;
                document.getElementById('current-'+PG.activePlayer).textContent = PG.currentScore;
            }
        }

    },
    
    holPGame: function () {

        if(PG.isPlaying){

            PG.scores[PG.activePlayer] += PG.currentScore;
            document.getElementById('score-'+PG.activePlayer).textContent = PG.scores[PG.activePlayer];

            document.querySelector('.dice').style.display = "none";

            var inputScore = document.getElementById('winning-score').value,
                winningScore = 20;

            console.log(inputScore);

            if(inputScore){
                console.log(inputScore);

                winningScore = inputScore;
            }

            if(PG.scores[PG.activePlayer] >= winningScore){

                document.getElementById('name-'+PG.activePlayer).textContent = 'Winner!';
                document.querySelector('.player-'+PG.activePlayer+'-panel').classList.remove('active');
                document.querySelector('.player-'+PG.activePlayer+'-panel').classList.add('winner');
                PG.isPlaying = false;

            }else{
                PG.switchPlayer();
            }

        }
        
    },

    newGame: function(){

        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        PG.init();

    },

    attachEvents: function(){

        document.querySelector('.btn-roll').addEventListener('click', PG.rollDice);

        document.querySelector('.btn-hold').addEventListener('click', PG.holPGame);

        document.querySelector('.btn-new').addEventListener('click', PG.newGame);

    },

    init: function(){
        PG.currentScore = 0;
        PG.activePlayer = 0;
        PG.scores = [0,0];
        PG.isPlaying = true;


        document.getElementById('score-0').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.dice').style.display = 'none';

        // document.querySelector('.player-'+PG.activePlayer+'-panel').classList.remove('winner');
        document.querySelector('.dice').style.display = 'none';

    }

}

PG.init();
PG.attachEvents();

