import { Ticker } from "./Ticker.mjs";

export class User {
	constructor(name) {
		this.name = name;
		this.portfolio = {};
	}

	update(publisher) {
		const { ticker, price } = publisher.stockInfo;
		const oldPrice = this.portfolio[ticker].price;

		this.portfolio[ticker].price = price;

		if (price > oldPrice) {
			this.sellStock(publisher.stockInfo.ticker, 1, publisher);
			console.log(
				`${this.name} sold 1 share of ${publisher.stockInfo.ticker}`
			);
		}
		if (price < oldPrice) {
			this.buyStock(publisher.stockInfo.ticker, 1, publisher);
			console.log(
				`${this.name} bought 1 share of ${publisher.stockInfo.ticker}`
			);
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
		this.portfolio[ticker].numberOfShares += numberOfShares;
	}

	sellStock(ticker, numberOfShares, publisher) {
		if (!this.portfolio.hasOwnProperty(ticker)) return;
		if (this.portfolio[ticker].numberOfShares < numberOfShares) {
			throw new Error("Trying to sell more than owned!");
		}
		this.portfolio[ticker].numberOfShares -= numberOfShares;

		// Unsubscribe if the user doesn't own this share after the sell
		if (this.portfolio[ticker].numberOfShares == 0) {
			publisher.unsubscribe(this);
			delete this.portfolio[ticker];
		}
	}
}
