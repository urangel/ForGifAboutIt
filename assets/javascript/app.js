var apiKey = "exBBAicP44rjnvwmiMTacGHA5sff5dTU";
var query;
var memes = ["Spongebob", "Woman squinting", "Is this a piegon?", "I don't feel so good", "Change my mind", "Carpool karaoke", "One taught me love", "Surprised pikachu", "Baby Cardi B", "Evil Patrick", "Moth lamp", "Let's get this bread"]

$( document ).ready(function() {

    for (i = 0; i< memes.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("btn");
        gifButton.addClass("btn-outline-secondary");
        gifButton.text(memes[i]);
        gifButton.appendTo("#buttonArea");

    }



    $("#searchButton").on("click", function(event){
        event.preventDefault();

        query = $("#searchText").val();
        console.log(query);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
        console.log(queryURL);
        
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response){

            console.log(response);

        })

    });

});
