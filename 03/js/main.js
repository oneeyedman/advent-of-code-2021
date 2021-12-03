import { result1, result2, writeResult, getPuzzle } from './dom.js';

// Input: https://adventofcode.com/2021/day/3/input
const PUZZLE_URL = 'data/data.txt';
const PUZZLE_URL_TEST = 'data/test-data.txt';

function getMasterBinaryArray(data) {
	const ones = new Array(data[0].length).fill(0);
	const zeroes = new Array(data[0].length).fill(0);

	for (const bin of data) {
		for (let i = 0; i < bin.length; i++) {
			if (bin[i] === 1) { ones[i] += 1; }
			if (bin[i] === 0) { zeroes[i] += 1; }
		}
	}

	return {ones, zeroes};
}


function getRates(data) {
	const {ones, zeroes} = data;
	const gamma = [];

	for (let i=0; i<ones.length; i++) {
		gamma.push(ones[i] >= zeroes[i] ? 1 : 0);
	}

	const epsilon = gamma.map(b => b === 1 ? 0 : 1);
	return {
		gamma: {
			bin: gamma.join(''),
			dec: parseInt(gamma.join(''), 2)
		},
		epsilon: {
			bin: epsilon.join(''),
			dec: parseInt(epsilon.join(''), 2)
		}
	};
}


function getPowerConsumption(data) {

	const masterBinaryArray = getMasterBinaryArray(data);
	const rates = getRates(masterBinaryArray);
	return rates.gamma.dec * rates.epsilon.dec;
}


async function test(input) {
	const puzzle = await getPuzzle(input);
}


// test(PUZZLE_URL_TEST);
// test(PUZZLE_URL);



writeResult(PUZZLE_URL, result1, getPowerConsumption);
// writeResult(PUZZLE_URL, result2, multiplyImprovedPositions);
