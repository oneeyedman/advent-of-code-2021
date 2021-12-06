import { result1, result2, writeResult } from './dom.js';
import { getPuzzle } from './puzzle.js';
import { Board } from './templates.js';

// Input: https://adventofcode.com/2021/day/3/input
const PUZZLE_URL = 'data/data.txt';
const PUZZLE_URL_TEST = 'data/test-data.txt';


function checkBoard(board, number) {
	board.checkNumber(number);

	const result = {
		number,
		group: [],
		unchecked_sum: board.grid.flat().filter(cell => !cell.checked).reduce((acc, cell) => acc + cell.number,0)
	};

	const row = board.checkRows();
	const column = board.checkColumns();

	if (row.length) {
		result.group = row.map(i=>i.number).join();
		return result;
	}

	if (column.length) {
		result.group = column.map(i=>i.number).join();
		return result;
	}

	return result;
}

function startBingo(numbers, boards) {
	let bingoResult = 'No hay Bingo';

	for (const number of numbers) {
		for (const Board of boards) {
			const result = checkBoard(Board, number);

			if (result.group.length) {
				return result;
			}
		}
	}

	return bingoResult;
}


function bingo(data) {
	const {bingo_numbers, raw_boards} = data;
	const boards = raw_boards.map(board => new Board(board));
	const result = startBingo(bingo_numbers, boards);

	return result.number * result.unchecked_sum;
}





async function test(input) {
	const puzzle = await getPuzzle(input);
	const result = bingo(puzzle);

	console.log(result);
}

//test(PUZZLE_URL_TEST);
//test(PUZZLE_URL);





writeResult(PUZZLE_URL, result1, bingo); // 63424
// writeResult(PUZZLE_URL, result2, getLifeSupportRating); //
