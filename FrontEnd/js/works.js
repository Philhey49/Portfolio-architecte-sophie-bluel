//import  monset  from './categories.js';
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
		console.log(project)
		const gallery = document.getElementById('room');
		let figure = document.createElement('figure');
		figure.setAttribute('data-cat', project.categoryId)
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

})
;

fetch('http://localhost:5678/api/categories')	
.then(function(res) 
{
	if (res.ok) 
	{
	return res.json();
	}
})
    .then(function(choices) 
    {	
		//console.log(choices)
        const categories = document.getElementById('choices');
		let allBtn = document.createElement('button')
		allBtn.innerHTML = "Tous"
		allBtn.setAttribute('data-cat', 0)
		categories.appendChild(allBtn);

        choices.forEach(choice => 
        {
			console.log(choice)
            let button = document.createElement('button');
            button.innerHTML = `${choice.name}`;
			button.setAttribute('data-cat', choice.id)
            categories.appendChild(button); 
			button.addEventListener('click', function(category) {
				var catPhoto = figure.getElementByTagName('img');
				var sortedPhotos = [];
				for (var i = 0; i < catPhoto.length; i++) {
					if (catPhoto[i].getAttribute('data-cat') === category || category === "Tous") {
						sortedPhotos.push(catPhoto[i]);
					}
				}
				for (var i = 0; i < sortedPhotos.length; i++) {
				  figure.appendChild(sortedPhotos[i]);
				}
			});
        }); 


    });











