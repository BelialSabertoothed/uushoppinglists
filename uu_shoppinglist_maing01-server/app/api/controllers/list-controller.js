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
    return ListAbl.get(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  addMember(ucEnv) {
    return ListAbl.addMember(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  addItem(ucEnv) {
    return ListAbl.addItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  update(ucEnv) {
    return ListAbl.update(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  updateItem(ucEnv) {
    return ListAbl.updateItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  delete(ucEnv) {
    return ListAbl.delete(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  deleteItem(ucEnv) {
    return ListAbl.deleteItem(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  deleteMember(ucEnv) {
    return ListAbl.deleteMember(ucEnv.getDtoIn(), ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
}

module.exports = new ListController();