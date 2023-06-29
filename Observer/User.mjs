import { Ticker } from "./Ticker.mjs";

export class User {
	constructor(name) {
		this.name = name;
		this.portfolio = {};
	}

	update(publisher) {
		const ticker = publisher.stockInfo.ticker;
		const oldPrice = this.portfolio[ticker].price;
		const newPrice = publisher.stockInfo.price;

		this.portfolio[ticker].price = newPrice;

		if (newPrice > oldPrice) {
			this.sellStock(publisher.ticker, 1, publisher);
			console.log(`${this.name} sold 1 share of ${publisher.ticker}`);
		}
		if (newPrice < oldPrice) {
			this.buyStock(publisher.ticker, 1, publisher);
			console.log(`${this.name} bought 1 share of ${publisher.ticker}`);
		}
	}

	buyStock(ticker, numberOfShares, publisher) {
		if (!this.portfolio.hasOwnProperty(ticker)) {
			this.portfolio[ticker] = new Ticker(
				numberOfShares,
				publisher.stockInfo.price
			);
			// Subscribing user if it is a first buy
			publisher.subscribe(this);
			return;
		}
		this.portfolio[ticker] += numberOfShares;
	}

	sellStock(ticker, numberOfShares, publisher) {
		if (!this.portfolio.hasOwnProperty(ticker)) return;
		if (this.portfolio[ticker].numberOfShares < numberOfShares) {
			throw new Error("Trying to sell more than owned!");
		}
		this.portfolio[ticker].numberOfShares -= numberOfShares;

		// Unsubscribe if the user doesn't own this share after the sell
		publisher.unsubscribe(this);
	}
}
