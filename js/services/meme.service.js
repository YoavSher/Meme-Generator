'use strict'
const STORAGE_KEY = 'memesDB'
const gMemes = []

let gMemeUrl
let gCurrLine = 0

const gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    stickers: [

    ],
    lines: [
        {
            txt: 'Sometimes I eat Falafel',
            size: 40,
            font: 'Ariel',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 250,
                y: 50
            }
        },
    ]
}


function getMeme() {
   
    return gMeme
}

function setImg(src) {
    gCurrLine = 0
    gImgs[0].url = src
    const meme = getMeme()
    meme.lines.map(line => {
        line.txt = 'enter txt here'
        line.pos.x = 250
        line.pos.y = 50
    })
    document.querySelector('[name=text]').value = ''
    meme.selectedLineIdx = 0
    gMeme.lines.splice(1, gMeme.lines.length)
    gMeme.stickers = []

    renderMeme()
}



function addLine() {
    gCurrLine++
    const line = _createLine()
    line.txt = 'enter txt here'
    document.querySelector('[name=text]').value = ''
    gMeme.lines.push(line)
}

function getCurrLine() {

    return gCurrLine
}

function checkResetLines() {

    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
}


function saveMeme(elLink) {
    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = []

    console.log('gMemeUrl:', gMemeUrl)
    gMeme['memeUrl'] = elLink
    memes.push(gMeme)
    saveToStorage(STORAGE_KEY, memes)

}

function removeLine(lineIdx) {
    gCurrLine--
    const meme = getMeme()
    const lines = meme.lines
    lines.splice(lineIdx, 1)
}


function _createLine() {
    if (gCurrLine === 1) {
        return {
            txt: '',
            size: 40,
            font: 'bottom',
            color: 'white',
            isDrag: false,
            pos: {
                x: 250,
                y: 540
            }
        }
    }
    else if (gCurrLine === 2) {
        return {
            txt: '',
            size: 40,
            font: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 250,
                y: 300
            }
        }
    }
    else if (gCurrLine === 3) {
        return {
            txt: '',
            size: 40,
            font: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 250,
                y: 160
            }
        }
    }
    else if (gCurrLine === 4) {
        return {
            txt: '',
            size: 40,
            font: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 250,
                y: 440
            }
        }
    }
}

function isLineClicked(clickedPos) {

    const { pos } = gClickedLine
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gTxtWidth.width
}

function isStickerClicked(clickedPos) {

    const { pos } = gClickedSticker
    console.log('pos:', gClickedSticker)
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gClickedSticker.size
}

function setLineDrag(isDrag) {
    gClickedLine.isDrag = isDrag
}
function setStickerDrag(isDrag) {
    gClickedSticker.isDrag = isDrag
}

function moveLine(dx, dy) {

    gClickedLine.pos.x += dx
    gClickedLine.pos.y += dy
}

function moveSticker(dx, dy) {

    gClickedSticker.pos.x += dx
    gClickedSticker.pos.y += dy
}


function addSticker(width, url) {

    const sticker = _createSicker(width, url)
    gMeme.stickers.push(sticker)
}

function _createSicker(size, url) {
    return {
        isDrag: false,
        url,
        size,
        pos: {
            x: 190,
            y: 190
        }
    }
}

function setRandImg() {

    gImgs[0].url = gImgs[getRandomIntInclusive(0, 17)].url
    const meme = getMeme()
    meme.lines.map(line => {
        const txt = _getLineTxt()
        line.txt = txt[getRandomIntInclusive(0, txt.length - 1)]
    })
    document.querySelector('[name=text]').value = ''
    meme.selectedLineIdx = 0
    renderMeme()
}

function _getLineTxt() {
    const txts = [
        'Why The Fuck ',
        'Not Sure If ',
        'I’ll Have You Know',
        'One Does Not Simply',
        'Am I The Only One Around Here',
        'But That’s None of My Business',
        'You Know What Really Grinds My Gears?',
        'And Just Like That',
        'Everyone Loses Their Mind',
        'What If I Told You'
    ]
    return txts
}