export class PriceActionPublisher {
	constructor(stockInfo) {
		this.register = []; // Register holding observers, subscribed for price change
		this.stockInfo = stockInfo; // Publisher state - object holding information about a company share price
	}

	subscribe(observer) {
		this.register.push(observer);
	}

	unsubscribe(observer) {
		this.register = this.register.filter((o) => o !== observer);
	}

	notifyUser() {
		this.register.forEach((observer) => {
			observer.update(this);
		});
	}

	updatePrice(change) {
		this.stockInfo.price = change;
		this.notifyUser();
	}
}
