const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTRanscurridoEnSegundos = 5;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
      musica.play();
    }else {
        musica.pause();
    };
});

botonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {

    botones.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);   

    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Qué tal tomar un respiro? 
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie 
            <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            break;
    
        default:
            break;
    };
};

const cuentaRegresiva = () => {
    //iniciarPausar();
    if (tiempoTRanscurridoEnSegundos <= 0) {
        audioTiempoFinalizado .play()
        //alert('Tiempo final');
        console.log('Tiempo final');
        reiniciar();
        return // retorno anticipado -- circuit breaker
    };

    tiempoTRanscurridoEnSegundos -= 1;
    console.log("Temporizador: " + tiempoTRanscurridoEnSegundos); // Muestra el tiempo actual
    console.log('Id: ' + idIntervalo) // Muestra el ID actual
};

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) {
        audioPausa.play();
        reiniciar();
        return // retorno anticipado -- circuit breaker
    };

    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
};

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
};
