const gallery = document.getElementsByClassName('gallery');

const figure = document.createElement('figure');

function res() {
	let id = document.createElement('figure');
	let image = document.createElement('img');
	let title = document.createElement('figcaption');
	image.src = id.imageUrl;
	image.alt = id.title;
	title.innerHTML = `${id.title}`;
	figure.appendChild(title);
	figure.appendChild(image);
	figure.appendChild(id);
}
res();

fetch("http://localhost:5678/api/works")	
.then(function(res) {
if (res.ok) {
return res.json();
}
}),
{
method: "GET",
headers: { 
'Accept': 'application/json', 
}}



