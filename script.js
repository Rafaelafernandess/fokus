const html = document.querySelector('html'); //pegando cada id/class do documento html e colocando em uma variavel
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const PausaBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaPausa = new Audio('/sons/pause.mp3');
const musicaIniciar = new Audio('/sons/play.wav');
const musicaZero = new Audio('/sons/beep.mp3');
musica.loop = true; //musica vai tocar o tempo todo quando ativado

let temDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => { //usa cgange para quando tem checkbox
    if (musica.paused) { //se o botao tiver ativado
        musica.play();
    }
    else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {  //adiciona o evento click, cria uma função
    //html.setAttribute('data-contexto', 'foco'); /* atribui ao id do html o que ele quer mudar quando clicar no botão  */                                                    
    //banner.setAttribute('src', '/imagens/foco.png'); exemplo de código

    temDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');  //classList serve para manipular classes no css e adicionar alguma funcionalidade
})

curtoBt.addEventListener('click', () => {
    temDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    temDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) { //para cada botao vou remover o active
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML =  //metodo innerHTML : inserir textos no formato completo do HTML. é muito bom para fazer listas.
                `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML =
                `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML =
                `
            Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (temDecorridoEmSegundos <= 0) {
        musicaZero.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    temDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function iniciarOuPausar() { //inicia ou pausa o temporizador
    if (intervaloId) {
        musicaPausa.play();
        zerar();
        return;
    }
    musicaIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000); // esse metodo decrementa dinamicamente, o param são o q vc quer decrementar e o intervalo sempre em milissegundos
    iniciarOuPausarBt.textContent = "Pausar";
    PausaBt.setAttribute('src', `/imagens/pause.png`);
}

function zerar() { //metodo que deixa null intervaloId que é o contador
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    PausaBt.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function mostrarTempo(){
    const tempo = new Date(temDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();