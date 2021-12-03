
const page = document.querySelector('.js__page');
const result1 = page.querySelector('#result-1');
const result2 = page.querySelector('#result-2');


function getPuzzle(puzzleURL) {
	return fetch(puzzleURL)
		.then(res => res.text())
		.then(puzzle => puzzle.split('\n')
			.filter(Boolean)
			.map(bin => bin.split('').map(Number))
		);
}


async function writeResult(dataURL, element, fn) {
	const input = await getPuzzle(dataURL);
	element.innerHTML = fn(input);
}





export {
	result1,
	result2,
	writeResult,
	getPuzzle
};
