(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

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

    });

    function addImage(){
        let data = JSON.parse(this.responseText);
        let imageUrl = data.results[0].links.download;
        responseContainer.insertAdjacentHTML('afterbegin', `<img src=${imageUrl} alt=${searchedForText} + " Picture" width="500px" height="300px"/>`);
        console.log(data);
    }

    function addImageError(){
        responseContainer.insertAdjacentHTML('beforeend', `<p>Could not find any photo by name ${searchedForText}</p>`);
    }

    function addArticle(){
        let data = JSON.parse(this.responseText);
        responseContainer.insertAdjacentHTML('beforeend', `<p>${data.response.docs[0].lead_paragraph}</p>`);
        console.log(data);
    }

    function addArticleError(){
        responseContainer.insertAdjacentHTML('beforeend', `<p>Could not find any article by name ${searchedForText}</p>`);
    }

})();
