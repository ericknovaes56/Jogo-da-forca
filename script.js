var vidas = 6

words = ['maçã', 'banana', 'laranja', 'uva', 'abacaxi', 'morango', 'kiwi', 'melancia', 'manga', 'pera']



var wordsused = []

var frase = document.querySelector(".frase")
var imagem = document.getElementById('imagem')
var used = document.querySelector(".used")
var htmlinput = document.querySelectorAll(".input")

var posiinput = 0
var userposi = 1
var posiletras = []
var slice = []
function gerar(){
    const aleatorio = (num) => Math.floor(Math.random() * num)
    var word = words[aleatorio(words.length)]
    var letras = word.split('')
    console.log(letras)
    var letras = letras.map(function(word) {
        return word.toLowerCase();
    });
    var acertadas = 0
    letras.forEach(element => {
        posiinput++
        var input = document.createElement("input")
        input.setAttribute('maxlength', '1')
        input.classList.add('input')
        input.classList.add('posi'+posiinput)
        if(element===' '){
            input.style.borderBottom='4px solid blue'
        }
        input.name=element
        input.addEventListener("input", ()=>{
            var pegarletra = input.value
            pegarletra = pegarletra.toLowerCase()
            if (vidas == 0){
                alert('vc morreu')
                reset()
            }else{
                if (pegarletra != ""){
                    if (input.name == pegarletra){
                        posiletras = []
                        for (let i = 0; i < letras.length; i++) {
                            if (letras[i] === pegarletra && letras.indexOf(letras[i]) !== letras.lastIndexOf(letras[i])) {
                                posiletras.push(i)
                            }
                          }
                        var corri = -1
                        posiletras.forEach(element => {
                            var soma =element+1
                            var complete=document.querySelector('.posi'+soma)
                            complete.value=pegarletra
                            complete.disabled=true
                            complete.style.borderBottom='4px solid green'
                            console.log(complete)
                            slice.push(input.value)
                            corri++
                        });
                        if (corri > -1){
                            acertadas = acertadas + corri
                        }
                        acertadas++
                        console.log(acertadas)
                        input.disabled = true;
                        input.style.borderBottom='4px solid green'
                        userposi++
                        console.log(slice)
                        if (acertadas == letras.length){
                            setTimeout(() => {
                                alert('vc ganhou')
                                reset()
                            }, 500);
                        }

                    }else{
                        if (letras.includes(pegarletra)){
                            posiletras = []
                            for (let i = 0; i < letras.length; i++) {
                                if (letras[i] === pegarletra && letras.indexOf(letras[i]) !== letras.lastIndexOf(letras[i])) {
                                    posiletras.push(i)
                                }
                              }
                            var corri = -1
                            posiletras.forEach(element => {
                                var soma =element+1
                                var complete=document.querySelector('.posi'+soma)
                                complete.value=pegarletra
                                complete.disabled=true
                                complete.style.borderBottom='4px solid green'
                                console.log(complete)
                                slice.push(input.value)
                                corri++
                            });
                            if (corri > -1){
                                acertadas = acertadas + corri
                            }
                            var posicao = encontrarPosicaoLetra(pegarletra, letras);
                            posicao=posicao + 1
                            var complete=document.querySelector('.posi'+posicao)
                            complete.disabled = true;
                            complete.style.borderBottom='4px solid green'
                            complete.value=pegarletra
                            input.value=''
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
            }
        })



        frase.appendChild(input)
    });
    
}
function reset(){
    userposi = 1
    posiinput = 0
    vidas = 6
    wordsused = []
    var htmlinput = document.querySelectorAll(".input")
    if (htmlinput){
        htmlinput.forEach(element => {
            element.remove()
        });
    }
    imagem.src='img/f7.png'
    used.innerHTML=" "
    gerar()
}
function encontrarPosicaoLetra(letra, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === letra) {
        return i;
      }
    }
    return -1;
  }
gerar()