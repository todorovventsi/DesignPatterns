export class Ticker {
	constructor(numberOfShares, price) {
		this.numberOfShares = numberOfShares;
		this.price = price;
	}

	get totalSharesValue() {
		return (this.numberOfShares * this.price).toFixed(2);
	}
}
