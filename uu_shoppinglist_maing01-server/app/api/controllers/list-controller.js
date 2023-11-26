"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {
  create(ucEnv) {
    return ListAbl.create(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  get(ucEnv) {
    return ListAbl.get(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  addMember(ucEnv) {
    return ListAbl.addMember(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  addItem(ucEnv) {
    return ListAbl.addItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  update(ucEnv) {
    return ListAbl.update(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  updateItem(ucEnv) {
    return ListAbl.updateItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  delete(ucEnv) {
    return ListAbl.delete(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  deleteItem(ucEnv) {
    return ListAbl.deleteItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
  deleteMember(ucEnv) {
    return ListAbl.deleteMember(ucEnv.getDtoIn(), ucEnv.getUri().getAwid());
  }
}

module.exports = new ListController();