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

/**/
	//console.log(localStorage.length);
	
	for (let i = 0; i < 4; i++) {
		localStorage.getItem('id'+i);
		localStorage.getItem('name'+i);
		//console.log(localStorage["id"+i]);
		console.log(localStorage["name"+i]);
	}
	let category = document.getElementsByName('name'+i);
	console.log(category);

	//category.name = localStorage.getItem(a.innerHTML);
	//category = localStorage.getItem('onglet');



	if (category == localStorage.getItem('name1')){//Objets

	}
	else if (category == localStorage.getItem('name2')){//Appartements

	}
	else if (category == localStorage.getItem('name3')){//Hotels &amp; restaurants

	}
	else {//Tous

	};



	//let category = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
	//figure.appendChild(category);
	//let result;
	//result = category.filter( (element) => element == 'Tous' );
	//result = category.filter( (element) => element == localStorage.getItem('name0') );
	//console.log(result);
})
;













