'use strict'

let gElCanvas
let gCtx

function memeInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // renderMeme()
}

// function renderMeme(img){
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function renderMeme() {


    const img = new Image()
    img.src = gImgs[0].url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const meme = getMeme()
        // let currLine = getCurrLine()
        meme.lines.map(line => {
            
            const { txt, baseLine, color, size } = line
            const location = txtLocation(gCurrLine)
            drawText(txt, gElCanvas.width / 2, location, baseLine, color, size)
            // document.querySelector('[name=text]').value = line.txt
            gCurrLine++
            // console.log('gCurrLine:', currLine)
            console.log('line:', line)
            // console.log('height:', height)
        })
        gCurrLine = 0
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

function setLineTxt(elTxt) {
    // console.log('elTxt:', elTxt.value)
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].txt = elTxt.value
    renderMeme()
}

function onSetColor(elColor) {
    const meme = getMeme()
    // console.log('elColor.value:', elColor.value)
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].color = elColor.value
    renderMeme()
}

function onIncreaseFontSize() {
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].size += 5
    renderMeme()
}

function onDecreaseFontSize() {
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].size -= 5
    renderMeme()
}

function onAddLine() {
    addLine()
    const meme = getMeme()
    // const currLine = getCurrLine()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    const height = txtLocation()
    const { txt, baseLine, color, size } = line
    drawText(txt, gElCanvas.width / 2, height, baseLine, color, size)
    document.querySelector('[name=text]').value = line.txt
    console.log('height:', height)
    // renderMeme()
}

function onSwitchLine() {
    checkResetLines()
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    // console.log('meme.selectedLineIdx:', meme.selectedLineIdx)
    // console.log('lineIdx:', lineIdx)
    const line = meme.lines[lineIdx]
    const txt = line.txt
    console.log('txt:', txt)
    // const { txt, baseLine, color, size } = line
    // drawText(txt, gElCanvas.width / 2, gElCanvas.height - 10, baseLine, color, size)
    document.querySelector('[name=text]').value = txt
    // resetLines(lineIdx)
}