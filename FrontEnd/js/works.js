
const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false
const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : false

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

		// S'il est admin, charger les images dans la popup egalement
		if (token && userId) {
			const modalgallery = document.getElementById('modalroom');
			let modalfigure = document.createElement('figure');
			modalfigure.classList.add('project-item');
			modalfigure.setAttribute('data-cat', project.categoryId);
			let modalimg = document.createElement('img');
			modalimg.classList.add('imggallery')

			let actionOptions = document.createElement('div')
			actionOptions.classList.add('action-options')
			actionOptions.innerHTML = `
				<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
				<button class="action-item"><i class="fa-regular fa-trash-can"></i></button>
			`

			let modalfigcaption = document.createElement('figcaption');
			modalimg.src = project.imageUrl;
			modalimg.setAttribute("crossorigin", "anonymous");
			modalimg.alt = project.title;
			modalfigcaption.innerHTML = `éditer`;
			modalgallery.appendChild(modalfigure);
			modalfigure.appendChild(actionOptions);
			modalfigure.appendChild(modalimg);
			modalfigure.appendChild(modalfigcaption);

		}
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
		// SELECT DES CATEGORIES
		choices.forEach(function(cat) {
		
			document.querySelector('#popup-add-category').innerHTML += `<option data-cat="${cat.id}">${cat.name}</option>`

		})

		// AFFICHAGE DES CATEGORIES + GESTION DU CLICK

        const categories = document.getElementById('choices');

        choices.forEach(choice => 
        {
			let button = document.createElement('button');
            button.innerHTML = `${choice.name}`;
			button.setAttribute('data-cat', choice.id)
			choice.id === 0 && button.classList.add('cat-active') 
            categories.appendChild(button); 

			
			button.addEventListener('click', function() {
				document.querySelector('.cat-active').classList.remove('cat-active')
				button.classList.add('cat-active')
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

	document.addEventListener('DOMContentLoaded', () => {

		if (token && userId) {
			document.querySelectorAll('.admin').forEach(item => {
				item.classList.remove('hide-admin')	
	
			});
			document.querySelectorAll('.not-hide').forEach(item => {
				item.classList.add('hide-admin')	
			});
		} else {
			document.querySelectorAll('.admin').forEach(item => {
				item.classList.add('hide-admin')
			});
			document.querySelectorAll('.not-hide').forEach(item => {
				item.classList.remove('hide-admin')	
			});
		}
	})

	document.querySelectorAll('.open-modal').forEach( function(modalOpener) {
		modalOpener.addEventListener('click', function() {

			let popup = modalOpener.getAttribute('data-modal')

			if(document.querySelector(`#${popup}`)) {
				document.querySelector(`#${popup}`).classList.remove('hide-modal')
			} else {
				alert("Il n'y a pour l'instant aucune popup de connectée à ce bouton")
			}

		})
	})

	document.querySelector('#goToAddView').addEventListener('click', function() {
		document.querySelector('#galleryPhoto').classList.add('hide-article')
		document.querySelector('#addPhoto').classList.remove('hide-article')
	})

	document.querySelector('#return-to-projects').addEventListener('click', function() {
		document.querySelector('#galleryPhoto').classList.remove('hide-article')
		document.querySelector('#addPhoto').classList.add('hide-article')
	})


// Fermeture de la modal

document.querySelectorAll('.js-modal-close').forEach(function(item) {

	item.addEventListener('click', function() {
		item.closest('.modal').classList.add("hide-modal")
	})

})

document.querySelectorAll('.modal').forEach(function(modal) {
	modal.addEventListener('click', function(event) {
		modal.closest('.modal').classList.add("hide-modal")
	})
})

document.querySelectorAll('.modal-wrapper').forEach(function(wrapper) {
	wrapper.addEventListener('click', function(event) {
		event.stopPropagation()
	})
})








