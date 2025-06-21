import { AuthService } from "../services/auth.service.js"

const authService = new AuthService()

export const login = async (req, res) =>
{
    const nom = req.body.nom

    if (!nom)
        return res.status(400).json({ message: "Le nom est requis" })

    try {
        const user = await authService.authenticate(nom)
        // logic of unregistred user wil be implemented later
        const token = authService.generateToken(user)

        res.cookie('token', token, { httpOnly: true })
        return res.status(200).json({ message: "Connexion réussie", user })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur" })
    }
}

export const logout = async (req, res) =>
{
    res.clearCookie('token')
    res.status(200).json({ message: "Déconnexion réussie" })
}
