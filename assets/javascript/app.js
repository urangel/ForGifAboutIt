var apiKey = "exBBAicP44rjnvwmiMTacGHA5sff5dTU";
var query;
var series = ["Spongebob", "Swat Kats", "Ninja Turtles", "Rick and Morty", "Space Dandy", "Samurai Champloo", "Dragon Ball", "Bleach", "Jackie Chan Adventures", "One Punch Man", "Adventure Time", "We Bare Bears", "Pokemon"]
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
    
function makeButtons(){
    $("#buttonArea").empty();
    for (i = 0; i< series.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("btn");
        gifButton.addClass("btn-outline-light");
        gifButton.text(series[i]);
        gifButton.appendTo("#buttonArea");
    }
}

$(document).ready(function() {

    makeButtons();

    $(document).on("click", ".btn", function(){

        query = $(this).text();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response){

            var results = response.data;
            for (var j = 0; j< results.length; j++){
                console.log(results);

                var card = $("<div>");
                card.addClass("card");
                card.attr("width", "18rem");
                card.prependTo("#gifArea");

                var link = $("<button>");
                link.appendTo(card);

                var animated = results[j].images.fixed_height_small.url;
                var still = results[j].images.fixed_height_small_still.url;
                var img = $("<img>");
                img.addClass("animate");
                img.attr("src", still);
                img.attr("animated", animated);
                img.attr("still", still);
                img.appendTo(link);

                var cardBody = $("<div>");
                cardBody.addClass("card-body");
                cardBody.appendTo(card);

                var rating = results[j].rating;
                var p = $("<p>");
                p.text("Rated: " + rating);
                p.addClass("card-text");
                p.appendTo(cardBody);

            }

        })

    });

    $("#searchButton").on("click", function(event){
        event.preventDefault();

        query = $("#searchText").val();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
        
        series.push(query);
        $("input[type=text]").val("");
        makeButtons();

    });

    $(document).on("click", ".animate", function(){

        var still = $(this)[0].attributes[3].nodeValue;
        var animated = $(this)[0].attributes[2].nodeValue;


        if ( $(this)[0].src === animated){
            $(this)[0].src = still;
        }
        else if ($(this)[0].src === still){
            $(this)[0].src = animated;
        }


    });


});
