// Deal needs to call shuffle and assign the deck
// Setup a players starting hand
// Place the card in the correct spot
var theDeck = [];
var placeInDeck = 0;
$(document).ready(function(){
	$('button').click(function(){
		var clickedButton = ($(this).attr('id'));
		if(clickedButton == 'deal-button'){
			deal();
		}else if(clickedButton == 'hit-button'){
			hit();
		}else if(clickedButton == 'stand-button'){
			stand();
		}
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

	function calculateTotal(hand, who){
		var total = 0;
		for(i = 0; i < hand.length; i++){
			// purposely not fixing, 11, 12, or 13, or 1 = 11
			var cardValue = hand[i].slice(0, -1);
			console.log(cardValue);
		}
	}

	function placeCard(card, who, slot){
		var currId = '#' + who + '-card-' + slot;
		$(currId).removeClass('empty');
		$(currId).html(card);

	}

	function shuffleDeck(){
		// fill the deck, in order, for now.
		// Deck is made up of ....
		// - 52 Cards + 5 random cards = 57 cards
		// - 4 Suits
		// --, h, s, d, c, r
		// r = random Cards
		// s1 = hearts, s2 = spades, s3 = diamonds, s4 = clubs
		for(var s = 1; s <= 4; s++){
			var suit = "";
			if(s === 1){
				suit = 'h';
			}else if(s === 2){
				suit = 's';
			}else if(s === 3){
				suit = 'd';
			}else if(s === 4){
				suit = 'c';
			// }else if (s === 5){
			// 	suit = 'r';
			}
			for (i = 1; i<=13; i++){
				theDeck.push(i+suit);
			}
		}
		// console.log(theDeck);
		// console.log(theDeck);
		// Now, let's shuffle the deck.
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





