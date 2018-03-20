$(function(){
const play = $("#playBtn");
const playModul = $(".playModul");
const gameModul = $(".gameModul");

	play.click(function startMemory() {
		event.preventDefault();
		const mode = $("#gameMode").val();
		const difficult = $("#difficult").text();

		playModul.fadeOut();
		gameLayout(mode, difficult);
		gameModul.fadeIn();
	});
});

const memoryStats = {
	clicks: 0,
	time: "",
	clock: setInterval(gameTime, 100),
	mode: "",
	difficult: "",
	stars: 3,
	cards: 0
};

const timeWatch = {
	minHigh: 0,
	minLow: 0,
	secHigh: 0,
	secLow: 0,
	msec: 0
};

// Clear everything for new game
function cleanLayout() {
	$(".gameModul-Main").children().remove();
	$("#nrClicks").text("0");
	memoryStats.clicks = 0;
	
	memoryStats.time = "";
	timeWatch.minHigh = 0;
	timeWatch.minLow = 0;
	timeWatch.secHigh = 0;
	timeWatch.secLow = 0;
	timeWatch.msec = 0;

	$("#star1").addClass("checked");
	$("#star2").addClass("checked");
	$("#star3").addClass("checked");
	memoryStats.stars = 3;
}

// Create game layout
function gameLayout(mode, difficult) {
	memoryStats.mode = mode;
	memoryStats.difficult = difficult;

	cleanLayout();

	const frozenCards = [
	"card_1", "card_2", "card_3", "card_4", "card_5", "card_6", "card_7", "card_8"
	];
	const disneyCards = [
	"card_1", "card_2", "card_3", "card_4", "card_5", "card_6", "card_7", "card_8",
	"card_9", "card_10", "card_11"
	];
	const legoCards = [
	"card_1", "card_2", "card_3", "card_4", "card_5", "card_6", "card_7", "card_8"
	];
	const pokemonCards = [
	"charizard", "charmeleon", "eevee", "Gengar", "Golbat", "jigglypuff", "mew",
	"pidgey", "pikachu", "rattata", "squirtle", "togepi"
	];

	if (memoryStats.mode === "frozen") {
		pickOutCards = frozenCards;
	}
	else if (memoryStats.mode === "disney") {
		pickOutCards = disneyCards;
	}
	else if (memoryStats.mode === "lego") {
		pickOutCards = legoCards;
	}
	else if (memoryStats.mode === "pokemon") {
		pickOutCards = pokemonCards;
	}

	if (memoryStats.difficult === "Easy") {
		memoryStats.cards = 3;
	}
	else if (memoryStats.difficult === "Normal") {
		memoryStats.cards = 6;
	}
	else if (memoryStats.difficult === "Hard") {
		memoryStats.cards = 8;
		// TODO: make time go down.
	}

	//Take out right number off cards into new deck/array.
	let gameCards = [];

	for (let i = 0; i < memoryStats.cards; i++) {
		let randId = pickOutCards[Math.floor(Math.random() * pickOutCards.length)];
		gameCards.push(randId);
		let checkIndex = pickOutCards.indexOf(randId);
		pickOutCards.splice(checkIndex, 1);
	}
	// Copy cards to make pairs.
	gameCards = gameCards.concat(gameCards);
	console.log(gameCards);

	const cardHolder = $(document.createDocumentFragment());
	// Create grid using for loop.
		for (let k = 1; k <= (memoryStats.cards * 2); k++) {
			// Pick random card.
			let rand = gameCards[Math.floor(Math.random() * gameCards.length)];
			// Create that card.
			let cardImg = "<img src=\"images/" + memoryStats.mode + "/" + rand + ".png\" alt=\"" + rand + "\">";
			let frontImg = "<img src=\"images/" + memoryStats.mode + "/cardBg.png\" alt=\"Card BG picture\">";
			let card = "<div class=\"card\"><figure class=\"front\">" + frontImg + "</figure><figure class=\"back\">" + cardImg + "</figure></div>";
			cardHolder.append(card);
			// Remove card from deck.
			let index = gameCards.indexOf(rand);
			gameCards.splice(index, 1);
		}
	$(".gameModul-Main").append(cardHolder);

	// Card flipper listner
	$(".card").click(function() {
		let event = $(this);
		cardController(event);
	});

	$("#rePlayBtn").click(function(){
		event.preventDefault();
		gameLayout(memoryStats.mode, memoryStats.difficult);
	});

	$("#goBackBtn").click(function(){
		event.preventDefault();
		$(".gameModul").fadeOut();
		$(".playModul").fadeIn();
	});
};

