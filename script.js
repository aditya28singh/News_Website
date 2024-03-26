const API_KEY = "9030f32b8c7c4de6bbf0ed75019e20b1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
  window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    //console.log(data);
  bindData(data.articles);
}


function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML= ''; //to clear data after refresh and get new cards o/w it will create pile

    articles.forEach(article => {
         if(!article.urlToImage) return;
         const cardClone = newsCardTemplate.content.cloneNode(true); //to create clone of divs(news cards) inside the template
         fillDataInCard(cardClone, article);
         cardsContainer.appendChild(cardClone);
        });
}


function fillDataInCard(cardClone, article){
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  //newsSource.

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", ()=>{
    window.open(article.url, "_blank");
  });
}


let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click" , () => {
    const query = searchText.value;
    if (!query) return ;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});
