let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica() {
    palavras = [
        palavra001 = {
            nome: "BRASIL",
            categoria: "LUGARES"
        },
        palavra002 = {
            nome: "EQUADOR",
            categoria: "LUGARES"
        },
        palavra003 = {
            nome: "CHILE",
            categoria: "LUGARES"
        },
        palavra004 = {
            nome: "AFRICA DO SUL",
            categoria: "LUGARES"
        },
        palavra005 = {
            nome: "PORTUGAL",
            categoria: "LUGARES"
        },
        palavra006 = {
            nome: "ESPANHA",
            categoria: "LUGARES"
        },
        palavra007 = {
            nome: "RIO DE JANEIRO",
            categoria: "LUGARES"
        },
        palavra008 = {
            nome: "ARGENTINA",
            categoria: "LUGARES"
        },
        palavra009 = {
            nome: "RUSSIA",
            categoria: "LUGARES"
        },
        palavra010 = {
            nome: "FRANÇA",
            categoria: "LUGARES"
        },
        palavra011 = {
            nome: "JAPAO",
            categoria: "LUGARES"
        },
        palavra012 = {
            nome: "CANADA",
            categoria: "LUGARES"
        },
        palavra013 = {
            nome: "AUSTRALIA",
            categoria: "LUGARES"
        },
        palavra014 = {
            nome: "URUGUAI",
            categoria: "LUGARES"
        },
        palavra015 = {
            nome: "BICICLETA",
            categoria: "TRANSPORTE"
        },
        palavra016 = {
            nome: "LANCHA",
            categoria: "TRANSPORTE"
        },
        palavra017 = {
            nome: "NAVIO",
            categoria: "TRANSPORTE"
        },
        palavra018 = {
            nome: "TELEFERICO",
            categoria: "TRANSPORTE"
        },
        palavra019 = {
            nome: "MOTOCICLETA",
            categoria: "TRANSPORTE"
        },
        palavra020 = {
            nome: "BARCO",
            categoria: "TRANSPORTE"
        },
        palavra021 = {
            nome: "AERONAVE",
            categoria: "TRANSPORTE"
        },
        palavra022 = {
            nome: "TREM",
            categoria: "TRANSPORTE"
        },
        palavra023 = {
            nome: "CAIAQUE",
            categoria: "TRANSPORTE"
        },
        palavra024 = {
            nome: "CARRO",
            categoria: "TRANSPORTE"
        },
        palavra025 = {
            nome: "ONIBUS",
            categoria: "TRANSPORTE"
        },
        palavra026 = {
            nome: "TREM BALA",
            categoria: "TRANSPORTE"
        },
        palavra027 = {
            nome: "METRO",
            categoria: "TRANSPORTE"
        },
        palavra028 = {
            nome: "PATINS",
            categoria: "TRANSPORTE"
        },
        palavra029 = {
            nome: "XICARA",
            categoria: "OBJETOS"
        },
        palavra030 = {
            nome: "MOEDA",
            categoria: "OBJETOS"
        },
        palavra031 = {
            nome: "FITA ADESIVA",
            categoria: "OBJETOS"
        },
        palavra032 = {
            nome: "SINO",
            categoria: "OBJETOS"
        },
        palavra033 = {
            nome: "CHUVEIRO",
            categoria: "OBJETOS"
        },
        palavra034 = {
            nome: "VENTILADOR",
            categoria: "OBJETOS"
        },
        palavra035 = {
            nome: "LAMPADA",
            categoria: "OBJETOS"
        },
        palavra036 = {
            nome: "TELA DE PINTAR",
            categoria: "OBJETOS"
        },
        palavra037 = {
            nome: "CORTINA",
            categoria: "OBJETOS"
        },
        palavra038 = {
            nome: "LAPIS",
            categoria: "OBJETOS"
        },
        palavra039 = {
            nome: "CANETA",
            categoria: "OBJETOS"
        },
        palavra040 = {
            nome: "CADERNO",
            categoria: "OBJETOS"
        },
        palavra041 = {
            nome: "RELOGIO",
            categoria: "OBJETOS"
        },
        palavra042 = {
            nome: "MELANCIA",
            categoria: "ALIMENTOS"
        },
        palavra043 = {
            nome: "AMENDOIM",
            categoria: "ALIMENTOS"
        },
        palavra044 = {
            nome: "ESFIRRA",
            categoria: "ALIMENTOS"
        },
        palavra045 = {
            nome: "BROCOLIS",
            categoria: "ALIMENTOS"
        },
        palavra046 = {
            nome: "UVA VERDE",
            categoria: "ALIMENTOS"
        },
        palavra047 = {
            nome: "PIMENTA",
            categoria: "ALIMENTOS"
        },
        palavra048 = {
            nome: "MACARRAO",
            categoria: "ALIMENTOS"
        },
        palavra049 = {
            nome: "BOLO DE CHOCOLATE",
            categoria: "ALIMENTOS"
        },
        palavra050 = {
            nome: "CREME DE LEITE",
            categoria: "ALIMENTOS"
        },
        palavra051 = {
            nome: "BRIGADEIRO",
            categoria: "ALIMENTOS"
        },
        palavra052 = {
            nome: "BATATA FRITA",
            categoria: "ALIMENTOS"
        },
        palavra053 = {
            nome: "PIZZA",
            categoria: "ALIMENTOS"
        },
        palavra054 = {
            nome: "PIRULITO",
            categoria: "ALIMENTOS"
        },
        palavra055 = {
            nome: "SORVETE",
            categoria: "ALIMENTOS"
        },
        palavra056 = {
            nome: "DRAGAO",
            categoria: "ANIMAIS"
        },
        palavra057 = {
            nome: "GALINHA",
            categoria: "ANIMAIS"
        },
        palavra058 = {
            nome: "PAVAO",
            categoria: "ANIMAIS"
        },
        palavra059 = {
            nome: "CAMELO",
            categoria: "ANIMAIS"
        },
        palavra060 = {
            nome: "PERU",
            categoria: "ANIMAIS"
        },
        palavra061 = {
            nome: "ZEBRA",
            categoria: "ANIMAIS"
        },
        palavra062 = {
            nome: "CACHORRO",
            categoria: "ANIMAIS"
        },
        palavra063 = {
            nome: "CALANGO",
            categoria: "ANIMAIS"
        },
        palavra064 = {
            nome: "COELHO DA PASCOA",
            categoria: "ANIMAIS"
        },
        palavra065 = {
            nome: "LAGARTIXA",
            categoria: "ANIMAIS"
        },
        palavra066 = {
            nome: "HIPOPOTAMO",
            categoria: "ANIMAIS"
        },
        palavra067 = {
            nome: "TIGRE",
            categoria: "ANIMAIS"
        },
        palavra068 = {
            nome: "URSO POLAR",
            categoria: "ANIMAIS"
        },
        palavra069 = {
            nome: "ELEFANTE",
            categoria: "ANIMAIS"
        },
        palavra070 = {
            nome: "A ERA DO GELO",
            categoria: "TV E CINEMA"
        },
        palavra071 = {
            nome: "HOMEM ARANHA",
            categoria: "TV E CINEMA"
        },
        palavra072 = {
            nome: "MIKEY MOUSE",
            categoria: "TV E CINEMA"
        },
        palavra073 = {
            nome: "DIVERTIDA MENTE",
            categoria: "TV E CINEMA"
        },
        palavra074 = {
            nome: "MARSHA E O URSO",
            categoria: "TV E CINEMA"
        },
        palavra075 = {
            nome: "CAPITAO AMERICA",
            categoria: "TV E CINEMA"
        },
        palavra076 = {
            nome: "MULHER MARAVILHA",
            categoria: "TV E CINEMA"
        },
        palavra077 = {
            nome: "O REI LEAO",
            categoria: "TV E CINEMA"
        },
        palavra078 = {
            nome: "BOB ESPONJA",
            categoria: "TV E CINEMA"
        },
        palavra079 = {
            nome: "PATRULHA CANINA",
            categoria: "TV E CINEMA"
        },
        palavra080 = {
            nome: "O PEQUENO PRINCIPE",
            categoria: "TV E CINEMA"
        },
        palavra081 = {
            nome: "VINGADORES",
            categoria: "TV E CINEMA"
        },
        palavra082 = {
            nome: "BARBIE",
            categoria: "TV E CINEMA"
        },
        palavra083 = {
            nome: "PANTERA NEGRA",
            categoria: "TV E CINEMA"
        }
    ];
}


function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


