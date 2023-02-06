
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
			let deleteButton = document.createElement('button');
			deleteButton.classList.add('delete');
			deleteButton.innerHTML = '&#128465;';
			let modalfigcaption = document.createElement('figcaption');
			modalimg.src = project.imageUrl;
			modalimg.setAttribute("crossorigin", "anonymous");
			modalimg.alt = project.title;
			modalfigcaption.innerHTML = `éditer`;
			modalgallery.appendChild(modalfigure);
			modalfigure.appendChild(deleteButton);
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
			document.addEventListener('#modal1').forEach(a => {
				a.addEventListener('click', openModal)
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

	let modal = null
	const focusableSelector = 'button, a, input,textarea'
	let focusables = []
	let previouslyFocusedElement = null

	const openModal = function(e) {
		e.preventDefault()
		modal = document.querySelector(e.target.getAttribute('href'))
		focusables = Array.from(modal.querySelectorAll(focusableSelector))
		previouslyFocusedElement = document.querySelector(':focus')
		focusables[0].focus()
		modal.style.display = null
		modal.removeAttribute('aria-hidden')
		modal.setAttribute('aria-modal', true)
		modal.addEventListener('click', closeModal)
		modal.querySelector('js-modal-close').addEventListener('click', closeModal)
		modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
	}

	const closeModal = function (e) {
		if (modal === null) return
		if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
		e.preventDefault()
		modal.style.display = "none"
		modal.setAttribute('aria-hidden', true)
		modal.removeAttribute('aria-modal')
		modal.removeEventListener('click', closeModal)
		modal.querySelector('js-modal-close').removeEventListener('click', closeModal)
		modal.querySelector('js-modal-stop').removeEventListener('click', stopPropagation)
		modal = null
	}

	const stopPropagation = function (e) {
		e.stopPropagation()
	}

	const focusInModal = function(e) {
		e.preventDefault()
		let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
		if (e.shiftKey === true) {
			index--
		} else {
			index++
		}
		if (index >= focusables.length) {
			index = 0
		}
		if (index < 0) {
			index = focusables.length - 1
		}
		focusables[index].focus()

	}



	/*document.querySelector('#modal1').addEventListener('click', openModal  {
		classList.remove('hide-admin')
	})*/

	window.addEventListener('keydown', function(e) {
		if (e.key === "Escape" || e.key === "Esc") {
			closeModal(e)
		}
		if (e.key === "Tab" && modal !== null) {
			focusInModal(e)
		}
	})
	










