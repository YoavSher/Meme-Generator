'use strict'

let gElCanvas
let gCtx

function memeInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

// function renderMeme(img){
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function renderMeme() {


    const img = new Image()
    img.src = 'meme-imgs (square)/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const meme = getMeme()
        const { txt, baseLine, color, size } = meme.lines[0]
        drawText(txt, gElCanvas.width / 2, 10, baseLine, color, size)
    }
}




function drawText(txt, x, y, baseLine, color, size) {
    gCtx.beginPath()
    gCtx.textBaseline = baseLine
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 1
    gCtx.font = `${size}px david`
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = 'black'
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
    // console.log('txt');
}

function setLineTxt(elTxt){
    // console.log('elTxt:', elTxt.value)
    const meme = getMeme()
    meme.lines[0].txt = elTxt.value
    renderMeme()
}