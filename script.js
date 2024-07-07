const weatherApiKey = process.env.WEATHER_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;

// Functie om de huidige datum te laden en weer te geven
function loadDate() {
  var currentDate = new Date();
  var dateString = currentDate
    .toString()
    .split(' ')
    .splice(0, 4) // Beperk de string tot de eerste vier woorden
    .join(' ');

  $('#date').text(dateString);
}

// Functie om het weer te laden en weer te geven
function loadWeather() {
  var weather = $('#weather');
  var url = 'https://api.weatherapi.com/v1/current.json'; // WeatherAPI URL
  var apiKey = weatherApiKey; // Vervang door je eigen WeatherAPI sleutel

  // Functie die wordt aangeroepen bij succesvolle geolocatie
  function success(position) {
    var latitude = position.coords.latitude; // Breedtegraad via geolocatie
    var longitude = position.coords.longitude; // Lengtegraad via geolocatie

    // API-aanroep:
    $.getJSON(
      url + '?key=' + apiKey + '&q=' + latitude + ',' + longitude,
      function (data) {
        weather.text(
          'Gebaseerd op je huidige locatie is het nu ' + data.current.temp_f + '°F'
        );
      }
    );
  }

  // Bericht dat wordt weergegeven bij een geolocatiefout
  function error() {
    alert('Kan je locatie niet ophalen voor weerinformatie');
  }

  // Aanroepen van de geolocatie API
  navigator.geolocation.getCurrentPosition(success, error);

  // De tekst die wordt weergegeven terwijl de functie de aanvraag doet
  weather.text('Weer ophalen…');
}

// Functie om het nieuws te laden en weer te geven
function loadNews() {
  var news = $('#news');
  var url = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey='; // News API URL
  var apiKey = newsApiKey; // Vervang door je eigen News API sleutel

  $.getJSON(url + apiKey, function (data) {
    // map() methode om artikel URLs en titels op te halen
    var titles = data.articles.map(function (article) {
      return "<a href='" + article.url + "'>" + article.title + '</a>';
    });

    // Titels samenvoegen met twee regeleindes
    news.html(titles.join('<br><br>'));
  });

  // De tekst die wordt weergegeven terwijl de functie de aanvraag doet
  news.text('Nieuws ophalen…');
}

// Functies aanroepen
loadDate();
loadWeather();
loadNews();
