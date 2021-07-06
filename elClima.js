var button = document.querySelector('.button')
var ingresaCiudad = document.querySelector('.ingresaCiudad')
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var icon = document.querySelector('.icon');
var NomCiudad = document.querySelector('.NomCiudad')
/*api de geolocalización https://www.w3schools.com/html/html5_geolocation.asp*/
var x = document.getElementById("coords");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
/**boton de calcular coordenadas */
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude;
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=5469f226b02c16d4bd71785be34d42c8&units=metric&lang=es')
    .then(Response => Response.json())
    .then(data => {
        var ingresaCiudadvalue = data['name'];
        var tempvalue = data['main']['temp'];
        var descvalue = data['weather'][0]['description'];
        var iconvalue = data['weather'][0]['icon'];

        NomCiudad.innerHTML = ingresaCiudadvalue;
        temp.innerHTML = tempvalue;
        desc.innerHTML = descvalue;
        icon.src = "https://openweathermap.org/img/wn/"+iconvalue+".png";
    })

.catch(err => alert("Nombre de ciudad equivocado!"))
}


/*evento de presionar una tecla https://stackoverflow.com/questions/302122/jquery-event-keypress-which-key-was-pressed*/
ingresaCiudad.addEventListener('keyup',function(e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
      /*alert("Enter!"); lo usé para saber si entraba antes de llamar a la api*/
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+ingresaCiudad.value+'&appid=5469f226b02c16d4bd71785be34d42c8&units=metric&lang=es')
    .then(Response => Response.json())
    .then(data => {
        var ingresaCiudadvalue = data['name'];
        var tempvalue = data['main']['temp'];
        var descvalue = data['weather'][0]['description'];
        var iconvalue = data['weather'][0]['icon'];

        NomCiudad.innerHTML = ingresaCiudadvalue;
        temp.innerHTML = tempvalue;
        desc.innerHTML = descvalue;
        icon.src = "https://openweathermap.org/img/wn/"+iconvalue+".png";
    })

.catch(err => alert("Nombre Inválido"))
    };
});

/**evento click en el botón */
button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ingresaCiudad.value+'&appid=5469f226b02c16d4bd71785be34d42c8&units=metric&lang=es')
    .then(Response => Response.json())
    .then(data => {
        var ingresaCiudadvalue = data['name'];
        var tempvalue = data['main']['temp'];
        var descvalue = data['weather'][0]['description'];
        var iconvalue = data['weather'][0]['icon'];

        NomCiudad.innerHTML = ingresaCiudadvalue;
        temp.innerHTML = tempvalue;
        desc.innerHTML = descvalue;
        icon.src = "https://openweathermap.org/img/wn/"+iconvalue+".png";
    })

.catch(err => alert("Nombre Inválido o no ingresó el nombre"))
})
