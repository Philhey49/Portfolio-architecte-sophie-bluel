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
        choices.forEach(choice => 
        {
            const categories = document.getElementById('choices');
            let button = document.createElement('button');
            let a = document.createElement('a');
            button.id = `${choice.id}`; 
            a.innerHTML = `${choice.name}`;
            categories.appendChild(button); 
            button.appendChild(a);
        });  
    });

    