var apiKey = "exBBAicP44rjnvwmiMTacGHA5sff5dTU";
var query;
var memes = ["Spongebob", "Woman squinting", "Is this a piegon?", "I don't feel so good", "Change my mind", "Carpool karaoke", "One taught me love", "Surprised pikachu", "Baby Cardi B", "Evil Patrick", "Moth lamp", "Let's get this bread"]
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
    
function makeButtons(){
    for (i = 0; i< memes.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("btn");
        gifButton.addClass("btn-outline-secondary");
        gifButton.text(memes[i]);
        gifButton.appendTo("#buttonArea");
    }
}

$(document).ready(function() {

    makeButtons();

    $(".btn").on("click", function(){

        query = $(this).text();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response){

            var results = response.data;
            for (var j = 0; j< results.length; j++){
                // console.log(results);

                var card = $("<div>");
                card.addClass("card");
                card.attr("width", "18rem");
                card.prependTo("#gifArea");

                var link = $("<button>");
                link.appendTo(card);

                var animated = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
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
        
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response){


        })

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
