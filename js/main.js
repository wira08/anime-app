let request 	  = new XMLHttpRequest();
let button  	  = document.getElementById('searchBtn');
let input   	  = document.getElementById('searchInput');
let list    	  = document.getElementById('anime-list');
let baseUrl 	  = 'https://api.jikan.moe/v3/search/anime?q=';


request.onreadystatechange = function() {
	if (this.readyState === 4 && this.status === 200) {
		console.log('Status:', this.status);
		response = JSON.parse(this.responseText);
		console.log(response.results);

		list.innerHTML = '';
		
		let results = response.results;
		for (var i = 0; i < results.length; i++) {
			let listItem = document.createElement('li');
			let listImg = document.createElement('img');
			let listLink = document.createElement('a');
			let linkText = document.createTextNode('Read more');

			listImg.src = results[i].image_url;
			listLink.href = results[i].url;
			listLink.setAttribute('target', '_blank');

			listItem.innerHTML = '<h1>' + results[i].title + '</h1>' + 
			'<h3>Summary: </h3>' + results[i].synopsis + ' ';

			list.appendChild(listItem);
			listLink.appendChild(linkText);
			listItem.appendChild(listLink);
			list.appendChild(listImg);
		}
	}
}


button.addEventListener('click', sendRequest);

function sendRequest() {
	request.open('GET', baseUrl + input.value + '&limit=5');
	request.send();
}


