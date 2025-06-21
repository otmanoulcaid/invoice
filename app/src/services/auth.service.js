import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';
import ClientService from './client.service.js';

export class AuthService
{
    constructor()
    {
        this.userService = new ClientService()
    }

    async authenticate(name)
    {
        return await this.userService.getClientByName(name)
    }

    decodeToken(token)
    {
        try {
            return jwt.verify(token, env.jwt.secret);
        } catch (err) {
            return null;
        }
    }

    isProtectedRoute(uri)
    {
        const publicRoutes = ['/signin', '/logout'];
        return !publicRoutes.includes(uri);
    }

    generateToken(payload)
    {
        return jwt.sign(payload, env.jwt.secret, {
            expiresIn: env.jwt.expiration
        });
    }
}
