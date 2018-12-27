var btn1 = document.querySelector('#bt_1'),
	btn2 = document.querySelector('#bt_2'),
	div = document.createElement('div');
document.body.appendChild(div);
btn1.addEventListener('click', request);
btn2.addEventListener('click', request);
function request() {
	//var json = `./${this.id}.json`;
    var xhr = new XMLHttpRequest();
	//console.log(json);
    xhr.open('GET', `./${this.id}.json`, false);
    xhr.send();
    if (xhr.status !== 200) {
        console.log('Error', xhr.status, xhr.statusText)
    } else {
		//console.log('ok', xhr.responseText);
        var items = JSON.parse(xhr.responseText);
		console.log(items);
		for(var key in items){
			if (items[key].result == 'error') {
				console.log(items[key].result);
				div.innerText = 'massage: ' + items[key].result;
			}
			if (items[key].result == 'success') {
				console.log(items[key].result);
				div.innerText = 'massage: ' +  items[key].result;
			}
		}
        
    }
}

