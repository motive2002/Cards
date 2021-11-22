export const defineDeck = () => {

    //Set up an array of card objects, with values for card value, suit and
    //x/y position on the graphic. (ace of spades is 0, 0, [0,0])

    const cardW = 80  //width of card in pixels
    const cardH = 120 //height of card in pixels
    const row = 13    //number of cards in a row
    const col = 4     //bumber of columns (suits)

    const deck = []

    for(let i = 0; i < col; i++) {
        for(let j = 0; j < row; j++) {

            const card = {
                val: j, 
                suit: i,
                position: [j * cardW, i * cardH], 
            }

            deck.push(card)
        }
    }

    return deck

}

export const shuffle = (array) => {
    
    let currentIndex = array.length
    let randomIndex = 0

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}