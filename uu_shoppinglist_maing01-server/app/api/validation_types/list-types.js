const commonPageInfoDtoInType = shape({
  pageIndex: integer(0, 1000000000),
  pageSize: integer(1, 1000000000),
});

const listCreateDtoInType = shape({
  name: string(1, 128).isRequired(),
  members: array(
    shape({
      uuId: uuIdentity().isRequired(),
      name: string(1, 800).isRequired(),
    }),
    100
  ),
  items: array(
    shape({
      id: id().isRequired(),
      name: string(1, 200).isRequired(),
      solved: boolean().isRequired(),
    }),
    500
  ),
  archived: boolean().isRequired(),
});

const listListDtoInType = shape({
  pageInfo: commonPageInfoDtoInType,
});

const listGetDtoInType = shape({
  id: id().isRequired(),
});

const listAddMemberDtoInType = shape({
  listId: id().isRequired(),
  memberUuId: uuIdentity().isRequired(),
  memberName: string(1, 800).isRequired(),
});

const listAddItemDtoInType = shape({
  listId: id().isRequired(),
  itemName: string(1, 200).isRequired(),
  solved: boolean().isRequired(),
  
});

const listUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(1, 128),
  archived: boolean(),
});

const listUpdateItemDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
  itemName: string(1, 200).isRequired(),
  solved: boolean().isRequired(),
});

const listDeleteDtoInType = shape({
  id: id().isRequired(),
});

const listDeleteItemDtoInType = shape({
  listId: id().isRequired(),
  itemId: id().isRequired(),
});

const listDeleteMemberDtoInType = shape({
  listId: id().isRequired(),
  memberUuId: uuIdentity().isRequired(),
});