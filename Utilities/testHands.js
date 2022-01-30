//PREMADE HANDS FOR TESTING PURPOSES

const cardW = 80  //width of card in pixels
const cardH = 120 //height of card in pixels


export const LOW_PAIR = [

    {
        val: 9, //JACK
        suit: 2, //HEARTS
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 3,
        position: [2 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const J_OR_BETTER = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 6,
        suit: 3,
        position: [5 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const PAIR_TWO = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 6,
        suit: 3,
        position: [5 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 6,
        suit: 2,
        position: [5 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },

]

export const THREE_KIND = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 3,
        position: [10 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const FOUR_KIND = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 3,
        position: [10 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 4,
        position: [10 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const HOUSE_FULL = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 3,
        position: [10 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 2,
        position: [2 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 1,
        position: [9 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 3,
        position: [8 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 2,
        position: [7 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_WITH_LOW_PAIR = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 1,
        position: [9 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 3,
        position: [8 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 2,
        position: [7 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 4,
        position: [7 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_SRAIGHT_HIGH_PAIR = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 1,
        position: [9 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 3,
        position: [8 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 2,
        position: [7 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 4,
        position: [10 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_FLUSH = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 2,
        position: [9 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 2,
        position: [7 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 4,
        position: [2 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_AND_POT_FLUSH = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 2,
        position: [9 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 1,
        position: [7 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 2,
        position: [2 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_FLUSH_AND_HIGH_PAIR = [

    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 11,
        suit: 1,
        position: [10 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 2,
        position: [7 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 2,
        position: [2 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_NO_PAIR = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 1,
        position: [9 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 8,
        suit: 4,
        position: [7 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 2,
        position: [2 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const FLUSH_ROYAL = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 12,
        suit: 2,
        position: [11 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 1,
        suit: 2,
        position: [0 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 2,
        position: [9 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const FLUSH_STRAIGHT = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 12,
        suit: 2,
        position: [11 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 2,
        position: [9 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const STRAIGHT_NO_FLUSH = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 12,
        suit: 1,
        position: [11 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 3,
        position: [8 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 10,
        suit: 2,
        position: [9 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_LOW_ACE = [
    {
        val: 1, //JACK
        suit: 2, //HEARTS
        position: [0 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 2,
        suit: 1,
        position: [1 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 3,
        suit: 3,
        position: [2 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 4,
        suit: 2,
        position: [3 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 7,
        suit: 4,
        position: [6 * cardW, 3 * cardH],
        clicked: false,
        winningCard: false
    },
]

export const POT_STRAIGHT_HIGH_ACE = [
    {
        val: 11, //JACK
        suit: 2, //HEARTS
        position: [10 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 12,
        suit: 1,
        position: [11 * cardW, 0 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 13,
        suit: 2,
        position: [12 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 1,
        suit: 3,
        position: [0 * cardW, 2 * cardH],
        clicked: false,
        winningCard: false
    },
    {
        val: 9,
        suit: 2,
        position: [8 * cardW, 1 * cardH],
        clicked: false,
        winningCard: false
    },
]