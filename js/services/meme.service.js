'use strict'
const STORAGE_KEY = 'memesDB'
const gMemes = []

let gMemeUrl
let gCurrLine = 0
let gImgId = 1
let gImgs
// const gImgs = [
//     {
//         id: 1,
//         url: '',
//         keywords: ['funny', 'cat']
//     }
// ]
_createImgs()

const gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Sometimes I eat Falafel',
            size: 40,
            baseLine: 'top',
            color: 'white',
            align: 'center'
        },
        {
            txt: 'Sometimes i dont',
            size: 40,
            baseLine: 'bottom',
            color: 'white',
            align: 'center'
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
    // gId = img.id
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

function _createImgs() {
    const imgs = []
    imgs.push(_createImg('meme-imgs(square)/1.jpg', ['celebs', 'politicians', 'numbers']),)
    imgs.push(_createImg('meme-imgs(square)/2.jpg', ['cute', 'dogs', 'animals']),)
    imgs.push(_createImg('meme-imgs(square)/3.jpg', ['cute', 'dogs', 'babies']),)
    imgs.push(_createImg('meme-imgs(square)/4.jpg', ['animals', 'cats', '']),)
    imgs.push(_createImg('meme-imgs(square)/5.jpg', ['babies', 'happy']),)
    imgs.push(_createImg('meme-imgs(square)/6.jpg', ['crazy', 'smart']),)
    imgs.push(_createImg('meme-imgs(square)/7.jpg', ['babies', 'cute', 'surprised']),)
    imgs.push(_createImg('meme-imgs(square)/8.jpg', ['movies', 'happy']),)
    imgs.push(_createImg('meme-imgs(square)/9.jpg', ['babies', 'evil', 'funny']),)
    imgs.push(_createImg('meme-imgs(square)/10.jpg', ['politicians', 'smile', 'laughing']),)
    imgs.push(_createImg('meme-imgs(square)/11.jpg', ['sports', 'awkward']),)
    imgs.push(_createImg('meme-imgs(square)/12.jpg', ['celebs', 'pointing', 'tv']),)
    imgs.push(_createImg('meme-imgs(square)/13.jpg', ['movies', 'pointing', 'smile']),)
    imgs.push(_createImg('meme-imgs(square)/14.jpg', ['movies', 'sun-glasses', 'scared']),)
    imgs.push(_createImg('meme-imgs(square)/15.jpg', ['movies', 'talks', 'dies']),)
    imgs.push(_createImg('meme-imgs(square)/16.jpg', ['movies', 'laughing']),)
    imgs.push(_createImg('meme-imgs(square)/17.jpg', ['politicians', 'talks', 'numbers']),)
    imgs.push(_createImg('meme-imgs(square)/18.jpg', ['movies', 'scared', 'smile']),)
    gImgs = imgs
}


function _createImg(url, keywords) {
    return {
        id: gImgId++,
        url,
        keywords
    }
}
