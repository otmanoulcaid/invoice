import FactureService from "../services/facture.service.js";

const factureService = new FactureService();

export const getAll = async (req, res) => {
    try {
        const factures = await factureService.getAllFactures();
        res.status(200).send(factures);
    } catch (error) {
        console.error("Erreur getAll:", error);
        res.status(500).send({ message: "Erreur serveur lors de la récupération des factures" });
    }
};

export const getByNumber = async (req, res) => {
    try {
        const facture = await factureService.getFactureByNumber(req.params.numero);
        if (!facture)
            return res.status(404).send({ message: "Facture non trouvée" });

        res.status(200).send(facture);
    } catch (error) {
        console.error("Erreur getById:", error);
        res.status(500).send({ message: "Erreur serveur lors de la récupération de la facture" });
    }
};

export const create = async (req, res) => {
    try {
        const created = await factureService.createFacture(req.body);
        res.status(201).send(created);
    } catch (error) {
        console.error("Erreur create:", error);
        res.status(500).send({ message: "Erreur serveur lors de la création de la facture" });
    }
};

export const update = async (req, res) => {
    try {
        await factureService.updateFacture(req.params.numero, req.body);
        res.status(200).send({ message: "updated"});
    } catch (error) {
        console.error("Erreur update:", error);
        res.status(500).send({ message: "Erreur serveur lors de la mise à jour de la facture" });
    }
};

export const remove = async (req, res) => {
    try {
        await factureService.deleteFacture(req.params.numero);
        res.status(200).send({ message: "Facture supprimée avec succès" });
    } catch (error) {
        console.error("Erreur remove:", error);
        res.status(500).send({ message: "Erreur serveur lors de la suppression de la facture" });
    }
};
