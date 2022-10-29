(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetchData();
    });

    function fetchData(){
        let imageRequest = new XMLHttpRequest();
        imageRequest.open('get', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imageRequest.setRequestHeader('Authorization', 'Client-ID 7stfDjACsae1laOQzEhznppez0pHqSAbEsBahIAT75M');
        imageRequest.onload = addImage;
        imageRequest.onerror = addImageError;
        imageRequest.send();

        let articleRequest = new XMLHttpRequest();
        articleRequest.open('get', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=eMe3prlczKkIVldFk1anWrIFLbdlydEA`);
        articleRequest.onload = addArticle;
        articleRequest.onerror = addArticleError;
        articleRequest.send();
    }

    function addImage(){
        let data = JSON.parse(this.responseText);

        if(data && data.results && data.results[0]){
            let imageUrl = data.results[0].links.download;
            responseContainer.insertAdjacentHTML('afterbegin', `<img src=${imageUrl} alt=${searchedForText} + " Picture" width="500px" height="300px"/>`);
        }
        else{
            responseContainer.insertAdjacentHTML('afterbegin', `<p>Could not find any photo by name ${searchedForText}</p>`);
        }
    }

    function addImageError(){
        responseContainer.insertAdjacentHTML('beforeend', `<p>Could not find any photo by name ${searchedForText}</p>`);
    }

    function addArticle(){
        let data = JSON.parse(this.responseText);

        if(data && data.response && data.response.docs.length > 1){
            let articles = data.response.docs.map((article) => `<li><h3><a href=${article.web_url}>${article.headline.main}</a></h3><p>${article.lead_paragraph}</p></li>`)
            responseContainer.insertAdjacentHTML('beforeend', `<ul>${articles.join('')}</ul>`);
        }
        else{
            responseContainer.insertAdjacentHTML('beforeend', `<p style="color:red;">Could not find any article by name ${searchedForText}</p>`);
        }
    }

    function addArticleError(){
        responseContainer.insertAdjacentHTML('beforeend', `<p style="color:red;">Could not find any article by name ${searchedForText}</p>`);
    }

})();
