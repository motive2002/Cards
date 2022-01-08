# General notes

01/07/2022 - evaluateHand function in cardsFunc.js has had some refactoring and now
handles winning hands and potential hands.
Winning hands are automatically held on the first deal, such as 2 pair, three of a kind,
, jacks or better, straights, flushes and so on.

Winning hands are held automatically as well as suggested potential winners based
on certain criteria such as:

4/5 cards to a straight, if there's no pairs, and no potential flush.
Low pair over 4 cards to a straight, or just high cards.
4/5 cards to a flush over low pair, high pair or potential straight.

THese are some basic strategies involved in suggested holds, but nothing exhaustive.
For example, 4/5 open straight is better than 3 high cards when no pairs are present, 
but worse to hold over a low pair. 
4/5 to a flush is going to better to hold than a potential straight flush, low pair
or even a winning high pair. Only thing you'd want to hold over a 4/5 flush is 
4 cards to a royal.. even over a complete winning flush! but I haven't gone
that far with the hold suggestions.
Mostly holds that exclude other holds, like for example, you can't have a 4/5
potential flush and 3 of a kind on the board at the same time. Not possible. That's
why 4/5 flush > all when it occurs.

