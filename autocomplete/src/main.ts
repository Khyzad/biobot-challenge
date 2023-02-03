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
  origin: '*',//'http://localhost:3000',
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.get('/api/autocomplete/:query', (req: Request, res: Response) => {
  // limit the size of the result to 10
  let result = cache.find(req.params['query']);
  result.length = Math.min(result.length, 10);

  res.send(result);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});