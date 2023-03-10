import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.querySelector('#meme-modal')
const bodyContainer = document.getElementById("body_container")

emotionRadios.addEventListener('change', highlightCheckedOption)


document.addEventListener("click", function(e) {
    if(!e.target.closest("#meme-modal-inner") && !e.target.closest('#get-image-btn'))
    closeModal()
})

getImageBtn.addEventListener('click', renderCat)


function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
    bodyContainer.style.backgroundColor = "#fff"
}

function renderCat(){
    const catObject = getSingleCatObject()
    const catObjects = getMatchingCatsArray()
    memeModalInner.innerHTML = ""
    if(document.querySelector('#all-images:checked')) {
        for(let cat of catObjects) {
            memeModalInner.innerHTML +=  `
        <img 
        class="cat-img-all" 
        src="/images/${cat.image}"
        alt="${cat.alt}"
        >
        `
        memeModal.style.display = 'grid'
        memeModal.classList.remove("meme-modal-one")
        memeModal.classList.add("meme-modal-all")
        memeModalInner.classList.add("grid")
       
        }
    } else {

        memeModalInner.innerHTML =  `
            <img 
            class="cat-img-one" 
            src="/images/${catObject.image}"
            alt="${catObject.alt}"
            >
            `
        memeModalInner.classList.remove("grid")
        memeModal.style.display = 'flex'
        memeModal.classList.remove("meme-modal-all")
        memeModal.classList.add("meme-modal-one")
    }
    
   
    bodyContainer.style.backgroundColor = "#CAC3C5"
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)



