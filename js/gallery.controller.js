'use strict'

function renderGallery() {
    memeInit()
    const imgs = getImgsForDisplay()
    const strHtml = imgs.map(img =>
        ` <img onclick="onImgSelect(this,${img.id})" src="${img.url}" alt="">`
    ).join('')
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHtml
}


function onImgSelect(elImg, imgId) {
// console.log('imgId:', imgId)
    document.querySelector('.main-gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('flex')
    setImg(elImg.src, imgId)
}

function onShowGallery() {
    document.querySelector('.main-gallery-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('hide')
    document.querySelector('.saved-memes-container').classList.add('hide')
}

function onIncreaseSize(elWord) {
    const word = elWord
    word.style.fontSize = 'xx-large'
    // console.log('word:', word)
}

function onSetFilterBy() {
    const prop = document.querySelector('[name=search-bar]').value
    setGallerySort(prop)
    renderGallery()
    // console.log('prop:', prop)
}