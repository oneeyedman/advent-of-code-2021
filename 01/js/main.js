import { result1, result2, writeResult, getPuzzle } from './dom.js';

// Input: https://adventofcode.com/2021/day/1/input
const PUZZLE_URL = 'data/data.txt';
const PUZZLE_URL_TEST = 'data/test-data.txt';


function mapTrendingDepths(data) {
	return data.map((depth, i) => {
		const diff = depth - data[i - 1];
		return {
			depth: depth,
			trend: i === 0 ? 0 : Math.sign(diff)
		};
	});
}


function getTotalDepthIncreases(data) {
	const trendingDepths = mapTrendingDepths(data);
	return trendingDepths.filter(item => item.trend === 1).length;
}


async function test(input) {

	const puzzle = await getPuzzle(input);
	const trendingDepths = mapTrendingDepths(puzzle);
	console.log(trendingDepths);
	console.log(getTotalDepthIncreases(puzzle));
}

// test(PUZZLE_URL_TEST);
// test(PUZZLE_URL);
writeResult(PUZZLE_URL, result1, getTotalDepthIncreases);
// writeResult(puzzleURL, result2, calculateTotalRequiredFuel);
