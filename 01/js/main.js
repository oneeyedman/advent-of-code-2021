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


function formatSlidingWindow(data) {
	const WINDOW_SIZE = 3;
	const slidingWindowData = [];

	for (let i = 0; i < data.length - (WINDOW_SIZE - 1); i++) {
		let measurement = 0;

		for (let j = 0; j < WINDOW_SIZE; j++) {
			measurement += data[i + j];
		}

		slidingWindowData.push(measurement);
	}

	return slidingWindowData;
}


function getNewTotalDephIncreases(data) {
	const result = formatSlidingWindow(data);
	return getTotalDepthIncreases(result);
}


async function test(input) {
	//const puzzle = (await getPuzzle(input)).map(Number);
}


writeResult(PUZZLE_URL, result1, getTotalDepthIncreases);
writeResult(PUZZLE_URL, result2, getNewTotalDephIncreases);
