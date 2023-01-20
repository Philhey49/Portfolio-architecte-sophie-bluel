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
		console.log(choices)
        const categories = document.getElementById('choices');
        // const monSet = new Set();
        // let all = "Tous";
        // monSet.add(all).add(choices[0].name,).add(choices[1].name,).add(choices[2].name);
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
            // let a = document.createElement('a');
            // button.id = `${title}`;
            // a.href = "./works?id="+button.id;
            categories.appendChild(button); 
            // button.appendChild(a);

			button.addEventListener('click', function() {
				
			});
        }); 
        // console.log(monSet.values());

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











