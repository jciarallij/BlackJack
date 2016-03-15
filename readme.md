#BlackJack game using jquery, HTML and CSS

A BlackJack Game.


###Setup the table using Bootstrap.

- Create a dealers hand and players hand to hold the totals
- Set each card to a custom width(adjust col-sm-2 to 11% to avoid having to write 3 extra divs)
- Add 3 buttons to the bottom of the table so the user can interact with the game.
- Bind each button to jQuery click function and call the correct function depending on the click.


###Write some JavaScript!
Bind each button to jQuery click function and call the correct function depending on the click.
- bind a function called deal to the deal button.

- When called, it will create a deck in a default order, then swap tow ards in the array 500 times.

- Once all the swaps are done, the deck will be shuffled. The number can be changed from 500 for varying 
degrees of "shuffleness."

- After the deck is shuffled, the playerHand and DealerHand arrays are created with the 0,2 and 1,3 cards in theDeck array (shuffled deck)

- The placeCard function is then called which takes 3 parameters: the playersHand array, who's turn it is, not the slot the card goes into.

- placeCard then removes the "empty" class to accomdate styling, and updates the HTML to use the card value.

- calculateTotal function is then called which is sent two parameters: the playerHand array and who's turn it is.
It slices each card in the array via a loop and removes the letter on the end. The result is turned into a Number to ensure we can run math functions on it and then the total is updated with the new number.