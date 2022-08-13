'use strict'

function renderGallery() {
    const imgs = getImgsForDisplay()
    const strHtml = imgs.map(img =>
        ` <img onclick="onImgSelect(this)" src="${img.url}" alt="">`
    ).join('')
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

function onIncreaseSize(elWord) {
    const word = elWord
    word.style.fontSize = 'xx-large'
    // console.log('word:', word)
}

function onSetSortBy() {
    const prop = document.querySelector('[name=search-bar]').value
    setGallerySort(prop)
    renderGallery()
    // console.log('prop:', prop)
}