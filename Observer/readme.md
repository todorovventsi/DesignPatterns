# Design patterns - Observer pattern example

## Description

> Simulated app for financial markets data interaction (change in stock price)\
> Observation pattern is impimented via "PriceActionPublisher" class and its "observers"\
> The purpuse of the "publisher" it to store information of its own state, the subscribed observers and to signal them when a change in state occurs. Observers on the other hand reacts to this changes.

---

### PriceActionPublisher class

> register -> array for storing observers\
> stockInfo -> publisher state, object {ticker, price}\
> .subscribe() -> adds observer to the register\
> .unsubscribe() -> remove observer to the register\
> .notifyObserver() -> loops through the subscribed observers and call their update() method, sending the new \state
> .updatePrice() -> used to simulate change in state

---

### User class

#### Properties

> name -> user name\
> portfolio -> storing information about the user's owned stocks, object {TICKER: {numberOfShares, price}}

#### Methods

> .buyStock(ticker, numberOfShares, publisher) -> increase the number of shares of the specified stock and register the user to observe for changes in its price if it is its first buy of this stock\
> .sellStock(ticker, numberOfShares, publishers) - decrease the number of shares of the specified stock and unsubscribe the user if there are no more stock of this ticker\
> .update(publisher) -> reacts to change signal send by the publisher, according to the change

---

### Ticker class

> Stores information about number of shares user owns and its price
> .getTotalSharesValue() -> getter, returns total value of the shares from a company user owns
