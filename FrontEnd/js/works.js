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
	/*let category = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
	console.log(category);
	
	if (category == localStorage.getItem('name1')){//Objets

	}
	else if (category == localStorage.getItem('name2')){//Appartements

	}
	else if (category == localStorage.getItem('name3')){//Hotels &amp; restaurants

	}
	else {//Tous

	};*/

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
        const categories = document.getElementById('choices');
        const monSet = new Set();
        let all = "Tous";
        monSet.add(all).add(choices[0].name,).add(choices[1].name,).add(choices[2].name);
        monSet.forEach(title => 
        {
            let button = document.createElement('button');
            let a = document.createElement('a');
            button.id = `${title}`;
            a.href = "./works?id="+button.id;
            a.innerHTML = `${title}`;
			//button.addEventListener('click', catData);
            categories.appendChild(button); 
            button.appendChild(a);
        }); 
        console.log(monSet.values());

		/*const object = document.querySelector("#Objets");

		object.addEventListener('click',function catData() {
			const catObjets = projects.filter(function(project){
				return project.title;
			});
		})*/

		/*await const cat = projects.map(monSet => monSet.values);

		console.log(cat)
        let i = 0;
        category = new Array();
        for (let i = 0; i < 4; i++) {
            
        }
        console.log(category);*/

    });











