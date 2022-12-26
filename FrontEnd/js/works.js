fetch('http://localhost:5678/api/works')
.then(function(res) 
{
	if (res.ok) 
	{
	return res.json();
	}
})
.then(function(projects) 
{
	projects.forEach(project => 
	{
		const gallery = document.getElementById('room');
		let figure = document.createElement('figure');
		let img = document.createElement('img');
		let figcaption = document.createElement('figcaption');
		img.src = project.imageUrl;
		img.setAttribute("crossorigin", "anonymous");
		img.alt = project.title;
		figcaption.innerHTML = `${project.title}`;
		gallery.appendChild(figure);
		figure.appendChild(img);
		figure.appendChild(figcaption);
	});
	localStorage.getItem('filters');
	let category = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
	let name = a.innerHTML;
	figure.appendChild(category);
	category.appendChild(name);
	let result = category.filter( (element) => element == 'Tous' );
	console.log(result);
})
;













