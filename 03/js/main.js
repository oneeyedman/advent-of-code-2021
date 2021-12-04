import { result1, result2, writeResult, getPuzzle } from './dom.js';

// Input: https://adventofcode.com/2021/day/3/input
const PUZZLE_URL = 'data/data.txt';
const PUZZLE_URL_TEST = 'data/test-data.txt';


function getMasterBinaryArray(data) {
	const ones = new Array(data[0].length).fill(0);
	const zeros = new Array(data[0].length).fill(0);

	for (const bin of data) {
		for (let i = 0; i < bin.length; i++) {
			if (bin[i] === 1) ones[i]++;
			if (bin[i] === 0) zeros[i]++;
		}
	}

	return {ones, zeros};
}


function getRates(data) {
	const {ones, zeros} = getMasterBinaryArray(data);
	const gamma = [];

	for (let i=0; i<ones.length; i++) {
		gamma.push(ones[i] >= zeros[i] ? 1 : 0);
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
	const rates = getRates(data);
	return rates.gamma.dec * rates.epsilon.dec;
}



function getCommonBit(data, index, value) {
	let commonBit;
	const {ones, zeros} = getMasterBinaryArray(data);
	if (value === 'most') {
		commonBit = 1;
		if (zeros[index] > ones[index]) commonBit = 0;
	} else {
		commonBit = 0;
		if (zeros[index] > ones[index]) commonBit = 1;
	}

	return commonBit;
}


function getRating(data, index = 0, commonValue) {
	const commonBit = getCommonBit(data, index, commonValue);
	const filteredData = data.filter(bin => bin[index] === commonBit);
	if (filteredData.length === 1) {
		return parseInt(filteredData.flat().join(''), 2);
	}
	return getRating(filteredData, index + 1, commonValue);
}


function getLifeSupportRating(data) {
	const oxigenGeneratorRating = getRating(data, 0, 'most');
	const co2ScrubberRating = getRating(data, 0, 'least');
	return oxigenGeneratorRating * co2ScrubberRating;
}


async function test(input) {
	//const puzzle = await getPuzzle(input);
}

// test(PUZZLE_URL_TEST);
// test(PUZZLE_URL);



writeResult(PUZZLE_URL, result1, getPowerConsumption); // 3958484
writeResult(PUZZLE_URL, result2, getLifeSupportRating); // 1613181
