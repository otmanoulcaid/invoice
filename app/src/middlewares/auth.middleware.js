import { AuthService } from '../services/auth.service.js';

const authService = new AuthService()

export const auth = async (req, res, next) =>
{
    if (!authService.isProtectedRoute(req.url))
        next();

    const cookieHeader = req.headers.cookie;
    if (!cookieHeader)
        return res.status(401).send({ error: ' No token provided' });

    const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('='))
    );
    const token = cookies.token;
    if (!token)
        return res.status(401).send({ error: 'Token missing' });
    
    const decoded = authService.decodeToken(token);
    if (!decoded)
        return res.status(401).send({ error: 'Unauthorized' });

    req.user = decoded;
};
