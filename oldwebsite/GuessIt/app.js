//toggle About
function showHideAbout() {
	$("#show-about").toggle(function(){});
}

//create sequence of 4 numbers that user will guess
function getJackpot() {
	var string = "";
	var numberset = "0123456789";
	for (var i = 0; i < 4; i++) {
		var numberToAdd = numberset[Math.floor(Math.random()*numberset.length)];
		string += numberToAdd;
		numberset = numberset.replace(numberToAdd, "");
	}
  return string
}

//clear user input
function clearGuessInputs() {
	console.log("inputs cleared");
	document.getElementById("input-1").value = "";
	document.getElementById("input-2").value = "";
	document.getElementById("input-3").value = "";
	document.getElementById("input-4").value = "";
}

//start new game
function startGame() {
	console.log("game started");
	$("#results tbody tr").remove(".result");	
	$("#message p").empty();	
	$("#message").hide();
	$("#game").show();
	$("#input-1").trigger("focus");	
	evaluations = [];
	numGuesses = 0;
	jackpot = getJackpot();
	jackpotArray = jackpot.split("");
	clearGuessInputs();	
	numberSet = "0123456789";
	numberSetArray = numberSet.split("");
	userGuess = "    ";	
	userguesses = [];
}

//quit current game and start new game
function newGame() {
	console.log("game ended");
	$("#show-about").hide();	
	$("#results tbody tr").remove(".result");
	$("#message p").empty();
	message = "Quitting already with "+numGuesses.toString()+" guesses, I see. </br>The sequence of numbers was: "+jackpot+".</br>Let's <span style='color: #1fa2d6' onclick='startGame()'>play</span> again!";
	$("#message p").append(message);
	$("#game").hide();
	$("#message").show();
}

//show user's statistics for the game when game is won
function gameWon() {
	console.log("game won");
	$("#show-about").hide();	
	$("#results tbody tr").remove(".result");
	$("#message p").empty();
	message = "Congratulations!!</br> It took you "+numGuesses.toString()+" guesses to guess the right sequence of numbers: "+jackpot+".</br>Let's <span style='color: #1fa2d6' onclick='startGame()'>play</span> again!";
	$("#message p").append(message);
	$("#game").hide();
	$("#message").show();
}

//evaluate user's guess
function Guess() {
	$("#input-1").trigger("focus");			
	$("td").removeClass("pulse");
	var guessString = document.getElementById("input-1").value + document.getElementById("input-2").value + document.getElementById("input-3").value + document.getElementById("input-4").value;
	var guess = guessString.split("");
	var guessToSort = guess.slice(0);

	function checkForRepetition() {
		var sortedGuess = guessToSort.sort();
		for (var j = 0; j < sortedGuess.length - 1; j++) {
			if (sortedGuess[j+1] == sortedGuess[j]) {
				clearGuessInputs();
				console.log("repeated values");
				return true
			}
		}
		if (userguesses.indexOf(guessString) > -1) {
			clearGuessInputs();
			console.log("guessed this already");
			return true
		}
		else {
			console.log("good guess");
			return false
		}
	}

	function checkIfAllNumbers() {
		var yes = 0;
		for (var m = 0; m < guess.length; m++) {
			if (numberSetArray.indexOf(guess[m]) > -1) {
				yes += 1;
			}
		}
		if (yes == 4) {
			return true
		}
		else {
			clearGuessInputs();
			return false
		}
	}

	if (guess.length < 4) {
		console.log("didn't enter a four-number sequence");
	}
	else if (guess.length == 4 && checkIfAllNumbers() && !checkForRepetition()) {
		clearGuessInputs();
		userGuess = "    ";
		numberSet = "0123456789";
		numGuesses += 1;

		var rightNumPosCount = 0;
		var rightNumWrongPosCount = 0;
		showUser = "";
		for (var a = 0; a < guess.length; a++) {
			if (guess[a] == jackpotArray[a]) {
				rightNumPosCount += 1;
			}
			else if ((jackpotArray.indexOf(guess[a]) > -1) && (guess[a] !== jackpotArray[a])) {
		  	rightNumWrongPosCount += 1;
			}
		}
		if (rightNumPosCount != 0) {
			showUser += rightNumPosCount + "A";
		}
		if (rightNumWrongPosCount != 0) {
			showUser += rightNumWrongPosCount + "B";
		}
		if (showUser == "") {
			showUser = "Welp, nothing's right..";
		}
		userguesses.push(guessString);
		evaluations.push(showUser);
		showResults();	
	}
}

