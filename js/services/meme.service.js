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
    ]
}


function getMeme() {
    // const img = getImgId(gMeme.selectedImgId)
    // const meme = gMeme
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
    // console.log('gCurrLine:', gCurrLine)
}

function getCurrLine() {

    return gCurrLine
}

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

function removeLine(lineIdx) {
    gCurrLine--
    const meme = getMeme()
    const lines = meme.lines
    // const selectedLine = lines.findIndex(line => lineIdx === book.id)
    lines.splice(lineIdx, 1)
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
    else if (gCurrLine === 2) {
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
    else if (gCurrLine === 3) {
        return {
            txt: 'Enter text here',
            size: 40,
            baseLine: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 240,
                y: 160
            }
        }
    }
    else if (gCurrLine === 4) {
        return {
            txt: 'Enter text here',
            size: 40,
            baseLine: 'bottom',
            color: 'white',
            align: 'center',
            isDrag: false,
            pos: {
                x: 240,
                y: 440
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


function setRandImg() {
   
    gImgs[0].url = gImgs[getRandomIntInclusive(0, 17)].url
    const meme = getMeme()
    meme.lines.map(line => {
        const txt = _getLineTxt()
        line.txt = txt[getRandomIntInclusive(0, txt.length - 1)]
    })
    document.querySelector('[name=text]').value = ''
    meme.selectedLineIdx = 0
    // gCurrLine = 0
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