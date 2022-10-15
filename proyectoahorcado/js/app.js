; (function(){
    'uses strict'
var juego = {
    palabra: 'ALURA',
    estado:  2,
    adivinado: ['A','L'],
    errado: ['B', 'J', 'K', 'C']
}
var $html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')

}
function dibujar(juego) {
    //actualizar la imagen del hombre
    var $elem
    $elem = $html.hombre
    var estado = juego.estado
    if(estado == 8){
        estado = juego.previo
    }
    console.log($elem.src = './img/estados/2' + estado + '.png')
    //creamos las letras a adivinadas 
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    $elem = $html.adivinado 
    $elem.innerHTML = ''
    for (let letra of palabra) {
        let $span = document.createElement('span')
        let $txt = document.createTextNode('')
        if (adivinado.indexOf(letra) >= 0) {
            $txt.nodeValue = letra
        }
        $span.setAttribute('class', 'letra adivinada')
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
    //creamos las letras erradas
    var errado = juego.errado
    $elem = $html.errado
    $elem.innerHTML = ''
    for(let letra of errado){
        let $span = document.createElement('span')
        let $txt = document.createTextNode(letra)
        $span.setAttribute('class', 'letra errada')
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
}
function adivinar(juego, letra){
    var estado = juego.estado
    //si ya el juego se perdio debe quedar ahi
    if (estado == 1 || estado == 8){
        return
    }
    var adivinado = juego.adivinado
    var errado = juego.errado
    //si ya hemos adivinado la letra no se hace nada
    if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra)>= 0){
        return
    }
     
    var palabra = juego.palabra
    if (palabra.indexOf(letra) >= 0){
        let ganado = true
        for(let l of palabra) {
            if (adivinado.indexOf(l) < 0 && l != letra ){
                ganado = false
                juego.previo = juego.estado
                break
            }
        }
        if (ganado) {
            juego.estado = 8
        }
        adivinado.push(letra)
        } else {
            juego.estado--
            errado.push(letra)
    }
}
window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase()
    if(!/[*A-ZÑ]/.test(letra)) {
        return
    }
    adivinar(juego, letra)
    dibujar(juego)
}
dibujar(juego)
}())