// function CardFlip
function cardController(clickedCard) {
	if (clickedCard.hasClass("flipped")) {
		//do nothing...
		console.log("Card already finnished or clicked");
	}
	else {
		let cardsToCheck = $(".marked");
		//check and update clicks
		starsAndClick();

		if (cardsToCheck.length >= 2) {
			//do nothing (prevent turning all cards)
			console.log("Already 2 cards to check");
		}
		else if (cardsToCheck.length === 1) {
			console.log("2 cards ready");
			clickedCard.addClass("flipped");
			clickedCard.addClass("marked");

			setTimeout(function(){
				cardsToCheck = $(".marked"); //update it.
				const card1 = cardsToCheck.slice(0, 1);
				const card2 = cardsToCheck.slice(1, 2);
				if (card1.find(".back").find("img").attr("alt") === card2.find(".back").find("img").attr("alt")) {
					cardsToCheck.addClass("cardCorrect");
					cardsToCheck.removeClass("marked");
					console.log("Card match");
				}
				else {
					cardsToCheck.addClass("cardWrong");
					setTimeout(function(){
						cardsToCheck.removeClass("cardWrong");
						cardsToCheck.removeClass("flipped");
						cardsToCheck.removeClass("marked");
						console.log("Card wrong");
					}, 1500);
				}
				// start function to se if all cards are done.
				isAllDone();
			}, 2000);
		}
		else {
			console.log("1 card ready");
			clickedCard.addClass("flipped");
			clickedCard.addClass("marked");
		}
	}
};

// Check if game is done
function isAllDone() {
	const correctCards = $(".cardCorrect");
	if (correctCards.length === (memoryStats.cards * 2)) {
		console.log("Game finnished");
		showScore();
	}
}

// Update click and stars
function starsAndClick() {
	memoryStats.clicks++;
	$("#nrClicks").text(memoryStats.clicks);
	if (memoryStats.difficult === "Easy") {
		if (memoryStats.clicks === 7) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 11) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
		else if (memoryStats.clicks === 15) {
			memoryStats.stars--;
			$("#star1").removeClass("checked");
		}
	}
	else if (memoryStats.difficult === "Normal") {
		if (memoryStats.clicks === 13) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 17) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
		else if (memoryStats.clicks === 21) {
			memoryStats.stars--;
			$("#star1").removeClass("checked");
		}
	}
	else if (memoryStats.difficult === "Hard") {
		if (memoryStats.clicks === 17) {
			memoryStats.stars--;
			$("#star3").removeClass("checked");
		}
		else if (memoryStats.clicks === 23) {
			memoryStats.stars--;
			$("#star2").removeClass("checked");
		}
		else if (memoryStats.clicks === 31) {
			memoryStats.stars--;
			$("#star1").removeClass("checked");
		}
	}
}

// Start Time "00:00:0"
	function gameTime() {
		timeWatch.msec++;

		if (timeWatch.msec === 10) {
			timeWatch.secLow++;
			timeWatch.msec = 0;
			};
		if (timeWatch.secLow === 10) {
			timeWatch.secHigh++;
			timeWatch.secLow = 0;
		};
		if (timeWatch.secHigh === 6) {
			timeWatch.minLow++;
			timeWatch.secHigh = 0;
			timeWatch.secLow = 0;
		};
		if (timeWatch.minLow === 10) {
			timeWatch.minHigh++;
			timeWatch.minLow = 0;
		};

		memoryStats.time = "" + timeWatch.minHigh + timeWatch.minLow + ":" + timeWatch.secHigh + timeWatch.secLow + ":" + timeWatch.msec;
		$("#countTime").text(memoryStats.time);
	}

// Show finnish modul and score
function showScore() {
	$(".gameModul").fadeOut("slow");
	$(".finnishModul").fadeIn();

	$("#finnishStars").children().remove();
	const stars = $(document.createDocumentFragment());
	for (let i = 1; i <= 3; i++) {
		if (i <= memoryStats.stars) {
			star = "<span class=\"fa fa-star checked\"></span>";
			stars.append(star);
		}
		else {
			star = "<span class=\"fa fa-star\"></span>";
			stars.append(star);
		}
	}
	$("#finnishStars").append(stars);
	$("#finnishTime").text(memoryStats.time);
	$("#finnishClicks").text(memoryStats.clicks);

	$("#playAgain").click(function(){
		event.preventDefault();
		$(".finnishModul").fadeOut();
		gameLayout(memoryStats.mode, memoryStats.difficult);
		$(".gameModul").fadeIn();
	});

	$("#closeGame").click(function(){
		event.preventDefault();
		$(".finnishModul").fadeOut();
		$(".playModul").fadeIn();
	});
};