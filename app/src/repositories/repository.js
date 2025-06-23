import database from "./sqlite.js";

export default class Repository
{
    constructor(table)
    {
        this.database = database       
        this.table = table;
    }

    async create(client)
    {
        return await database.insert(this.table, client);
    }

    async findBy(filter, ...fields)
    {
        return await database.getAll(this.table, filter, fields);
    }

    async findAll(...fields)
    {        
        return await database.getAll(this.table, null, fields);
    }

    async update(id, updatedData)
    { 
        await database.update(this.table, updatedData, id);
    }

    async delete(id)
    {
        return await database.delete(this.table, id);
    }
}
