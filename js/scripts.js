// What if the player gets BlackJack on the deal?
// How can a card be 11, 12, or 13?
// Can't a Ace = 1 or 11?
// The player can keep hitting and standing after the game is over
// There is no win counter
// There is no wagering system
// There is no "deck" to draw from
// There red cards aren't red
// There is no delay on the cards displaying (its instant)
// You can see both dealer cards on dealerHand





var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;

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

});

	function deal(){
		shuffleDeck();
		playerHand = [theDeck[0], theDeck[2] ];
		dealerHand = [theDeck[1], theDeck[3] ];
		placeInDeck = 4;
		placeCard(playerHand[0], 'player', 'one');
		placeCard(dealerHand[0], 'dealer', 'one');
		placeCard(playerHand[1], 'player', 'two');
		placeCard(dealerHand[1], 'dealer', 'two');
		calculateTotal(playerHand, 'player');
		calculateTotal(dealerHand, 'dealer');

	
}

	function calculateTotal(hand, whoTurn){
		var total = 0;
		for(i = 0; i < hand.length; i++){
			var cardValue = Number(hand[i].slice(0, -1));
			// console.log(cardValue);
			total += cardValue;
		}
		var idToGet = '.' + whoTurn + '-total'
		$(idToGet).html(total);
		if(total > 21){
			bust(whoTurn);
		}
		return total;

}

	
	function placeCard(card, who, slot){
		var currId = '#' + who + '-card-' + slot;
		if(card[card.length-1] == 'r'){
			//do something special
			$(currId).removeClass('empty');
			$(currId).html('<img src="img/' + card +'.png">');			
		}else{
			$(currId).removeClass('empty');
			$(currId).html('<img src="img/' + card +'.png">');
		}

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

}

	function hit(){
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

}

	function stand(){
		// What happens to player? Nothing.
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

}

	function checkWin(){
		var playerHas = Number($('.player-total').html());
		var dealerHas = Number($('.dealer-total').html());
		// console.log(playerHas + '----------' + dealerHas);
		if(dealerHas > 21){
			bust('dealer');
		} else {
			if(playerHas > dealerHas){
				$('#message').html('You have beaten the dealer!');
			} else if (dealerHas > playerHas) {
				$('#message').html('Sorry, the dealer has beaten you.');
			} else {
				$('#message').html('It\s a push!!');
			}
		}
}


	function bust(who){
		if(who === 'player'){
			$('#message').html('You have busted!')
		} else {
			$('#message').html('The dealer has busted!')
		}

}

	function reset(){
		$('.card').addClass('empty');
		$('.card').html('');
		$('.player-total').html('0');
		$('.dealer-total').html('0');
		$('#message').html(' ');
		playerTotalCards = 2;
		dealerTotalCards = 2;
}








