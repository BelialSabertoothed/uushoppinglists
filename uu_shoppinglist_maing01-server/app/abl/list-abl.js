"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const ObjectId = require("mongodb").ObjectId;

const Errors = require("../api/errors/list-error.js");
const Warnings = require("../api/warnings/list-warning.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("list");
  }

  async create(dtoIn, awid, session) {
    try {
      const uuAppErrorMap = this.validateDto("listCreateDtoInType", dtoIn, Warnings.Create, Errors.Create, session);
      const uuIdentity = session.getIdentity().getUuIdentity();
      const uuIdentityName = session.getIdentity().getName();

      dtoIn.creatorUuId = uuIdentity;
      dtoIn.creatorName = uuIdentityName;
      dtoIn.awid = awid;

      const list = await this.dao.create(dtoIn);
      return { ...list, uuAppErrorMap };
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  async list(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listListDtoInType", dtoIn, Warnings.List, Errors.List);

      dtoIn.pageInfo = {
        pageSize: dtoIn.pageInfo?.pageSize || 100,
        pageIndex: dtoIn.pageInfo?.pageIndex || 0,
      };

      const dtoOut = await this.dao.list(awid, dtoIn.pageInfo);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in list:", error);
      throw error;
    }
  }

  async get(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listGetDtoInType", dtoIn, Warnings.Get, Errors.Get);
      const dtoOut = await this.dao.get(awid, dtoIn.id);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in get:", error);
      throw error;
    }
  }

  async addMember(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listAddMemberDtoInType", dtoIn, Warnings.AddMember, Errors.AddMember);
      const member = { uuId: dtoIn.memberUuId, name: dtoIn.memberName };
      const dtoOut = await this.dao.addMember(awid, dtoIn.listId, member);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in addMember:", error);
      throw error;
    }
  }

  async addItem(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listAddItemDtoInType", dtoIn, Warnings.AddItem, Errors.AddItem);
      const item = { id: new ObjectId(), name: dtoIn.itemName, solved: dtoIn.solved };
      const dtoOut = await this.dao.addItem(awid, dtoIn.listId, item);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in addItem:", error);
      throw error;
    }
  }

  async update(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listUpdateDtoInType", dtoIn, Warnings.Update, Errors.Update);
      const list = { name: dtoIn.name, archived: "archived" in dtoIn ? dtoIn.archived : undefined };
      const dtoOut = await this.dao.update(awid, dtoIn.id, list);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async updateItem(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listUpdateItemDtoInType", dtoIn, Warnings.UpdateItem, Errors.UpdateItem);
      const dtoOut = await this.dao.updateItem(awid, dtoIn);
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    } catch (error) {
      console.error("Error in updateItem:", error);
      throw error;
    }
  }

  async delete(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listDeleteDtoInType", dtoIn, Warnings.Delete, Errors.Delete);
      const result = await this.dao.delete(awid, dtoIn.id);
      return { ...result, uuAppErrorMap };
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  async deleteItem(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listDeleteItemDtoInType", dtoIn, Warnings.DeleteItem, Errors.DeleteItem);
      const result = await this.dao.deleteItem(awid, dtoIn.listId, dtoIn.itemId);
      return { ...result, uuAppErrorMap };
    } catch (error) {
      console.error("Error in deleteItem:", error);
      throw error;
    }
  }

  async deleteMember(dtoIn, awid) {
    try {
      const uuAppErrorMap = this.validateDto("listDeleteMemberDtoInType", dtoIn, Warnings.DeleteMember, Errors.DeleteMember);
      const result = await this.dao.deleteMember(awid, dtoIn.listId, dtoIn.memberUuId);
      return { ...result, uuAppErrorMap };
    } catch (error) {
      console.error("Error in deleteMember:", error);
      throw error;
    }
  }

  validateDto(dtoType, dtoIn, warningCode, errorCode, session) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate(dtoType, dtoIn);
    return ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      warningCode.UnsupportedKeys.code,
      errorCode.InvalidDtoIn,
      session
    );
  }
}

module.exports = new ListAbl();
