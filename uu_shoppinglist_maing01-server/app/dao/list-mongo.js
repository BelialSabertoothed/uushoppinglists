const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const ObjectId = require("mongodb").ObjectId;


class ListMongo extends UuObjectDao {
  async createSchema() {}

  async create(list) {
    return await super.insertOne(list);
  }

  async list(awid, pageInfo = {}) {
    const filter = { awid };
    return await super.find(filter, pageInfo);
  }

  async get(awid, id) {
    const filter = { awid, id };
    return await super.findOne(filter);
  }

  async addMember(awid, id, member) {
    const filter = { awid, id };
    const update = { $addToSet: { members: member } };
    return await super.findOneAndUpdate(filter, update, true);
  }

  async addItem(awid, id, item) {
    const filter = { awid, id };
    const update = { $addToSet: { items: item } };
    return await super.findOneAndUpdate(filter, update, true);
  }

  async update(awid, id, list) {
    const filter = { awid, id };
    return await super.findOneAndUpdate(filter, list, true);
  }

  async updateItem(awid, dtoIn) {
    const itemId = typeof dtoIn.itemId === 'string' ? new ObjectId(dtoIn.itemId) : dtoIn.itemId;
    const filter = { awid, id: dtoIn.listId, "items.id": itemId };
    const update = {
      $set: {
        "items.$.name": dtoIn.itemName,
        "items.$.solved": dtoIn.solved
      }
    };
    return await super.findOneAndUpdate(filter, update, true);
  }

  async delete(awid, id) {
    const filter = { awid, id };
    await super.deleteOne(filter);
  }

  async deleteItem(awid, listId, itemId) {
    const itemIdObject = typeof itemId === 'string' ? new ObjectId(itemId) : itemId;
    const filter = { awid, id: listId };
    const update = { $pull: { items: { id: itemIdObject } } };
    await super.findOneAndUpdate(filter, update, true);
  }


  async deleteMember(awid, listId, memberUuId) {
    const filter = { awid, id: listId };
    const update = { $pull: { members: { uuId: memberUuId } } };
    await super.findOneAndUpdate(filter, update, true);
  }


}

module.exports = ListMongo;