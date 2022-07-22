/////////// VARIABLES ///////////////
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


/////////// Event Listeners ///////////////
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        
        crearHTML();
    })
}


/////////// FUNCIONES ///////////////
function agregarTweet(e) {
    e.preventDefault();

    // Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if (tweet === '') {
        mostrarError('El mensaje no puede ir vacío.');

        return; // Evita que se ejecuten más lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    crearHTML();

    // Reiniciar el formulario

    formulario.reset();
}

// Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de x segundos.
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);


}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            // Añadir funcion eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }



            // crear el html
            const li = document.createElement('li');

            // Añadir el texto
            li.textContent = tweet.tweet;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // Insertar en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage()
}


// Agrega los tweets al local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}


// Limpiar html

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}