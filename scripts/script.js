
var dateApp = {};

dateApp.yummlyAPIKey = 'd0f2ebdbeffb1b6cf99a25859c33a6d3';
dateApp.yummlyAPIId = '894345f0';
dateApp.MovieAPIKey = '8ab97f3526b8b1232e1b2aab2a349d31';


// Event Handler Function	
var handleClickEvent = function ( e ) {
  
  // Setup options for AJAX requests
  var drinkOptions = {
    url: 'https://lcboapi.com/products',
    type: 'GET',
    dataType: 'JSON',
    headers: {
      "Authorization": "Token MDpjYmZhNjI2Mi1iN2IzLTExZTQtYmE4Ny1mYjgyYWVlZWM3YzA6NXpUUk5SUlJoUkVWZ3g5UEcydnhYUWJKSEVPeTF0UElybDdF"
		},
    data: {
      per_page: 50,
      q : $(this).data('drink')
    }
  };
  
  var movieOptions = {
    url: 'http://api.themoviedb.org/3/genre/' +  $(this).data('genre') + '/movies',
    type: 'GET',
    dataType: 'json',
    header : "Accept: application/json",
    data: {
      format: 'json',
      api_key : dateApp.MovieAPIKey,
    }
  };

  var foodOptions = {
  	url: 'http://api.yummly.com/v1/api/recipes',
    type: 'GET',
    dataType: 'json',
    data: {
      _app_id : dateApp.yummlyAPIId,
      _app_key : dateApp.yummlyAPIKey,
      format: 'jsonp',
      maxResult : 50,
      allowedCuisine : "cuisine^cuisine-" + $(this).data('cuisine'),
      allowedCourse : "course^course-" + $(this).data('course'),
      q: ''
    }
  };

  // Define DISPLAY functions 

  dateApp.displayMovie = function(movieData) {
    console.log("Movie data:", movieData);

    var movies = movieData.results;
    var rand = Math.floor(Math.random() * movies.length);
    var movie = movies[rand];

    $('.movie p').text(movie.original_title).addClass('clicked');

    if('http://image.tmdb.org/t/p/w500/'+movie.poster_path) {
      var src = 'http://image.tmdb.org/t/p/w500'+movie.poster_path;
    }
    else {
      var src = "http://www.lorempixel.com/food/200/300";
    }
    $('.movie img').attr('src', src).removeClass('icon').addClass('clicked');
  }

  dateApp.displayFood = function(foodData) { 
    console.log(foodData);
    var foods = foodData.matches;
    var rand = Math.floor(Math.random() * foods.length);
    var dinner = foods[rand];


    $('.food p').text(dinner.recipeName).addClass('clicked');
    if(dinner.smallImageUrls[0]) {
      var src = dinner.smallImageUrls[0];
    }
    else {
      var src = "http://www.lorempixel.com/food/200/300";
    }
    $('.food img').attr('src', src).removeClass('icon').addClass('clicked');
  };

  dateApp.displayDrink = function(drinkData) {
    console.log(drinkData);
    var drinks = drinkData.result;
    var rand = Math.floor(Math.random() * drinks.length);
    var drink = drinks[rand];

    $('.drink p').text(drink.name).addClass('clicked');

    if(drink.image_thumb_url) {
      var src = drink.image_thumb_url;
    }
    else {
      var src = "http://www.lorempixel.com/food/200/300";
    }
    $('.drink img').attr('src', src).removeClass('icon').addClass('clicked');
  };

  // Call AJAX wrapper function and get a promise back for each call

  var drinkPromise = $.ajax( drinkOptions );
  var foodPromise = $.ajax( foodOptions );
	var moviePromise = $.ajax( movieOptions );

  // Wait for multiple promises to finish, then run functions
  $.when( drinkPromise, foodPromise, moviePromise ).done( function ( drinkData, foodData, movieData ) {
    console.log('promises are done');
    dateApp.displayDrink( drinkData[0] );
    dateApp.displayMovie( movieData[0] );
    dateApp.displayFood( foodData[0] );
  });
};

// Add Event Listener
$( '#date1' ).on( 'click', handleClickEvent );
$( '#date2' ).on( 'click', handleClickEvent );
$( '#date3' ).on( 'click', handleClickEvent );
    
