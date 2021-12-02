import { result1, result2, writeResult, getPuzzle } from './dom.js';

// Input: https://adventofcode.com/2021/day/2/input
const PUZZLE_URL = 'data/data.txt';
const PUZZLE_URL_TEST = 'data/test-data.txt';


function mergeCommand(data, name) {
	return data
		.filter(command => command.direction === name)
		.reduce((acc, command) => acc + command.steps, 0);
}


function calculatePosition(data) {
	const {forward, up, down} = groupPosition(data);
	return {horizontal: forward , depth: up - down};
}


function multiplyPositions(data) {
	const position = calculatePosition(data);
	return position.horizontal * Math.abs(position.depth);
}


function groupPosition(data) {
	const forward = mergeCommand(data, 'forward');
	const down = mergeCommand(data, 'down');
	const up = mergeCommand(data, 'up');

	return {forward, down, up};
}


function calculateImprovedPosition(data) {
	const position = {
		aim: 0,
		horizontal: 0,
		depth: 0,
	};

	for (const command of data) {
		const {direction, steps} = command;

		if (direction === 'down') {
			position.aim += steps;
		}

		if (direction === 'up') {
			position.aim -= steps;
		}

		if (direction === 'forward') {
			position.horizontal += steps;
			position.depth = position.aim !== 0 ? position.depth + position.aim * steps : position.depth;
		}
	}

	return position;
}


function multiplyImprovedPositions(data) {
	const position = calculateImprovedPosition(data);
	return position.horizontal * Math.abs(position.depth);
}


async function test(input) {
	// const puzzle = await getPuzzle(input);
}


// test(PUZZLE_URL_TEST);
// test(PUZZLE_URL);


writeResult(PUZZLE_URL, result1, multiplyPositions);
writeResult(PUZZLE_URL, result2, multiplyImprovedPositions);
