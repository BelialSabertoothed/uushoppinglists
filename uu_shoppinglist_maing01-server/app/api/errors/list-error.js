"use strict";
const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error");

const Create = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/create/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const List = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/list/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/get/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 403;
      this.code = `${Get.UC_CODE}notAuthorized`;
      this.message = "User not authorized to view this list.";
    }
  },
};


const Update = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/update/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 403;
      this.code = `${Update.UC_CODE}notAuthorized`;
      this.message = "User not authorized to update this list.";
    }
  },
};

const UpdateItem = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/updateItem/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const AddMember = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/addMember/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const AddItem = {
  UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/addItem/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};
const Delete = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/delete/`,
  
    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Delete.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
    UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
      constructor() {
        super(...arguments);
        this.status = 403;
        this.code = `${Delete.UC_CODE}notAuthorized`;
        this.message = "User not authorized to delete this list.";
      }
    },
  };
  
  const DeleteItem = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/deleteItem/`,
  
    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${DeleteItem.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
  };
  
  const DeleteMember = {
    UC_CODE: `${ShoppinglistMainUseCaseError.ERROR_PREFIX}list/deleteMember/`,
  
    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${DeleteMember.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
  };
  
module.exports = {
  Create,
  List,
  Get,
  Update,
  UpdateItem,
  AddMember,
  AddItem,
  Delete,
  DeleteItem,
  DeleteMember
};