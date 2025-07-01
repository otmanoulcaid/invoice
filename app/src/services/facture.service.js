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

    async updateFacture(numero, data)
    {
        return await this.factureRepo.update(data, { numero });
    }

    async deleteFacture(numero)
    {
        return await this.factureRepo.delete({ numero });
    }

    async getFacturesByClientId(clientId)
    {
        return await this.factureRepo.findAll({ client_id: clientId });
    }
}
