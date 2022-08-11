'use strict'

function renderGallery() {
    let strHtml = ''
    for (let i = 1; i < 19; i++) {
        strHtml += `
        <img onclick="onImgSelect(this)" src="meme-imgs(square)/${i}.jpg" alt="">
        `
    }
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHtml
}


function onImgSelect(elImg) {

    document.querySelector('.main-gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('flex')
    setImg(elImg.src)
}

function onShowGallery() {
    document.querySelector('.main-gallery-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('hide')
}