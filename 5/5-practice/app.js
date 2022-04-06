let t = document.querySelectorAll('.sm-img');
t.forEach( i => {
	i.addEventListener('click', function(event) {
		RemoveBig();
		i.classList.add('bg-img');
	});
});

function RemoveBig() {
	t.forEach( i => {
		i.classList.remove('bg-img');
	});
}