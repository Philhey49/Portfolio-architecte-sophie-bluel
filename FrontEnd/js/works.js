
const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false
const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : false

fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(projects => {
	
	const gallery = document.querySelector('#room');
	const modalgallery = document.getElementById('modalroom');
		
		projects.forEach(project => {
			gallery.innerHTML += `
				<figure class="project-item" data-cat="${project.categoryId}" data-id="${project.id}">
					<img src="${project.imageUrl}" crossorigin anonymous alt="${project.title}">
					<figcaption>${project.title}</figcaption>
				</figure>
			`

		// S'il est admin, charger les images dans la popup egalement
		if (token && userId) {

			modalgallery.innerHTML += `
				<figure class="project-item" data-cat="${project.categoryId}" id="${project.id}">
					<div class="action-options">
						<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
						<button class="action-item delete-item" data-id=${project.id}><i class="fa-regular fa-trash-can"></i></button>
					</div>
					<img class="imggallery" src="${project.imageUrl}" crossorigin anonymous alt="${project.title}" />
					<figcaption>éditer</figcaption>
				</figure>
			`

		}
	});

	/* Suppression d'un projet */
	document.querySelectorAll('.delete-item').forEach(deleteButton => {
		deleteButton.addEventListener('click', () => {

			let idProject = deleteButton.getAttribute('data-id')

			fetch(`http://localhost:5678/api/works/${idProject}`, {
					method: 'delete',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				})
				.then(() => {
					deleteButton.closest('figure').remove()
					document.querySelector(`.project-item[data-id="${deleteButton.getAttribute('data-id')}"]`).remove()
					document.querySelector('.modal').classList.add('hide-modal')
				})
				.catch(err => console.log(err))
		})

	})

});

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
		
			document.querySelector('#popup-add-category').innerHTML += `<option value="${cat.id}">${cat.name}</option>`

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

/* Au click sur l'ajout d'un projet */
document.querySelector('#addbutton').addEventListener('click', (e) => {

	const formData = new FormData();
	const image = document.querySelector('input[type="file"]').files[0];
	const title = document.querySelector('input[name="title"]').value;
	const category = document.querySelector('#popup-add-category').value;
	
	formData.append('image', image);
	formData.append('title', title);
	formData.append('category', category);
	//const addmodalphoto = document.querySelector('.addmodalphoto');
	//addmodalphoto.innerHTML = '';

	console.log(formData.get('image'), formData.get('title'), formData.get('category'))

	if(
		formData.get('image') === 'undefined' ||
		formData.get('title') === '' ||
		formData.get('category') === '0'
	) {
		alert('Veuillez compléter correctement les champs demandé')
	} else {
		fetch('http://localhost:5678/api/works/',{
			method: 'POST',
			headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}`},
			body: formData
		})
		.then(res => res.json())
		.then(data => {

			// Fermeture de la modale
			document.querySelectorAll('.modal').forEach(item => {
				item.classList.add("hide-modal")
			})

			// Ajout du projet dans la grille de projet
			document.querySelector('#room').innerHTML += `
				<figure class="project-item" data-cat="${data.categoryId}" data-id="${data.id}">
					<img src="${data.imageUrl}" crossorigin anonymous alt="${data.title}">
					<figcaption>${data.title}</figcaption>
				</figure>
			`

			// Ajout du projet dans la grille de la modal
			document.getElementById('modalroom').innerHTML += `
				<figure class="project-item" data-cat="${data.categoryId}" id="${data.id}">
					<div class="action-options">
						<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
						<button class="action-item delete-item" data-id=${data.id}><i class="fa-regular fa-trash-can"></i></button>
					</div>
					<img class="imggallery" src="${data.imageUrl}" crossorigin anonymous alt="${data.title}" />
					<figcaption>éditer</figcaption>
				</figure>
			`
		})
		.catch(err => console.log(err))
	}
});

// On empeche le formulaire d'ajout de se soumettre
document.querySelector('#addWorkForm').addEventListener('submit', (e) => e.preventDefault())

// On controle les champs du formulaire
document.querySelectorAll('#addWorkForm input').forEach(item => {
	item.addEventListener('change', () => validateAddForm())
})
document.querySelector('#addWorkForm select').addEventListener('change', () => validateAddForm())

function validateAddForm() {
	const image = document.querySelector('input[type="file"]').files[0];
	const title = document.querySelector('input[name="title"]').value;
	const category = document.querySelector('#popup-add-category').value;

	if(
		image !== 'undefined' &&
		title !== '' &&
		category !== '0'
	) {
		// On change la couleur du bouton
		document.querySelector('#addbutton').classList.add('validateAddButton')
	} else {
		document.querySelector('#addbutton').classList.remove('validateAddButton')
	}
}
const logout = document.querySelector('ul li:nth-child(4)')
logout.addEventListener('click', function() {
	localStorage.clear('access_token')
    localStorage.clear('userId')
	token === 0
	userId === 0
	document.querySelectorAll('.admin').forEach(item => {
		item.classList.add('hide-admin')
	});
	document.querySelectorAll('.not-hide').forEach(item => {
		item.classList.remove('hide-admin')	
	});
}) 

// ECOUTE DU CHANGEMENT DE L'IMAGE
let addImageInput = document.querySelector('#add-photo-input')

addImageInput.addEventListener('change', () => {
	const image = addImageInput.files[0]
	const imageUrl = URL.createObjectURL(image)
	
	document.querySelector('#add-image-preview').innerHTML = `<img src="${imageUrl}" />`
	document.querySelectorAll('span').forEach(item => {
		item.hidden = "true"
	})
})





