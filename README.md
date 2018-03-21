# Memory Game

My own javascript game with desktop and phone support. <br>
Should be easy to add your own content if wanted as long as you have some JS knowledge. <br>
Using some Jquery so you have that in mind. <br>
Row number in examples below can be wrong if you add your own code.

![Memory print image](images/gamePrint.png)

### Browser support:
- Chrome
- Firefox
- Microsoft Edge
- Opera
- (Safari? Im working on windows so cant test..)
- (Internet Explorer, not yet but working on it)

### Have 3 difficults (number of cards):
- Easy
- Normal
- Hard

### You can play with 4 different card decks:
- Frozen
- Disney
- Lego
- Pokemon

## How to add your own deck: 
You can replace one of the four the already exist or just add a new by following this guide.
**Note**, you need at least 8 cards/pictures to play hard difficult and the pictures have to be .png files.

1. Start by finding the pictures you want and put them in a new folder (with your decks name) in the "images" folder.

2. Rename the picture you want as main image for your deck (all cards one side) to "cardBg.png".

2. Then open the index.html file (row 34).. add an option to choose your new cards: <br>
```
<option value="yourDecksName">yourDecksName</option>
```

3. After that, open up "gameMode.js" and add your gameMode/deck: (this is not necessary for the game to work with your cards but it lets you customise the startmeny to your own and are recommended) <br>
```
else if (gameMode === "yourDecksName") {
	$(".playModul-h1").text("yourDecksName");
	$(".playModul-h1").css("font-family", "yourWantedFontStyle");
	$(".playModul-ImgTop").attr("src", "images/yourDecksName/yourPlaymenuImage.png");
}
```
> If you download your own font you can add it to "main.css" file, there you can see how I structured my fonts.

4. Time for the "memory.js" file (row 65+).. add your deck/cards. The card name should be the same as the picture name. <br>
```
const yourDecksName = [
	"pictureName1", "pictureName2", "pictureName3"
];
```
> Note: any order is ok but leave the .png out.

Then below that in same file (memory.js), you can add: 
```
else if (memoryStats.mode === "yourDecksName") {
	pickOutCards = yourDecksName;
}
```

And thats it! Enjoy your new cards.


## Short guide on changing difficult:
Open up "memory.js" file and go to line 95. <br>
All you need to do is change the number (3) to what number of pairs/picture you want the game to pick on each difficult. <br>
```
memoryStats.cards = 3;
```
> Note: 3 pairs/pictures gives 6 cards.. and so on.. 

## License: 
Free for private use. For other idées please contact me first and talk about it.
