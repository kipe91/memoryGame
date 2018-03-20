//Difficult selecter
$(function(){

const goDown = $("#goDown");
const goUp = $("#goUp");
const target = $("#difficult");

let selected = "normal";

	goDown.click(function moveDown() {
		if (selected === "hard") {
			target.text("Normal");
			selected = "normal";
		}
		else if (selected === "normal") {
			target.text("Easy");
			selected = "easy";
		}
		else {
			//do nothing (prevent user from keep clicking)
		}
	});

	goUp.click(function moveUp() {
		if (selected === "easy") {
			target.text("Normal");
			selected = "normal";
		}
		else if (selected === "normal") {
			target.text("Hard");
			selected = "hard";
		}
		else {
			//do nothing
		}
	});

});