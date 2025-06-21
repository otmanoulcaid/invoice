import Repository from "../repositories/repository.js";

export default class ClientService
{
    constructor()
    {
        this.clientRepo = new Repository('client');
    }

    async createClient(clientDto)
    {
        return await this.clientRepo.create(clientDto);
    }

    async getClientByName(nom)
    {
        return await this.clientRepo.findBy({ nom });
    }

    async getAllClients()
    {
        return await this.clientRepo.findAll();
    }

    async updateClient(nom, data)
    {
        console.log(nom);
        console.log(data);
        return await this.clientRepo.update({ nom }, data);
    }

    async deleteClient(id)
    {
        return await this.clientRepo.delete(id);
    }
}
