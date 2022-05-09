document.querySelector('.addbox > textarea').addEventListener('onresize', function(e){
	console.log('haha');
});

function del(e) {
	e.target.parentNode.remove();
}

function chg(e) {
	e.target.parentNode.firstChild.readOnly ^= 1;
}

document.querySelector('.addbox > button').addEventListener('click', function(e){
	// submit
	let newel = document.createElement('div');
	newel.className += "d-flex task";

	let txt = document.createElement('input');
	txt.type = 'text';
	txt.value = e.target.parentNode.childNodes[1].value;
	e.target.parentNode.childNodes[1].value = '';
	txt.readOnly = true;

	let bt1 = document.createElement('button');
	bt1.type = "button";
	bt1.className += "btn btn-secondary";
	bt1.innerHTML="수정";
	bt1.addEventListener('click', chg);

	let bt2 = document.createElement('button');
	bt2.type = "button";
	bt2.className += "btn btn-danger";
	bt2.innerHTML="삭제";
	bt2.addEventListener('click', del);

	newel.appendChild(txt);
	newel.appendChild(bt1);
	newel.appendChild(bt2);
	document.querySelector('.taskcontainer').appendChild(newel);
});