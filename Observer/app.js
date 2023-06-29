import { PriceActionPublisher } from "./PriceActionPublisher.mjs";
import { User } from "./User.mjs";

const publisherINTL = new PriceActionPublisher({ ticker: "INTL", price: 30 });
const publisherRIO = new PriceActionPublisher({ ticker: "RIO", price: 84 });
const publisherWBA = new PriceActionPublisher({ ticker: "WBA", price: 27 });

const ventsi = new User("Ventsi");
const john = new User("John");

ventsi.buyStock("RIO", 10, publisherRIO);
ventsi.buyStock("INTL", 10, publisherINTL);
ventsi.sellStock("RIO", 1, publisherINTL);

console.log(ventsi.portfolio["RIO"].totalSharesValue);

publisherRIO.updatePrice(60);
publisherRIO.updatePrice(90);
