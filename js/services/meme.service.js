'use strict'

let gCurrLine = 0
let gId
const gImgs = [
    {
        id: 1,
        url: '',
        keywords: ['funny', 'cat']
    }
]

const gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Sometimes I eat Falafel',
            size: 40,
            baseLine: 'top',
            color: 'white'
        },
        {
            txt: 'Sometimes i dont',
            size: 40,
            baseLine: 'bottom',
            color: 'white'
        }
    ]
}


function getMeme() {
    const img = getImgId(gMeme.selectedImgId)
    const meme = gMeme
    // console.log('meme:', meme)
    // return meme 
    return gMeme
}

function setImg(src) {
    gImgs[0].url = src
    const meme = getMeme()
    meme.lines.map(line =>
        line.txt = 'enter txt here'
    )
    document.querySelector('[name=text]').value = ''
    meme.selectedLineIdx = 0
    renderMeme()
}

function getImgId(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    gId = img.id
    return img
}

function addLine() {
    gCurrLine++
    const line = _createLine()
    gMeme.lines.push(line)

}

function getCurrLine() {

    return gCurrLine
}

function txtLocation(currLine = gCurrLine) {
    let height
    // console.log('currLine:', currLine)
    switch (currLine) {

        case 0:
            height = 10
            break
        case 1:
            height = gElCanvas.height - 30
            break
        default:
            height = gElCanvas.height / 2
            break
    }
    return height
}

function checkResetLines() {

    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    console.log(' gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
    // console.log('lineIdx:', lineIdx)
}
// function resetLines(line) {
//     gMeme.selectedLineIdx = line > gMeme.lines.length - 1 ? 0 : line
// }

function _createLine() {
    if (gCurrLine === 1) {
        return {
            txt: 'Sometimes i dont',
            size: 40,
            baseLine: 'bottom',
            color: 'white'
        }
    }
    else {
        return {
            txt: 'else',
            size: 40,
            baseLine: 'center',
            color: 'white'
        }
    }
}