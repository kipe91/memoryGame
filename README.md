# Memory Game

My own javascript game with desktop and phone support. <br>
Should be easy to add your own content if wanted as long as you have some JS knowledge. 

### Browser support (latest version):
- Chrome
- Firefox
- Mocrosoft Edge
- Internet Explorer

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
**Note!**, you need at least 8 cards/pictures to play hard difficult and the pictures have to be .png files.

1. Start by finding the pictures you want and put them in a new folder (with your decks name) in the "images" folder.

2. Then open the index.html file (row 30).. add an option to choose your new cards: <br>
```
<option value="yourDecksName">yourDecksName</option>
```

3. After that, open up "gameMode.js" and add your gameMode/deck: (this is not necessary for the game to work with your cards but it lets you customise the startmeny to your own and are recommended) <br>
```
else if (gameMode === "yourDecksName") {
	$(".playModul-h1").text("yourDecksName");
	$(".playModul-h1").css("font-family", "yourWantedFontStyle");
	$(".playModul-ImgTop").attr("src", "images/yourDecksName/modulTop.png");
}
```
> //If you download your own font, add it to "main.css" file there you can see how I structured mine.

4. Time for the "memory.js" file (row 60+).. add your deck/cards. The card name should be the same as the picture name. <br>
```
const yourDecksName = [
	"pictureName1", "pictureName2", "pictureName3"
];
```
> Note: any order is ok and leave the .png out.

And thats it! Enjoy your new cards.


