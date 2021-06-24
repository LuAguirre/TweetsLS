
const listaTweets = document.getElementById('lista-tweets');
const formulario = document.getElementById('formulario');
let tweets = [];


eventListeners();

function eventListeners() {

     formulario.addEventListener('submit', agregarTweet);


     listaTweets.addEventListener('click', borrarTweet);


     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
          console.log(tweets);
          crearHTML();
     });
}


function agregarTweet(e) {
     e.preventDefault();

     const tweet = document.getElementById('tweet').value;
     //
     if(tweet !== ''){
          alert("Un nuevo tweet ha sido agregado")
     } 
     else if(tweet === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
     }


     const tweetObj = {
          id: Date.now(),
          texto: tweet
     }


     tweets = [...tweets, tweetObj];
     

     crearHTML();


     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.getElementById('contenido');
     contenido.appendChild(mensajeEerror);

     //
     setTimeout(function() {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML();
     
     if(tweets.length > 0 ) {
          tweets.forEach( tweet =>  {
             
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';
               botonBorrar.innerText = 'Eliminar';
     
              
               const li = document.createElement('li');


               li.innerText = tweet.texto;


               li.appendChild(botonBorrar);

  
               li.dataset.tweetId = tweet.id;


               listaTweets.appendChild(li);
          });
     }

     sincronizarStorage();
}


function borrarTweet(e) {
     e.preventDefault();

     
     const id = e.target.parentElement.dataset.tweetId;
     tweets = tweets.filter( tweet => tweet.id != id  );
     crearHTML();
}
//
const sincronizarStorage = function() {
     localStorage.setItem('tweets', JSON.stringify(tweets));
}


function limpiarHTML() {
     while(listaTweets.firstChild) {
          listaTweets.removeChild(listaTweets.firstChild);
     }
}