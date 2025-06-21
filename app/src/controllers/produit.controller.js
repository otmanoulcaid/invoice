import ProduitService from "../services/produit.service.js";

const produitService = new ProduitService();

export const getAll = async (req, res) => {
    try {
        const produits = await produitService.getAllProduits();
            return res.send(produits);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getByName = async (req, res) => {
    try {
        const produit = await produitService.getProduitByName(req.params.nom);
        if (!produit) {
            return res.status(404).send({ error: "Produit not found" });
        }
        res.send(produit);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const newProduit = await produitService.createProduit(req.body);
        return res.status(201).send(newProduit);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedProduit = await produitService.updateProduit(req.params.nom, req.body);
        return res.send(updatedProduit);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const result = await produitService.deleteProduit(req.params.nom);
        return res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
