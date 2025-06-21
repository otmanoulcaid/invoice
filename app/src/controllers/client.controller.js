import ClientService from "../services/client.service.js";

const clientService = new ClientService();

export const getAll = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.send(clients);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const getByName = async (req, res) => {
    try {
        const client = await clientService.getClientByName(req.params.nom);
        res.send(client);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const created = await clientService.createClient(req.body);
        res.status(201).send(created);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updated = await clientService.updateClient(req.params.nom, req.body);
        res.send(updated);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const result = await clientService.deleteClient(req.params.nom);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
