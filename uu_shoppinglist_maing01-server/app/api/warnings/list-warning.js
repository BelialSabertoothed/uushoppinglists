const Errors = require("../errors/list-error.js");

const createUnsupportedKeysWarning = (errorType) => ({
  UnsupportedKeys: {
    code: `${Errors[errorType].UC_CODE}unsupportedKeys`,
  },
});

const Warnings = {
  Create: createUnsupportedKeysWarning("Create"),
  List: createUnsupportedKeysWarning("List"),
  Get: createUnsupportedKeysWarning("Get"),
  AddMember: createUnsupportedKeysWarning("AddMember"),
  AddItem: createUnsupportedKeysWarning("AddItem"),
  Update: createUnsupportedKeysWarning("Update"),
  UpdateItem: createUnsupportedKeysWarning("UpdateItem"),
  Delete: createUnsupportedKeysWarning("Delete"),
  DeleteItem: createUnsupportedKeysWarning("DeleteItem"),
  DeleteMember: createUnsupportedKeysWarning("DeleteMember"),
};

module.exports = Warnings;