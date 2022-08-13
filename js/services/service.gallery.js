'use strict'


let gImgs
let gImgId = 1
let gFilterBy = ''

_createImgs()


function getImgsForDisplay() {
    var imgs = gImgs.filter(img => img.keywords.includes(gFilterBy))
    // console.log('imgs:', imgs)
    return imgs
}

function getImgId(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    // gId = img.id
    return img
}

function setGallerySort(filterBy) {
    if (filterBy !== undefined) gFilterBy = filterBy
    return gFilterBy
}

function _createImgs() {
    const imgs = []
    imgs.push(_createImg('meme-imgs(square)/1.jpg', ['celebs', 'politicians', 'numbers','']),)
    imgs.push(_createImg('meme-imgs(square)/2.jpg', ['cute', 'dogs', 'animals','']),)
    imgs.push(_createImg('meme-imgs(square)/3.jpg', ['cute', 'dogs', 'babies','']),)
    imgs.push(_createImg('meme-imgs(square)/4.jpg', ['animals', 'cats', '']),)
    imgs.push(_createImg('meme-imgs(square)/5.jpg', ['babies', 'happy','']),)
    imgs.push(_createImg('meme-imgs(square)/6.jpg', ['crazy', 'smart','']),)
    imgs.push(_createImg('meme-imgs(square)/7.jpg', ['babies', 'cute', 'surprised','']),)
    imgs.push(_createImg('meme-imgs(square)/8.jpg', ['movies', 'happy','']),)
    imgs.push(_createImg('meme-imgs(square)/9.jpg', ['babies', 'evil', 'funny','']),)
    imgs.push(_createImg('meme-imgs(square)/10.jpg', ['politicians', 'smile', 'laughing','']),)
    imgs.push(_createImg('meme-imgs(square)/11.jpg', ['sports', 'awkward','']),)
    imgs.push(_createImg('meme-imgs(square)/12.jpg', ['celebs', 'pointing', 'tv','']),)
    imgs.push(_createImg('meme-imgs(square)/13.jpg', ['movies', 'pointing', 'smile','']),)
    imgs.push(_createImg('meme-imgs(square)/14.jpg', ['movies', 'sun-glasses', 'scared','']),)
    imgs.push(_createImg('meme-imgs(square)/15.jpg', ['movies', 'talks', 'dies','']),)
    imgs.push(_createImg('meme-imgs(square)/16.jpg', ['movies', 'laughing','']),)
    imgs.push(_createImg('meme-imgs(square)/17.jpg', ['politicians', 'talks', 'numbers','']),)
    imgs.push(_createImg('meme-imgs(square)/18.jpg', ['movies', 'scared', 'smile','']),)
    gImgs = imgs
}


function _createImg(url, keywords) {
    return {
        id: gImgId++,
        url,
        keywords
    }
}