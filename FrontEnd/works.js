const gallery = document.getElementsByClassName('gallery');

function architect(element) {
    return document.createElement(element);
}
function append(parent, el) {
	return parent.appendChild(el);
  }

fetch("http://localhost:5678/api/works" 

.then(function(res) {
	if (res.ok) {
	return res.json();
	}
	}))
	.then(function(data) {
		let architects = data.results;
		return architects.map(function(architect) {
		  let id = architect('figure');
		  let image = architect('img');
		  let title = architect('figcaption');
		  image.src = id.imageUrl,
		  image.alt = id.title,
		  figcaption.innerHTML = `${id.title}`;
		  append(image, src);
		  append(image, alt);
		  append(id, image);
		  append(id, title);
		  append(gallery, id);
		})
	  })
	.catch(function(error) {
		console.log(error);
	  }),
	  {method: "GET",
	  headers: { 
	  'Accept': 'application/json', 
	  },
	  body: JSON.stringify(jsonBody)};