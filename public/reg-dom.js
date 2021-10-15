document.addEventListener('DOMContentLoaded', function() {
	let theError = document.querySelector('.errors');

	if (theError.innerHTML !== '') {
		setTimeout(function() {
			theError.innerHTML = '';

		}, 4250);
	}
});

document.addEventListener('DOMContentLoaded', function() {
	let theSuccess = document.querySelector('.success');

	if (theSuccess.innerHTML !== '') {
		setTimeout(function() {
			theSuccess.innerHTML = '';

		}, 4250);
	}
});