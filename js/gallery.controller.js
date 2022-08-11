'use strict'

function renderGallery() {
    let strHtml = ''
    for (let i = 1; i < 19; i++) {
        strHtml += `
        <img onclick="onImgSelect(this)" src="meme-imgs(square)/${i}.jpg" alt="">
        `
    }
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
}


function onImgSelect(elImg) {
    // console.log('elImg:', elImg.src)
    document.querySelector('.gallery-container').classList.remove('grid')
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.canvas-container').classList.remove('hide')
    setImg(elImg.src)
}

function onShowGallery(){
    document.querySelector('.gallery-container').classList.add('grid')
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.canvas-container').classList.add('hide')
}