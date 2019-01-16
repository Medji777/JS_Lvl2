let xhr = new XMLHttpRequest();
xhr.open('GET', 'db.json', true);
xhr.onreadystatechange = function(){
  if(xhr.readyState !== 4){
      return;
  }
  if(xhr.status !== 200){
      console.log('Error', xhr.status, xhr.statusText);
  } else {
      console.log('Ok', xhr.responseText);
      let dbData = JSON.parse(xhr.responseText),
		  input = document.querySelector('.form_select'),
		  div = document.querySelector('.select_result'),
		  s = [];
	  dbData.forEach(function(node){
		  s.push(node.city);
	  });
	  
	  input.addEventListener('input', function() {
    	let reg = new RegExp('^' + this.value, 'i');
    	div.innerHTML = '';
    	div.style.visibility = "hidden"; 
    	if (this.value.length > 2){
    		for (let i = 0; i < s.length; i++) {
    			if (s[i].match(reg)) {
					let p = document.createElement('p');
					//let ps = `<p>${s[i]}</p>`;
					p.setAttribute('class', 'option_result');
					div.appendChild(p);
					p.innerHTML += s[i];
    				div.style.visibility = "visible";
					chek();
        		}
			}
    	}
	  }
	);
	  function chek(){
		  let ps = document.querySelectorAll('.option_result');
		  ps.forEach(function(n){
			n.addEventListener('click', function () {
    			input.value = this.innerText;
    			div.innerHTML = '';
    			div.style.visibility = "hidden";
	  		});
		  });
	  }
  }
};
xhr.send();