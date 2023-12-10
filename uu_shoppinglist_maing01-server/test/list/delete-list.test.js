const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await setupTestEnvironment();
});

afterEach(async () => {
  await teardownTestEnvironment();
});

const LIST = { name: "Test List", members: [], items: [], archived: false };

describe("List Delete Command Tests", () => {
  test("Delete List - Happy Day", async () => {
    const list = await createAndReturnList(LIST);
    const result = await deleteList(list.id);

    assertSuccessfulListDeletion(result);
  });

  test("Delete List - Warning (Unsupported Keys)", async () => {
    const list = await createAndReturnList(LIST);

    const result = await deleteListWithUnsupportedKeys(list.id);

    assertListDeletionWithWarning(result);
  });

  test("Delete List - Invalid DTO", async () => {
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("list/delete", {});
    } catch (e) {
      assertInvalidDtoError(e);
    }
  });

  test("Delete List - Not Authorized", async () => {
    const list = await createAndReturnList(LIST);

    await TestHelper.login("Creators2");

    expect.assertions(2);
    try {
      await deleteList(list.id);
    } catch (e) {
      assertNotAuthorizedError(e);
    }
  });
});

async function setupTestEnvironment() {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
  await TestHelper.login("Creators");
}

async function teardownTestEnvironment() {
  await TestHelper.teardown();
}

async function createAndReturnList(listDto) {
  const list = await TestHelper.executePostCommand("list/create", listDto);
  return list;
}

async function deleteList(listId) {
  return TestHelper.executePostCommand("list/delete", { id: listId });
}

async function deleteListWithUnsupportedKeys(listId) {
  return TestHelper.executePostCommand("list/delete", { id: listId, another: "another" });
}

function assertSuccessfulListDeletion(result) {
  expect(result.data.uuAppErrorMap).toEqual({});
}

function assertListDeletionWithWarning(result) {
  expect(result.data.uuAppErrorMap).not.toEqual({});
  expect(Object.keys(result.data.uuAppErrorMap)).toHaveLength(1);
}

function assertInvalidDtoError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/delete/invalidDtoIn");
  expect(Object.keys(e.paramMap.missingKeyMap)).toHaveLength(1);
  expect(e.status).toEqual(400);
}

function assertNotAuthorizedError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/delete/notAuthorized");
  expect(e.status).toEqual(403);
}