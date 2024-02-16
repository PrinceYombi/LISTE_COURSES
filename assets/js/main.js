/**
 * LES VARIABLES
 */
const articleEnter = document.getElementById('articleEnter')
const addListe = document.getElementById('add-liste')
const articles = document.getElementById('articles')
const resetListe = document.querySelector('.reset-liste')

//CLICK PERMETTANT D'AJOUTER UN ARTICLE DANS LA LISTE
addListe.onclick = ajoutArticle

//INITIALISATION DE LA LISTE DES ARTICLES ET LE SAUVEGARDE LOCAL
let articleListe = getLocalData()

//FONCTION PERMETTANT DE SAUVEGARDER UN ARTICLE EN LOCAL
function saveLocalData(data){

    if (typeof(localStorage) !== "undefined") {
        
        return localStorage.setItem("articles", JSON.stringify(data))
    }
}

//FONCTION PERMETTANT DE RECUPERER LES ARTICLES SAUVEGARDER EN LOCAL
function getLocalData(){

    if (typeof(localStorage) !== "undefined") {
        
        return JSON.parse(localStorage.getItem("articles")) || []
    }else{
        return []
    }
}

/**
 * FONCTION QUI GERE LA LISTE DES ARTICLES ET LES ACTIONS A EFFECTUER
 * MODIFIER - SUPPRIMER - ACHETER
 */
refreshArticle()
function refreshArticle(){

    articles.innerHTML = ''

    articleListe.forEach(article =>{
        const li = document.createElement('li')
        li.className = "article"

        const span = document.createElement('span')
        span.className = ""

        const supprimer = document.createElement('button')
        supprimer.className = "btn btn-danger"
        supprimer.innerText = "Supprimer"

        const modifier = document.createElement('button')
        modifier.onclick = ()=> toggleUpdate(article)
        if (article.isUpdating) {
            //Modifier un article
            const input = document.createElement('input')
            input.value = article.name
            input.onchange = ()=> handleUpdate(event, article)
            modifier.innerText = "Sauvegarder"
            modifier.className = "btn btn-save"

            li.appendChild(input)
        }else{
            span.innerText = article.name
            modifier.className = "btn btn-primary"
            modifier.innerText = "Modifier"

            li.appendChild(span)
        }

        const acheter = document.createElement('button')
        acheter.onclick = ()=> handleBuying(article)
        if (article.isBuying) {
            span.classList.add("sell")
            acheter.innerText = "Article acheté"
            acheter.className = "btn disabled"
            acheter.setAttribute('disabled', "true")
            supprimer.style.display = "none"
            modifier.style.display = "none"
        }else{
            acheter.className = "btn btn-success"
            acheter.innerText = "Acheter"
        }

        
        supprimer.onclick = ()=> handleSupprimer(article)
        
        li.appendChild(modifier)
        li.appendChild(acheter)
        li.appendChild(supprimer)
        articles.appendChild(li)

        
    })

    if (articles.innerHTML === "") {
        resetListe.style.display = "none"
    }else{
        resetListe.style.display = "block"
    }

    resetListe.onclick = ()=> handleReset()

}

/**
 * 
 * @param {Element} article 
 * FONCTION PERMETTANT DE CHANGER LA VALEUR DE isUpdating EN TRUE
 */
function toggleUpdate(article){

    const index = articleListe.findIndex(art => art._id === article._id)
    articleListe[index].isUpdating = !article.isUpdating

    refreshArticle()
    saveLocalData(articleListe)
}

/**
 * 
 * @param {Event} event 
 * @param {Element} article 
 * FONCTION PERMETTANT DE MODIFIER LE NOM D'UN ARTICLE
 */
function handleUpdate(event, article){

    const name = event.target.value.trim()
    if (name) {
        article.name = name
        const index = articleListe.findIndex(art => art._id === article._id)
        articleListe[index] = article
        
    }

    saveLocalData(articleListe)
}

/**
 * 
 * @param {id} param0 
 * FONCTION PERMETTANT DE SUPPRIMER UN ARTICLE
 */
function handleSupprimer({_id}){
    articleListe = articleListe.filter(article => article._id !==_id )

    refreshArticle()
    saveLocalData(articleListe)
}

/**
 * 
 * @param {Element} article 
 * FONCTION PERMETTANT DE CHANGER LA VALEUR DE isBuying EN TRUE
 */
function handleBuying(article){

    const index = articleListe.findIndex(art => art._id === article._id)
    articleListe[index].isBuying = !article.isBuying

    refreshArticle()
    saveLocalData(articleListe)
}

//FONCTION PERMETTANT DE REINISLISER LA LISTE
function handleReset(){

    articleListe = []

    refreshArticle()
    saveLocalData(articleListe)

    resetListe.style.display = "none"
}

//FONCTION PERMETTANT DE DEFINIR UN ARTICLE
function ajoutArticle(){

    let articleName = articleEnter.value.trim()
    
    if (articleName) {
        
        const article = {

            _id  : Math.round(Math.random()*858541),
            name : articleName,
            isUpdating : false,
            isBuying : false,
            createdAt : new Date()
        }
        articleListe.push(article)
        refreshArticle()
        saveLocalData(articleListe)
    }
    
    articleEnter.value = ""

}

















