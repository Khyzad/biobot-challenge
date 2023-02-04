import express, { Express, Request, Response } from 'express';
import { ShippingInfo } from './ShippingInfo';
import { AutoCompleter } from './Trie';
import cors from 'cors';

const shipping_data: ShippingInfo[] = require('../KITS_SHIPPING_DATA.json');

const app: Express = express();
const port = 3001;

let cache: AutoCompleter = new AutoCompleter();
cache.add(shipping_data);

const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.get('/api/autocomplete/:query', (req: Request, res: Response) => {
  // limit the size of the result to 10 and only return the label id to limit message size over the network
  let results = cache.find(req.params['query']);
  results.length = Math.min(results.length, 10);


  res.send(results.map((result) => result.label_id));
});

app.get('/api/search/:query', (req: Request, res: Response) => {
  // in theory this could fetch from a database. Results should be paginated and sanitized (ie remove primary key)
  let query: string = req.params['query'];
  if (query && query.length > 0) {
    res.send(cache.find(req.params['query']));
  }

  res.status(404).send([]);
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});