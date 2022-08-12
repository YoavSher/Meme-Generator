'use strict'

function renderSavedMemes(){
    const memes = loadFromStorage(STORAGE_KEY)
    console.log('memes:', memes)
    let strHtml = ''
    strHtml = memes.map(meme => `<img src=${meme.memeUrl}>`)
  
    document.querySelector('.canvas-container.saved-memes').innerHTML = strHtml.join('')
}