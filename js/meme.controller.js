'use strict'

let gElCanvas
let gCtx
let gStartPos
let gTxtWidth
let gClickedLine
let gClickedSticker

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function memeInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    // renderMeme()
}

function renderMeme(img) {

    if (!img) {
        const img = new Image()
        img.src = gImgs[0].url
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
            const meme = getMeme()
            // let currLine = getCurrLine()
            meme.lines.map(line => {
                const { txt, color, size, align, pos, font } = line
                drawText(txt, pos.x, pos.y, color, size, align, font)
                document.querySelector('[name=text]').placeholder = line.txt

            })
            meme.stickers.map(sticker => {
                const stickerImg = new Image()
                const { url, size, pos } = sticker
                stickerImg.src = url;
                stickerImg.onload = () => {

                    gCtx.drawImage(stickerImg, pos.x, pos.y);
                }
            })
        }
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', canvasClicked)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('mousedown', onDownSticker)
    gElCanvas.addEventListener('mousemove', onMoveSticker)
    gElCanvas.addEventListener('mouseup', onUpSticker)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Getting the clicked position
    const pos = getEvPos(ev)
    // { x: 15, y : 15 }
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.querySelector('#my-canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    // const line = meme.lines[meme.selectedLineIdx]
    const line = gClickedLine
    // const sticker = gClickedSticker
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.querySelector('#my-canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function canvasClicked(ev) {
    // TODO: find out if the user clicked a star's bar
    gClickedLine = null
    gClickedSticker = null
    const meme = getMeme()
    // console.log('ev.offsetX:', ev.offsetX)
    gClickedLine = meme.lines.find(line => {
        // console.log('line.pos.x:', line.pos.x)
        // console.log('line.pos.x + line.size', line.pos.x + gTxtWidth.width)
        return ev.offsetX >= line.pos.x && ev.offsetX <= line.pos.x + gTxtWidth.width &&
            ev.offsetY + line.size >= line.pos.y && ev.offsetY <= line.pos.y + 10
    })
    gClickedSticker = meme.stickers.find(sticker => {
        console.log('sticker:', sticker)
        return ev.offsetX >= sticker.pos.x && ev.offsetX <= sticker.pos.x + sticker.size &&
            ev.offsetY + sticker.size >= sticker.pos.y && ev.offsetY <= sticker.pos.y + sticker.size
    })
    // console.log('clickedLine:', gClickedLine)
    console.log('gClickedSticker:', gClickedSticker)
    if (gClickedLine) {

        checkResetLines()
        const meme = getMeme()
        const lineIdx = meme.lines.indexOf(gClickedLine)
        meme.selectedLineIdx = lineIdx
        // console.log('meme.selectedLineIdx:', meme.selectedLineIdx)
        // console.log('lineIdx:', lineIdx)
        // = meme.lines[lineIdx]
        // const txt = line.txt
        onDown(ev)
    } else if (gClickedSticker) onDownSticker(ev)

}

function drawText(txt, x, y, color, size, align, font) {
    gCtx.beginPath()
    // gCtx.textBaseline = baseLine
    gCtx.textAlign = align
    gCtx.lineWidth = 1
    gCtx.font = `${size}px ${font}`
    gCtx.fillStyle = color
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = 'black'
    gTxtWidth = gCtx.measureText(txt);
    // console.log('text:', text)
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
    // console.log('txt');
}

function onDownSticker(ev) {
    const pos = getEvPos(ev)
    // { x: 15, y : 15 }
    if (!isStickerClicked(pos)) return
    setStickerDrag(true)
    gStartPos = pos
    document.querySelector('#my-canvas').style.cursor = 'grabbing'
}

function onMoveSticker(ev) {
    const meme = getMeme()
    const sticker = gClickedSticker
    if (!sticker.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveSticker(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUpSticker() {
    setStickerDrag(false)
    document.querySelector('#my-canvas').style.cursor = 'grab'
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
    onSwitchLine()
    renderMeme()
}

function onSwitchLine() {
    checkResetLines()
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    // console.log('meme.selectedLineIdx:', meme.selectedLineIdx)
    // console.log('lineIdx:', lineIdx)
    const line = meme.lines[lineIdx]
    const txt = line.txt
    // console.log('txt:', txt)

}

function onRemoveLine() {
    const meme = getMeme()

    const line = meme.lines[meme.selectedLineIdx]
    const lineIdx = meme.lines.indexOf(line)
    // console.log('lineIdx:', lineIdx)
    console.log('beee:', lineIdx)
    removeLine(lineIdx)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank"`)
    }
    doUploadImg(imgDataUrl, onSuccess);
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
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onUploadImg(ev) {
    loadImageFromInput(ev, renderMeme)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''

    let reader = new FileReader()

    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
        onImgSelect(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function onSaveMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    console.log('elLink.href:', elLink.href)
    saveMeme(elLink.href)
    // renderMemes()
    // const elMemes = document.querySelector('.saved-memes')
    // console.log('elMemes:', elMemes)
}

function onDrawSticker(elSticker, src) {
    const img = new Image();
    // const dx = 190
    // console.log('elSticker.width:', elSticker.width)
    addSticker(elSticker.width, src)
    // const dx = gMeme.stickers[0].pos.x
    // const dy = gMeme.stickers[0].pos.y
    // const dy = 190
    img.src = src;
    img.onload = () => {

        gCtx.drawImage(img, 190, 190);
    }
    // renderMeme()
    // console.log('elSticker:', elSticker)
    // console.log('src:', src)
}

function onSetFlexible() {
    document.querySelector('.main-gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('flex')

    setRandImg()
}

function onClickColorInput() {
    document.querySelector('[name=txtColor').click()
}

function onClickUploadInput(){
    document.querySelector('.file-input.btn').click()
}

function onSetFont(elFont) {
    const meme = getMeme()
    console.log('elFont:', elFont)
    meme.lines[meme.selectedLineIdx].font = elFont
    renderMeme()
}