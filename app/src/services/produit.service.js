import Repository from '../repositories/repository.js';

export default class ProduitService
{
    constructor()
    {
        this.produitRepo = new Repository('produit');
    }

    async createProduit(produitDto)
    {
        return await this.produitRepo.create(produitDto);
    }

    async getProduitByName(nom)
    {
        return await this.produitRepo.findBy({ nom });
    }

    async getAllProduits()
    {
        return await this.produitRepo.findAll();
    }

    async updateProduit(nom, data)
    {
        return await this.produitRepo.update({ nom }, data);
    }

    async deleteProduit(nom)
    {
        return await this.produitRepo.delete({ nom });
    }
}
