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
        let i = 0;
        monSet.forEach(title => 
        {
            let button = document.createElement('button');
            let a = document.createElement('a');
            button.id = `${title}`;
            a.href = "./works?id="+button.id;
            a.innerHTML = `${title}`;
            categories.appendChild(button); 
            button.appendChild(a);

            
            if(i < 4){
                localStorage.setItem('id' + i, a.href);//'filters'
                localStorage.setItem('name' + i, a.innerHTML);
                i++;
            }
            //localStorage.setItem('onglet', a.innerHTML);
            
        });  
       
        function tableau (){
  
        };

    }
    /*
            if(i < 4){
                localStorage.setItem('id' + i, a.href);//'filters'
                localStorage.setItem('name' + i, a.innerHTML);
                i++;
            }
            localStorage.setItem('onglet', a.innerHTML);
    */
    
    )
    
    ;



    