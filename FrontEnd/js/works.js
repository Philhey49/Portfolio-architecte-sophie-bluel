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
		figure.classList.add('project-item');
		figure.setAttribute('data-cat', project.categoryId);
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
		choices.unshift({
			id: 0,
			name: 'Tous'
		})
        const categories = document.getElementById('choices');

        choices.forEach(choice => 
        {
			console.log(choice)
            let button = document.createElement('button');
            button.innerHTML = `${choice.name}`;
			button.setAttribute('data-cat', choice.id)
            categories.appendChild(button); 
			button.addEventListener('click', function() {
				let currentcategory = button.getAttribute('data-cat')
				let projects = document.querySelectorAll('.project-item')
				projects.forEach(function(item) {
					item.classList.remove('hide-work')
					if(
						item.getAttribute('data-cat') !== currentcategory && currentcategory !== '0'
						) {
						item.classList.add('hide-work')
					}
				})

			});
        }); 


    });
	
	/*function submitForm() {
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
	  
		fetch('http://localhost:5678/api/users/login'), {
			method: 'POST',
			body: JSON.stringify({email: email, password: password}),
			headers: { 'Content-Type': 'application/json' }
		}
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				// Connexion réussie
				window.location.assign('\FrontEnd\edit.html');
			} else {
				// Erreur d'identification
				alert("Erreur dans l`identifiant ou le mot de passe");
			}
		})
	};*/
	