function Pulse() {
	$(".pulse").toggle(function() {$(".pulse").css("display", "none");}, function() {$(".pulse").css("display", "table-cell");});
}

//show user's progress for the game
function showResults() {
	result = "<tr class='result'><td class='pulse'>"+numGuesses.toString()+"</td><td class='pulse'>"+userguesses[numGuesses-1]+"</td><td class='pulse'>"+evaluations[numGuesses-1]+"</td></tr>";
	$("#results tbody").append(result);
	setInterval(Pulse(), 2000);
	if (showUser == "4A") {
		setTimeout(function(){gameWon();}, 3000);
	}		
}

$(document).ready(function() {
	if ($("#message").css("display") != "none") {
		$("#message").click(startGame());
	}

	startGame();

	$("#show-about").hide();

	//check user input
	$('.guess').keydown(function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		guessString = document.getElementById("input-1").value + document.getElementById("input-2").value + document.getElementById("input-3").value + document.getElementById("input-4").value;		
		guess = guessString.split("");
    if (key == 13) {
	    if (guess.length == 4) {
	    	$("#go-guess").click();
	    	return false
	    }
	    else {
	    	return false
	    }
	  }
	  else if (e.which == 8) {
	  	if (this.value.length == 1) {
		  	this.value = '';	
	  		return false
	  	}
	  	else {
		  	if (this.id == 'input-4') {
					$('#input-3').trigger('focus');
				}
				else if (this.id == 'input-3') {
					$('#input-2').trigger('focus');
				}
				else if (this.id == 'input-2') {
					$('#input-1').trigger('focus');
				}
			  return false
			}
	  }
		else if (e.which == 37) {
			if (this.id == 'input-4') {
				$('#input-4').blur(function() {document.getElementById('input-3').setSelectionRange(0, this.value.length);});
				$('#input-3').trigger('focus');				
			}
			else if (this.id == 'input-3') {
				$('input-3').blur(function() {document.getElementById('input-2').setSelectionRange(0, this.value.length);});
				$('#input-2').trigger('focus');
			}
			else if (this.id == 'input-2') {
				$('input-2').blur(function() {document.getElementById('input-1').setSelectionRange(0, this.value.length);});
				$('#input-1').trigger('focus');		
			}			
			return false
		}
		else if (e.which == 39) {
			if (this.id == 'input-1') {
				$('#input-1').blur(function() {document.getElementById('input-2').setSelectionRange(0, this.value.length);});
				$('#input-2').trigger('focus');
			}
			else if (this.id == 'input-2') {
				$('#input-2').blur(function() {document.getElementById('input-3').setSelectionRange(0, this.value.length);});
				$('#input-3').trigger('focus');
			}
			else if (this.id == 'input-3') {
				$('#input-3').blur(function() {document.getElementById('input-4').setSelectionRange(0, this.value.length);});
				$('#input-4').trigger('focus');
			}
			return false
		}
		else if ((key != 32 && !e.shiftKey && (!isNaN( String.fromCharCode(key) )))) {
	  	return true
	  }
	  else {
	  	e.preventDefault();
	  }
	});

	$('.guess').keyup(function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if ((key != 32 && !e.shiftKey && (!isNaN( String.fromCharCode(key) )))) {
			if (this.value.length == 1 && this.id == 'input-1') {
				$('#input-2').trigger('focus');
			}
			else if (this.value.length == 1 && this.id == 'input-2') {
				$('#input-3').trigger('focus');
			}
			else if (this.value.length == 1 && this.id == 'input-3') {
				$('#input-4').trigger('focus');
			}
		}
	});
});