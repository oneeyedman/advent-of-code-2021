const NEW_LINE = '\n';
const DIVIDER = `${NEW_LINE}--${NEW_LINE}`;


function getPuzzle(puzzleURL) {
	return fetch(puzzleURL)
		.then(res => res.text())
		.then(puzzle => {
			const parts = puzzle.split(DIVIDER)
				.filter(Boolean);
			const [bingo_numbers] = parts.splice(0,1);

			const raw_boards = parts.map(board => {
				return board
					.replaceAll('  ',' ')
					.replaceAll(' ', ',')
					.split(NEW_LINE)
					.filter(Boolean)
					.map(item => item.split(',').filter(Boolean).map(Number));
			});

			return {
				bingo_numbers: bingo_numbers.split(',').map(Number),
				raw_boards
			};
		}
		);
}




export {
	getPuzzle
};
