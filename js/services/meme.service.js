'use strict'

let gId
let gImgs = [
    {
        id: 1,
        url: 'meme-imgs (square)/1.jpg',
        keywords: ['funny', 'cat']
    }
]

let gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            baseLine: 'top',
            color: 'red'
        }
    ]
}


function getMeme(){
    const img = getImgId(gMeme.selectedImgId)
    const meme = gMeme
    // console.log('meme:', meme)
   return meme
}


function getImgId(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    gId = img.id
    return img
}