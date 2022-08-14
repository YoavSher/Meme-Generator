'use strict'

// function renderSavedMemes(){
//     const memes = loadFromStorage(STORAGE_KEY)
//     console.log('memes:', memes)
//     let strHtml = ''
//     strHtml = memes.map(meme => `<a href="index.html"><img onclick="onMemeSelect(this)" src=${meme.memeUrl}></a>`)
  
//     document.querySelector('.gallery').innerHTML = strHtml.join('')
// }

function initMemesGallery(){
    document.querySelector('.main-gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.add('hide')
    console.log('saved');
    document.querySelector('.saved-memes-container').classList.remove('hide')
    
    onRenderMemesGallery()
}

function onRenderMemesGallery(){
    const memes = loadFromStorage(STORAGE_KEY)
    console.log('memes:', memes)
    let strHtml = ''
    strHtml = memes.map(meme => `<img onclick="onMemeSelect(this)" src=${meme.memeUrl}>`)
  
    document.querySelector('.saved-memes').innerHTML = strHtml.join('')
}




function onMemeSelect(elMeme){
    console.log('elMeme:', elMeme)
    document.querySelector('.saved-memes-container').classList.add('hide')
    document.querySelector('.main-gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.remove('hide')
    document.querySelector('.meme-container').classList.add('flex')
    setImg(elMeme.src)
}