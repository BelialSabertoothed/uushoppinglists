const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await setupTestEnvironment();
});

afterEach(async () => {
  await teardownTestEnvironment();
});

const LIST = { name: "Test List", members: [], items: [], archived: false };

describe("List Get Command Tests", () => {
  test("Get List - Happy Day", async () => {
    const list = await createAndReturnList(LIST);
    const result = await getList(list.id);

    assertSuccessfulListGet(result);
  });

  test("Get List - Warning (Unsupported Keys)", async () => {
    const list = await createAndReturnList(LIST);
    const result = await getListWithUnsupportedKeys(list.id);

    assertListGetWithWarning(result);
  });

  test("Get List - Invalid DTO", async () => {
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand("list/get", {});
    } catch (e) {
      assertInvalidDtoError(e);
    }
  });

  test("Get List - Not Authorized", async () => {
    const list = await createAndReturnList(LIST);

    await TestHelper.login("Creators2");

    expect.assertions(2);
    try {
      await getList(list.id);
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

async function getList(listId) {
  return TestHelper.executeGetCommand("list/get", { id: listId });
}

async function getListWithUnsupportedKeys(listId) {
  return TestHelper.executeGetCommand("list/get", { id: listId, another: "another" });
}

function assertSuccessfulListGet(result) {
  expect(result.data.name).toEqual(LIST.name);
  expect(result.data.members).toEqual(LIST.members);
  expect(result.data.items).toEqual(LIST.items);
  expect(result.data.archived).toEqual(LIST.archived);
  expect(result.data.uuAppErrorMap).toEqual({});
}

function assertListGetWithWarning(result) {
  expect(result.data.name).toEqual(LIST.name);
  expect(result.data.members).toEqual(LIST.members);
  expect(result.data.items).toEqual(LIST.items);
  expect(result.data.archived).toEqual(LIST.archived);
  expect(result.data.uuAppErrorMap).not.toEqual({});
  expect(Object.keys(result.data.uuAppErrorMap)).toHaveLength(1);
}

function assertInvalidDtoError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/get/invalidDtoIn");
  expect(Object.keys(e.paramMap.missingKeyMap)).toHaveLength(1);
  expect(e.status).toEqual(400);
}

function assertNotAuthorizedError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/get/notAuthorized");
  expect(e.status).toEqual(403);
}