'use strict'
const STORAGE_KEY = 'memesDB'
const gMemes = []

let gMemeUrl
let gCurrLine = 0

const gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Sometimes I eat Falafel',
            size: 40,
            baseLine: 'top',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 240,
                y: 10
            }
        },
        // {
        //     txt: 'Sometimes i dont',
        //     size: 40,
        //     baseLine: 'bottom',
        //     color: 'white',
        //     align: 'center',
        //     isDrag: false,
        //     pos: {
        //         x: 240,
        //         y: 540
        //     }
        // }
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
    // gCurrLine = 0
    renderMeme()
}



function addLine() {
    gCurrLine++
    const line = _createLine()
    gMeme.lines.push(line)
console.log('gCurrLine:', gCurrLine)
}

function getCurrLine() {

    return gCurrLine
}

// function txtLocation(currLine = gCurrLine) {
//     let height
//     // console.log('currLine:', currLine)
//     switch (currLine) {

//         case 0:
//             height = 10
//             break
//         case 1:
//             height = gElCanvas.height - 30
//             break
//         default:
//             height = gElCanvas.height / 2
//             break
//     }
//     return height
// }

function checkResetLines() {

    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
    // console.log(' gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
    // console.log('lineIdx:', lineIdx)
}


function saveMeme() {
    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = []
    uploadImg()
    setTimeout(() => {
        console.log('gMemeUrl:', gMemeUrl)
        gMeme['memeUrl'] = gMemeUrl
        memes.push(gMeme)
        saveToStorage(STORAGE_KEY, memes)
    }, 1000)

}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        gMemeUrl = uploadedImgUrl

        // document.querySelector('.share-container').innerHTML = `
        // <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        //    Share   
        // </a>`
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url)
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}
function _createLine() {
    if (gCurrLine === 1) {
        return {
            txt: 'Enter text here',
            size: 40,
            baseLine: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 240,
                y: 540
            }
        }
    }
    else {
        return {
            txt: 'Enter text here',
            size: 40,
            baseLine: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 240,
                y: 300
            }
        }
    }
}

function isLineClicked(clickedPos) {
    // const pos = gCircle.pos
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

