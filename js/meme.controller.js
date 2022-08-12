'use strict'

let gElCanvas
let gCtx

function memeInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // renderMeme()
}

function renderMeme() {


    const img = new Image()
    img.src = gImgs[0].url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const meme = getMeme()
        // let currLine = getCurrLine()
        meme.lines.map(line => {

            const { txt, baseLine, color, size, align } = line
            const location = txtLocation(gCurrLine)
            drawText(txt, gElCanvas.width / 2, location, baseLine, color, size, align)
            // document.querySelector('[name=text]').value = line.txt
            gCurrLine++
            // console.log('gCurrLine:', currLine)
            console.log('line:', line)
            // console.log('height:', height)
        })
        gCurrLine = 0
    }
}

function drawText(txt, x, y, baseLine, color, size, align) {
    gCtx.beginPath()
    gCtx.textBaseline = baseLine
    gCtx.textAlign = align
    gCtx.lineWidth = 1
    gCtx.font = `${size}px pop-extra-bold`
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

function onAlignTxtLeft() {
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].align = 'end'
    renderMeme()
}
function onAlignTxtCenter() {
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].align = 'center'
    renderMeme()
}
function onAlignTxtRight() {
    const meme = getMeme()
    const currLine = getCurrLine()
    meme.lines[meme.selectedLineIdx].align = 'start'
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

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}

// function onShareMeme() {
//     const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
//     function onSuccess(uploadedImgUrl) {
//         const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
//         document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

//         document.querySelector('.share-container').innerHTML = `
//         <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share   
//         </a>`
//     }
//     doUploadImg(imgDataUrl, onSuccess);
// }


// function doUploadImg(imgDataUrl, onSuccess) {

//     const formData = new FormData();
//     formData.append('img', imgDataUrl)

//     fetch('//ca-upload.com/here/upload.php', {
//         method: 'POST',
//         body: formData
//     })
//         .then(res => res.text())
//         .then((url) => {
//             console.log('Got back live url:', url);
//             onSuccess(url)
//         })
//         .catch((err) => {
//             console.error(err)
//         })
// }

function onSaveMeme() {
    saveMeme()
    // renderMemes()
    // const elMemes = document.querySelector('.saved-memes')
    // console.log('elMemes:', elMemes)
}

function onDrawSticker(elSticker,src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
       
        gCtx.drawImage(img,190, 190,);
    };
    // console.log('elSticker:', elSticker)
    // console.log('src:', src)
}