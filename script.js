const API_KEY = "9520a558763a4be6a9beb5b96854eaf6";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>{

    fetchNews("India");
});

function reload(){
    window.location.reload();
}

async function fetchNews(query){

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

    const data = await res.json();

    bindData(data.articles);
}

function bindData(articles){

    const cardContainer = document.getElementById('cards-container');

    const newsCardTemplate = document.getElementById('template-news-card');


    // Emptying cardContainer before call binddata function
    cardContainer.innerHTML = "";

    articles.forEach(article => {
        
        if(!article.urlToImage) return;


        // Deep cloning using this line 
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,article);

        cardContainer.appendChild(cardClone);
    });

}


function fillDataInCard(cardClone,article){

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDecs = cardClone.querySelector('#news-desc');

    let substringDesc = `${article.description.substring(0,110)}...`;
    let substringTitle = `${article.title.substring(0,30)}...`;

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = substringTitle;
    newsDecs.innerHTML = substringDesc;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{timeZone:"Asia/jakarta"});

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{

        window.open(article.url,"_blank")
    })
}

let curSelectNav = null;

function onNavItemClick(id){

    fetchNews(id);

    const navitem = document.getElementById(id);

    curSelectNav?.classList.remove('active');

    curSelectNav = navitem;

    curSelectNav.classList.add('active');
}

const searchText = document.getElementById('news-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',()=>{

    const query = searchText.value;

    if(!query) return;

    fetchNews(query);

    curSelectNav.classList.remove('active');
    curSelectNav = null;

    // console.log(searchText);
})

