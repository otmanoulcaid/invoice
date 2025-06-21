import Repository from '../repositories/repository.js';

export default class FactureService
{
    constructor()
    {
        this.factureRepo = new Repository('facture');
    }

    async createFacture(factureDto)
    {
        return await this.factureRepo.create(factureDto);
    }

    async getFactureByNumber(numero)
    {
        return await this.factureRepo.findBy({ numero });
    }

    async getAllFactures()
    {
        return await this.factureRepo.findAll();
    }

    async updateFacture(id, data)
    {
        return await this.factureRepo.update(id, data);
    }

    async deleteFacture(id)
    {
        return await this.factureRepo.delete(id);
    }

    async getFacturesByClientId(clientId)
    {
        return await this.factureRepo.findAll({ client_id: clientId });
    }
}
