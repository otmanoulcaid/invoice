import ORM from "./sqlite.js";

export default class Repository
{
    static orm = null;
    constructor(table)
    {
        if (Repository.orm == null)
            ORM.getORMInstance().then(orm => Repository.orm = orm)
        this.table = table;
    }

    async create(client)
    {
        return await Repository.orm.insert(this.table, client);
    }

    async findBy(filter, ...fields)
    {
        return await Repository.orm.getOne(this.table, filter, fields);
    }

    async findAll(...fields)
    {
        return await Repository.orm.getAll(this.table, null, fields);
    }

    async update(id, updatedData)
    {
        return await Repository.orm.update(this.table, updatedData, id);
    }

    async delete(id)
    {
        return await Repository.orm.delete(this.table, id);
    }
}
