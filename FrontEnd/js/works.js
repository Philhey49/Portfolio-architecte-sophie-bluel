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
	let category = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
	console.log(category);
	
	if (category == localStorage.getItem('name1')){//Objets

	}
	else if (category == localStorage.getItem('name2')){//Appartements

	}
	else if (category == localStorage.getItem('name3')){//Hotels &amp; restaurants

	}
	else {//Tous

	};

})
;













