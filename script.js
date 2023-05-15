var vidas = 6

var words = [
    "O Poderoso Chefão",
    "O Senhor dos Anéis",
    "Interestelar",
    "Matrix",
    "Pulp Fiction",
    "Clube da Luta",
    "De Volta para o Futuro",
    "Cidade de Deus",
    "A Origem",
    "O Grande Gatsby",
    "Os Infiltrados",
    "Piratas do Caribe",
    "Forrest Gump",
    "A Lista de Schindler",
    "O Labirinto do Fauno",
    "Gladiador",
]
var wordsused = []

var frase = document.querySelector(".frase")
var imagem = document.getElementById('imagem')
var used = document.querySelector(".used")

function gerar(){
    const aleatorio = (num) => Math.floor(Math.random() * num)
    var word = words[aleatorio(words.length)]
    var letras = word.split('')
    console.log(letras)
    var acertadas = 0
    letras.forEach(element => {
        var input = document.createElement("input")
        input.setAttribute('maxlength', '1')
        input.classList.add('input')
        if(element===' '){
            input.style.borderBottom='4px solid gray'
        }
        input.addEventListener("input", ()=>{
            var pegarletra = input.value
            if (vidas == 1){
                alert('vc morreu')
                reset()
            }else{
                if (pegarletra != ""){
                    if (letras[acertadas].toLowerCase() == pegarletra){
                        if (acertadas == letras.length - 1){
                            setTimeout(() => {
                                alert('voce ganhou !')
                                reset()
                            }, 500);
                        }
                        if (!wordsused.includes(pegarletra)){
                            wordsused.push(pegarletra)
                            used.innerHTML=wordsused
                        }
                        input.disabled = true;
                        input.style.borderBottom='4px solid green'
                        acertadas++

                    }else{
                        if (wordsused.includes(pegarletra)){
                            input.style.borderBottom='4px solid yellow'
                            setTimeout(() => {
                                input.style.borderBottom=''
                            }, 1000);
                            if (!wordsused.includes(pegarletra)){
                                wordsused.push(pegarletra)
                            }
                            used.innerHTML=wordsused
                        }else{
                            if (!wordsused.includes(pegarletra)){
                                wordsused.push(pegarletra)
                            }
                            used.innerHTML=wordsused
                            input.style.borderBottom='4px solid red'
                            setTimeout(() => {
                                vidas--
                                imagem.src='img/f'+vidas+'.png'
                            }, 500);
                        }
                    }
                }
            }
        })



        frase.appendChild(input)
    });
    
}
function reset(){
    vidas = 6
    wordsused = []
    var htmlinput = document.querySelectorAll(".input")
    if (htmlinput){
        htmlinput.forEach(element => {
            element.remove()
        });
    }
    imagem.src='img/f7.png'
    console.log(vidas)
    used.innerHTML=" "
    gerar()
}
gerar()