var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var special;
$('#hit-button').prop('disabled', true);
$('#stand-button').prop('disabled', true);

$(document).ready(function(){
	$('button').click(function(){
		var clickedButton = ($(this).attr('id'));
		if(clickedButton == 'deal-button'){
			deal();
		}else if(clickedButton == 'hit-button'){
			hit();
		}else if(clickedButton == 'stand-button'){
			stand();
		}else if(clickedButton == 'reset-button'){
			reset();
		};
	});
// 	$(".chips").click(function(){
// 		thisBet = Number($(this).attr("value"));
// 		if(thisBet > bank){
// 			$("#message").html("Not Enough Funds!");
// 		}else{
// 				bet = bet + thisBet;
// 				bank = bank - thisBet;
// 				$(".bets").html(bet);
// 				$(".bank").html(bank);
// 		}

});

	function deal(){
		shuffleDeck();
		playerHand = [theDeck[0], theDeck[2] ];
		dealerHand = [theDeck[1], theDeck[3] ];
		placeInDeck = 4;
		placeCard(playerHand[0], 'player', 'one');
		placeCard(dealerHand[0], 'dealer', 'one');
		placeCard(playerHand[1], 'player', 'two');
		calculateTotal(playerHand, 'player');
		calculateTotal(dealerHand, 'dealer');
		$('#deal-button').prop('disabled',true);
		$('#hit-button').prop('disabled', false);
		$('#stand-button').prop('disabled', false);
		$('.dealer-total').html('0');
		$('#message').html("Hit or Stand?");


	
}

	function calculateTotal(hand, whoTurn){
		console.log(hand)
		var total = 0;
		var hasAce = 0;
		
		for(i=0; i<hand.length; i++){
			// purposely NOT fixing 11, 12, or 13, or 1 = 11
			var cardValue = Number(hand[i].slice(0, -1));
			// console.log(cardValue);
			
			if((cardValue === 11) || (cardValue === 12) || (cardValue === 13)){
				cardValue = 10;
			}
			
			if(cardValue === 1){
				hasAce = 1
				if(total + 11 <=21){
					cardValue = 11;
				}else{
					cardValue = 1;
				}
			}
			total += cardValue;

			if(hand[i][hand[i].length-1] == 'r'){
			//do something special
				if((hand[i] == '1r') || (hand[i] == '5r')){
					death(whoTurn);
					break;
				}else if(hand[i] == '3r'){
					instantWin(whoTurn);
				}else if(hand[i] == '2r'){
					total -= 2;
				}else if(hand[i] == '4r'){
					total -= 4;
				}
			}			

		}

		if((hasAce) && (total>21)){
			total -= 10;
		}	
	var idToGet ='.' + whoTurn + '-total';
	$(idToGet).html(total);
	if(total > 21){
		bust(whoTurn);
		}
		return total;
}

	function death(who){
		$('#hit-button').prop('disabled',true);
		$('#stand-button').prop('disabled',true);
		$('#message').html("DEATH!");
	}

	function instantWin(who){
		$('#hit-button').prop('disabled',true);
		$('#stand-button').prop('disabled',true);
		$('#message').html("BLACK JACK!");
			
	}

	function placeCard(card, who, slot){
		var currId = '#' + who + '-card-' + slot;
		$(currId).removeClass('empty');
		$(currId).html('<img src="img/' + card +'.jpg">');

}

	function shuffleDeck(){
		theDeck = [];
		for(var s = 1; s <= 5; s++){    
			var suit = "";
			var lengthSuit = 13;
			if(s === 1){
				suit = 'h';
			}else if(s === 2){
				suit = 's';
			}else if(s === 3){
				suit = 'd';
			}else if(s === 4){
				suit = 'c';
			}else if (s === 5){
				suit = 'r';
				lengthSuit = 5;
			}
			for (i = 1; i<=lengthSuit; i++){
				theDeck.push(i+suit);
				
			}
		}
		var numberOfTimesToShuffle = 500;
		for(i=1; i<numberOfTimesToShuffle; i++){
			card1 = Math.floor(Math.random() * theDeck.length);
			card2 = Math.floor(Math.random() * theDeck.length);
			if(card1 != card2){
				temp = theDeck[card1];
				theDeck[card1] = theDeck[card2];
				theDeck[card2] = temp;
			}			
		}

		for(i = 0; i < 4; i++){
			if(theDeck[i][theDeck[i].length-1] == 'r'){
				var playerNeedsNewCard = 1;
				while(playerNeedsNewCard){
					var newCard = Math.floor(Math.random() * theDeck.length);
					temp = theDeck[i];
					theDeck[i] = theDeck[newCard];
					theDeck[card2] = temp;
					if(theDeck[i][theDeck[i].length-1] != 'r'){
						playerNeedsNewCard = 0;
					}
				}
			}
		}


		
}

	function hit(){
		$('#message').html("Hit Again?");
		var slot = " ";
		if (playerTotalCards == 2) {
			slot = "three";
		} else if(playerTotalCards == 3){
			slot = "four";
		} else if(playerTotalCards == 4){
			slot = "five";
		} else if(playerTotalCards == 5){
			slot = "six";
		}


		placeCard(theDeck[placeInDeck], 'player', slot);
		playerHand.push(theDeck[placeInDeck]);
		placeInDeck++;
		playerTotalCards++;
		calculateTotal(playerHand, 'player');
		$('#dealer-card-one').removeClass('empty');
		
		// placeCard();
		$('.dealer-total').show('total');
		calculateTotal(dealerHand, 'dealer');
		$('.dealer-total').html('0');
		

}

	function stand(){
		placeCard(dealerHand[1], 'dealer', 'two');
		$('#dealer-card-two').removeClass('empty');
		var dealerHas = calculateTotal(dealerHand, 'dealer');
		var dealerTotal = $('.dealer-total').html();
		while(dealerTotal < 17){
			if(dealerTotalCards == 2){
				slot = "three";
			} else if(dealerTotalCards == 3){
			slot = "four";
			} else if(dealerTotalCards == 4){
			slot = "five";
			} else if(dealerTotalCards == 5){
			slot = "six";
			}


			placeCard(theDeck[placeInDeck], 'dealer', slot);

			dealerHand.push(theDeck[placeInDeck]);
			dealerTotalCards++;
			placeInDeck++;
			calculateTotal(dealerHand, 'dealer');
			dealerTotal = $('.dealer-total').html();
		}
		checkWin();
		$('#dealer-card-one').removeClass('empty');
		$('#dealer-card-two').removeClass('empty');
		// placeCard();
		$('.dealer-total').show('total');
		$('#hit-button').prop('disabled', true);
		calculateTotal(dealerHand, 'dealer');

}

	function checkWin(){
		var playerHas = Number($('.player-total').html());
		var dealerHas = Number($('.dealer-total').html());
		// console.log(playerHas + '----------' + dealerHas);
		if(dealerHas > 21){
			bust('dealer');
		} else {
			if(playerHas > dealerHas){
				$('#message').html('You Win! Dealer loses!');
				$('#hit-button').prop('disabled',true);
				$('#stand-button').prop('disabled',true);
			} else if (dealerHas > playerHas) {
				$('#message').html('Sorry! Dealer Wins!');
				$('#hit-button').prop('disabled',true);
				$('#stand-button').prop('disabled',true);
			} else {
				$('#message').html('It\'s a push!!');
				$('#hit-button').prop('disabled',true);
				$('#stand-button').prop('disabled',true);
			}
		}
}


	function bust(who){
		if(who === 'player'){
			$('#message').html('You have busted!')
		} else {
			$('#message').html('The dealer has busted!')
		}
		$('#hit-button').prop('disabled',true);
		$('#stand-button').prop('disabled',true);

}

	function reset(){
		$('.card').addClass('empty');
		$('.card').html('');
		$('.player-total').html('0');
		$('.dealer-total').html('0');
		$('#message').html(' ');
		playerTotalCards = 2;
		dealerTotalCards = 2;
		$('#hit-button').prop('disabled', true);
		$('#stand-button').prop('disabled', true);
		$('#deal-button').prop('disabled',false);
		$('#message').html("Click Deal!");
}








