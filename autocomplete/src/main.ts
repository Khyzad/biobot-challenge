import express, { Express, Request, Response } from 'express';
import { ShippingInfo } from './ShippingInfo';
import { AutoCompleter } from './Trie';

const shipping_data: ShippingInfo[] = require('../KITS_SHIPPING_DATA.json');

const app: Express = express();
const port = 3000;

let cache: AutoCompleter = new AutoCompleter();
cache.add(shipping_data);

app.get('/api/autocomplete/:query', (req: Request, res: Response) => {
  // limit the size of the result to 10
  let result = cache.find(req.params['query']);
  result.length = Math.min(result.length, 10);
  
  res.send(result);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});