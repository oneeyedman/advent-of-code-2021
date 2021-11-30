import { result1, result2, writeResult } from './dom.js';

// Input: https://adventofcode.com/2021/day/1/input
const puzzleURL = 'data/data.txt';


const arrToFuel = (fuel, acc) => fuel + acc;


const calculateRequiredFuelPerMass = mass => Math.floor(mass/3) - 2;


const calculateRequiredFuel = samples => samples.map(moduleMass => calculateRequiredFuelPerMass(moduleMass)).reduce(arrToFuel);


const calculateExtraFuel = totalFuel => {
	const extraFuel = [];
	let fuel = calculateRequiredFuelPerMass(totalFuel);
	while (fuel > 0) {
		extraFuel.push(fuel);
		fuel = calculateRequiredFuelPerMass(fuel);
	}
	return extraFuel.reduce(arrToFuel);
};


const calculateTotalRequiredFuel = samples => {
	const result = samples.map(sample => calculateExtraFuel(sample)).reduce(arrToFuel);
	return result;
};





// writeResult(puzzleURL, result1, calculateRequiredFuel);
// writeResult(puzzleURL, result2, calculateTotalRequiredFuel);
