import { PriceActionPublisher } from "./PriceActionPublisher.mjs";
import { Newsletter } from "./Newsletter.mjs";

import { User } from "./User.mjs";

const publisherINTL = new PriceActionPublisher({ ticker: "INTL", price: 30 });
const publisherRIO = new PriceActionPublisher({ ticker: "RIO", price: 84 });
const publisherWBA = new PriceActionPublisher({ ticker: "WBA", price: 27 });

const ventsi = new User("Ventsi");
const john = new User("John");
const newsletter = new Newsletter();

//PLAYGROUND
ventsi.buyStock("RIO", 10, publisherRIO);
ventsi.buyStock("INTL", 10, publisherINTL);
ventsi.sellStock("RIO", 1, publisherINTL);

publisherRIO.updatePrice(60);
publisherRIO.updatePrice(90);

newsletter.followTickers([publisherINTL, publisherRIO, publisherWBA]);

publisherINTL.updatePrice(20);
publisherRIO.updatePrice(100);
publisherWBA.updatePrice(32);

console.log(ventsi.portfolio["RIO"].totalSharesValue);

console.log(publisherRIO.register);
