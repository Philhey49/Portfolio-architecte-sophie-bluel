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
		const gallery = document.getElementById('test');
		let figure = document.createElement('figure');
		let img = document.createElement('img');
		let figcaption = document.createElement('figcaption');
		let category = document.createElement('category')
		img.src = project.imageUrl;
		img.setAttribute("crossorigin", "anonymous");
		img.alt = project.title;
		figcaption.innerHTML = `${project.title}`;
		category.setAttribute("id", 1);
		category.setAttribute("name", "Objets");
		gallery.appendChild(figure);
		figure.appendChild(img);
		figure.appendChild(figcaption);
		figure.appendChild(category);
	});
});









