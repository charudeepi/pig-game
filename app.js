/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// DG - Dice Game

// var scores, roundScore, DG.activePlayer, DG.currentScore;
//
// scores = [0,0]; // score of [player1, player2]
// DG.activePlayer = 0;
// DG.currentScore = 0;

var DG = {

    scores: [0,0],
    activePlayer: 0,
    currentScore: 0,
    isPlaying: false,


    switchPlayer: function () {

        DG.currentScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Activate Next player
        DG.activePlayer === 0 ? DG.activePlayer = 1 : DG.activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        setTimeout(function () {
            document.querySelector('.dice').style.display = "none";
        }, 1000);


    },

    rollDice: function () {

        if(DG.isPlaying){

            var dice = Math.floor(Math.random() * 6) + 1,
                diceEle = document.querySelector('.dice');

            //Update dice image and show
            diceEle.src = 'img/dice-'+dice+'.png';
            diceEle.style.display = 'block';

            if(dice === 1){
                DG.switchPlayer();

            }else{
                DG.currentScore += dice ;
                document.getElementById('current-'+DG.activePlayer).textContent = DG.currentScore;
            }
        }

    },
    
    holdGame: function () {

        if(DG.isPlaying){

            DG.scores[DG.activePlayer] += DG.currentScore;
            document.getElementById('score-'+DG.activePlayer).textContent = DG.scores[DG.activePlayer];

            document.querySelector('.dice').style.display = "none";

            var inputScore = document.getElementById('winning-score').value,
                winningScore = 20;

            console.log(inputScore);

            if(inputScore){
                console.log(inputScore);

                winningScore = inputScore;
            }

            if(DG.scores[DG.activePlayer] >= winningScore){

                document.getElementById('name-'+DG.activePlayer).textContent = 'Winner!';
                document.querySelector('.player-'+DG.activePlayer+'-panel').classList.remove('active');
                document.querySelector('.player-'+DG.activePlayer+'-panel').classList.add('winner');
                DG.isPlaying = false;

            }else{
                DG.switchPlayer();
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
        DG.init();

    },

    attachEvents: function(){

        document.querySelector('.btn-roll').addEventListener('click', DG.rollDice);

        document.querySelector('.btn-hold').addEventListener('click', DG.holdGame);

        document.querySelector('.btn-new').addEventListener('click', DG.newGame);

    },

    init: function(){
        DG.currentScore = 0;
        DG.activePlayer = 0;
        DG.scores = [0,0];
        DG.isPlaying = true;


        document.getElementById('score-0').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.dice').style.display = 'none';

        // document.querySelector('.player-'+DG.activePlayer+'-panel').classList.remove('winner');
        document.querySelector('.dice').style.display = 'none';

    }

}

DG.init();
DG.attachEvents();

