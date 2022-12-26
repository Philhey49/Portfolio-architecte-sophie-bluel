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
            localStorage.setItem('filters', a.href, a.innerHTML);
            categories.appendChild(button); 
            button.appendChild(a);
        });  
    })
    ;



    