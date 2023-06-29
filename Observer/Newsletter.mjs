export class Newsletter {
	update(publisher) {
		const msg = `${publisher.stockInfo.ticker} has changed its price to ${publisher.stockInfo.price}`;
		console.log(msg);
	}

	followTickers(tickers) {
		tickers.forEach((ticker) => ticker.subscribe(this));
	}
}
