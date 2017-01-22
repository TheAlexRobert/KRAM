var queue = [];
var libs = ["Enter a Color", "Enter a Superlative", "Enter an Adjective", "Enter a Body Part (plural)", "Enter a Body Part", "Enter a Noun", "Enter an Animal (Plural)", "Enter an Adjective", "Enter an Adjective", "Enter an Adjective"];
$(document).ready(function(){
	$("#grammar").text(libs.shift());
	
	$("#input").keypress(function(event) {
		if (event.which == 13) {
			$("#enter").click();
		}
	});
	
});


function enterButton() {

    if (queue.length < 9){
		var input = $("#input").val();
        queue.push(input);
		$("#grammar").text(libs.shift());
		$("#input").val("");
    }
    else {
		var story = "The " + queue.shift() + " Dragon is the " + queue.shift() + " Dragon of all. It has " + queue.shift() + queue.shift() +", and a " + queue.shift() + " shaped like a " + queue.shift() + ". It loves to eat " + queue.shift() + ", although it will feast on nearly anything. It is " + queue.shift() + " and " + queue.shift() + ". You must be " + queue.shift() + " around it, or you may end up as it's meal!";
        $("#text").text(story);
		playAudio();
	}
};



    

