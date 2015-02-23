
var dateApp = {};


dateApp.yummlyAPIKey = 'd0f2ebdbeffb1b6cf99a25859c33a6d3';
dateApp.yummlyAPIId = '894345f0';
dateApp.MovieAPIKey = '8ab97f3526b8b1232e1b2aab2a349d31';



// ________________DEFINE DRINK FUNCTIONS_____________________
dateApp.getDrink = function(typeOfDrink) {
		console.log("Searching for " + typeOfDrink);
		$.ajax({
			url: 'https://lcboapi.com/products',
			type: 'GET',
			dataType: 'JSON',
			headers: {
		    "Authorization": "Token MDpjYmZhNjI2Mi1iN2IzLTExZTQtYmE4Ny1mYjgyYWVlZWM3YzA6NXpUUk5SUlJoUkVWZ3g5UEcydnhYUWJKSEVPeTF0UElybDdF"
		},
		  data: {
		  	per_page: 50,
		  	q : typeOfDrink
		  },
		  success: function(data) {

		  	var returnedDrinks = data.result;
		  	var img = 0;
			
			function filterByImg(returnedDrinks) {
			  if (returnedDrinks.image_thumb_url !== null) {
			 return true; } else {
			    img++;
			    return false;
			  }
			}
		  	var drinksByImg = returnedDrinks.filter(filterByImg);
		  	// console.log(drinksByImg);
		  	dateApp.displayDrink(drinksByImg,typeOfDrink);
		  }
		});
	}; 

	dateApp.displayDrink = function(drinks, typeOfDrink) {
		var rand = Math.floor(Math.random() * drinks.length);
		var drink = drinks[rand];
		console.log(drink);

		$('.drink p').text(drink.name).addClass('clicked');

		if(drink.image_thumb_url) {
			var src = drink.image_thumb_url;
		}
		else {
			var src = "http://www.lorempixel.com/food/200/300";
		}
		$('.drink img').attr('src', src).removeClass('icon').addClass('clicked');
	};


// ________________DEFINE MOVIE FUNCTIONS_____________________

  dateApp.getMovie = function(typeOfGenre) {
     var romance =  $.ajax({
        url: 'http://api.themoviedb.org/3/genre/'+dateApp.typeOfGenre+'/movies',
        type: 'GET',
        dataType: 'json',
        header : "Accept: application/json",
        data: {
        	format: 'json',
        	api_key : dateApp.MovieAPIKey,
        },
        success: function(data) {
        	  console.log(data);
        	  dateApp.displayMovie(data.results, typeOfGenre);
        }
      });
    };




  dateApp.displayMovie = function(movies, typeOfGenre) {
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
	
// ________________DEFINE FOOD FUNCTIONS_____________________





   dateApp.getFood = function(typeOfCuisine, typeOfCourse) {
      $.ajax({
        url: 'http://api.yummly.com/v1/api/recipes',
        type: 'GET',
        dataType: 'json',
        data: {
        	_app_id : dateApp.yummlyAPIId,
        	_app_key : dateApp.yummlyAPIKey,
        	format: 'jsonp',
        	maxResult : 50,
			allowedCuisine : "cuisine^cuisine-"+typeOfCuisine,
			allowedCourse : "course^course-"+typeOfCourse,
			q: ''
			},
        success: function(data) {
        	  console.log(data);
        	  dateApp.displayFood(data.matches, typeOfCuisine, typeOfCourse);
        }
      });
    };

   dateApp.displayFood = function(food, typeOfCuisine, typeOfCourse) {	

   	var rand = Math.floor(Math.random() * food.length);
	var dinner = food[rand];


	$('.food p').text(dinner.recipeName).addClass('clicked');
	if(dinner.smallImageUrls[0]) {
		var src = dinner.smallImageUrls[0];
	}
	else {
		var src = "http://www.lorempixel.com/food/200/300";
	}
	$('.food img').attr('src', src).removeClass('icon').addClass('clicked');
	};



	// dateApp.changeButton = $(function(){
	// 	$('.date').on('click', function(){
	// 	$('.date').removeClass('.buttonClick');
	// 	$(this).addClass('buttonClick');
	// });

// ________CALL PAGE FUNCTIONS HERE______


// $(function() {
// });

$('#date1').on('click', function(){
	dateApp.typeOfDrink = $(this).data('drink');
	dateApp.typeOfGenre = $(this).data('genre');  
	dateApp.typeOfCuisine = $(this).data('cuisine');
	dateApp.typeOfCourse = $(this).data('course'); 
	console.log(dateApp.typeOfCuisine, dateApp.typeOfCourse); 

	dateApp.getDrink(dateApp.typeOfDrink);
	dateApp.getMovie(dateApp.typeOfGenre);
	dateApp.getFood(dateApp.typeOfCuisine, dateApp.typeOfCourse);
});

$('#date2').on('click', function(){
	dateApp.typeOfDrink = $(this).data('drink');
	dateApp.typeOfGenre = $(this).data('genre');  
	dateApp.typeOfCuisine = $(this).data('cuisine');
	dateApp.typeOfCourse = $(this).data('course'); 
	console.log(dateApp.typeOfCuisine, dateApp.typeOfCourse); 

	dateApp.getDrink(dateApp.typeOfDrink);
	dateApp.getMovie(dateApp.typeOfGenre);
	dateApp.getFood(dateApp.typeOfCuisine, dateApp.typeOfCourse);
});

$('#date3').on('click', function(){
	dateApp.typeOfDrink = $(this).data('drink');
	dateApp.typeOfGenre = $(this).data('genre');  
	dateApp.typeOfCuisine = $(this).data('cuisine');
	dateApp.typeOfCourse = $(this).data('course'); 
	console.log(dateApp.typeOfCuisine, dateApp.typeOfCourse); 

	dateApp.getDrink(dateApp.typeOfDrink);
	dateApp.getMovie(dateApp.typeOfGenre);
	dateApp.getFood(dateApp.typeOfCuisine, dateApp.typeOfCourse);
});

