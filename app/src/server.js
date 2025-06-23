import express from 'express';
import cors from 'cors';
import factueRoute from './routes/facture.route.js'
import clientRoute from './routes/client.route.js'
import productRoute from './routes/produit.route.js'
import authRoute from './routes/auth.route.js'
import { auth } from './middlewares/auth.middleware.js';
import { env } from './config/env.config.js';

export class Server
{
    constructor() {
        this.port = env.server.port || 3003;
        this.host = env.server.host
        this.app = express();
        this.config();
        this.routes();
    }

    config ()
    {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors('*'));
        // this.app.use(auth)
    }

    routes ()
    {
        this.app.use('/api/auth', authRoute);
        this.app.use('/api/invoice', factueRoute);
        this.app.use('/api/client', clientRoute);
        this.app.use('/api/product', productRoute);
    }

    start (callback) {
        if (callback == undefined)
            callback = () => console.log(`Server is running on http://localhost:${this.port}`);
        this.app.listen(this.port, this.host, callback);
    }
}
