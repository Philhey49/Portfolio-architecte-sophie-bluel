
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
			modalfigure.setAttribute('id', project.id);
			let modalimg = document.createElement('img');
			modalimg.classList.add('imggallery');

			let actionOptions = document.createElement('div');
			actionOptions.classList.add('action-options');
			actionOptions.innerHTML = `
				<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
				<button class="action-item delete-item" id=${modalfigure.id}><i class="fa-regular fa-trash-can"></i></button>`;
			actionOptions.addEventListener('click', (e) => {
				//let deleteButton = e.target;
					e.preventDefault()
					deleteWork(e)
					//document.getElementById(project.id).remove();
					  });
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

function deleteWork(e) {
	let idProject = parseInt(e.target.id)
	let deleteButton = e.target;
	fetch(`http://localhost:5678/api/works/${idProject}`, {
			method: 'DELETE',
			headers: {'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		.then(function (result) {
			if (result.ok) {
				return result.json()
			} else {
				throw new Error(result.error)
			}
		})
		.then(data => {
			console.log(data)
			deleteButton.closest('figure').remove()

		})
		.catch(err => console.log(err))
}

const addPhoto = document.querySelector('#addbutton');
addPhoto.addEventListener('click', (e) => {
	e.preventDefault();
	const formData = new FormData();
	const image = document.querySelector('input[type="file"]').files[0];
	const title = document.querySelector('input[name="title"]').value;
	const category = document.querySelector('#popup-add-category').value;
	
	formData.append('image', image);
	formData.append('title', title);
	formData.append('category', category);
	//const addmodalphoto = document.querySelector('.addmodalphoto');
	//addmodalphoto.innerHTML = '';
	
	fetch('http://localhost:5678/api/works/',{
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}`},
		body: formData
	})
	.then(function(res) 
	{
		if (res.ok) 
		{
			alert("Projet enregistré");
			return res.json();
		}
	})
	.then(data => {
		console.log(data)
		gallery.closest('figure').add()
	})
	.catch(err => console.log(err))
});

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
})



