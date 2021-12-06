class Board {
	constructor(input) {
		this.input = input;
		this.size = input[0].length;
		// this.grid = this.createGrid();
		this.grid = input.map(line => line.map(number => {
			return {number, checked: false};}));
	}

	createGrid() {
		const grid = [];
		for (let i = 0; i < this.size; i++) {
			const line = this.input.slice(i * this.size, (i+1)*this.size);
			grid.push(line);
		}
		return grid.map(line => line.map(number => {
			return {number, checked: false};
		}));
	}

	getListCheck(list) {
		const checked = list.filter(item => item.checked).length;
		if (checked === this.size) return list;
		return [];
	}

	checkRows() {
		for (const line of this.grid) {
			const result = this.getListCheck(line);
			if (result.length) {
				return result;
			}
		}

		return [];
	}

	checkColumns() {
		for (let i = 0; i < this.size; i++) {
			const line = [];
			for (let y = 0; y < this.size; y++) {
				line.push(this.grid[y][i]);
			}
			const result = this.getListCheck(line);
			if (result.length) {
				return result;
			}
		}

		return [];
	}

	checkNumber(number) {
		for (const line of this.grid) {
			for (const cell of line) {
				if (cell.number === number) cell.checked = true;
			}
		}
	}
}





export {
	Board
};
