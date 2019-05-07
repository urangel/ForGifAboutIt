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
    //When the page loads the makeButtons function renders buttons associated with the series array onto the header
    makeButtons();

    //Any button with the class .btn will have this event handler associated with it, even if it is not initially rendered on the page
    $(document).on("click", ".btn", function(){

        query = $(this).text();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
        //Asynchronous HTTP GET request through jQuery's AJAX function to the gify API. 
        //This will grab 10 gifs based on the query, whether that be through the push of a button or through a search
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response){
            //The response data is used here to create cards from all of the gifs received.
            var results = response.data;
            for (var j = 0; j< results.length; j++){
                console.log(results);
                //A card div is created and added to the gifArea div that is already on the page
                var card = $("<div>");
                card.addClass("card");
                card.attr("width", "18rem");
                card.prependTo("#gifArea");
                //This button allows for the image to be clickable to switch between animated and still states
                var link = $("<button>");
                link.appendTo(card);
                //Attributes are added to the card that point to different URL's that are both obtained from the giphy API request. 
                //A still image url is added to the still attribute, likewise for animated.
                var animated = results[j].images.fixed_height_small.url;
                var still = results[j].images.fixed_height_small_still.url;
                var img = $("<img>");
                img.addClass("animate");
                img.attr("src", still);
                img.attr("animated", animated);
                img.attr("still", still);
                img.appendTo(link);
                //The body holds the rating text.
                var cardBody = $("<div>");
                cardBody.addClass("card-body");
                cardBody.appendTo(card);
                //The rating, also from the giphy req/res is added to the card body.
                var rating = results[j].rating;
                var p = $("<p>");
                p.text("Rated: " + rating);
                p.addClass("card-text");
                p.appendTo(cardBody);

            }

        })

    });
    //This search feature both adds your recent search to the original list of series while also making its own request to giphy to load
    //10 gifs related to the search. The makebuttons function updates the list of series and also the list displayed on the page.
    $("#searchButton").on("click", function(event){
        event.preventDefault();

        query = $("#searchText").val();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=10"; 
        
        series.push(query);
        $("input[type=text]").val("");
        makeButtons();

    });

    //The logic for making the gifs move on click. The url is changed using the url's that are part of the gif's attributes.
    //The if else statement allows for both pausing and animating. 
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
