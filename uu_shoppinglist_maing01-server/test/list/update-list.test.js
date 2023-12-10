const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await setupTestEnvironment();
});

afterEach(async () => {
  await teardownTestEnvironment();
});

const LIST = { name: "Test List", members: [], items: [], archived: false };

describe("List Update Command Tests", () => {
  test("Update List - Happy Day", async () => {
    const list = await createAndReturnList(LIST);
    const updatedList = {
      id: list.id,
      name: "Test List Updated",
      archived: true,
    };
    const result = await updateList(updatedList);

    assertSuccessfulListUpdate(result, updatedList);
  });

  test("Update List - Warning (Unsupported Keys)", async () => {
    const list = await createAndReturnList(LIST);
    const result = await updateListWithUnsupportedKeys(list.id);

    assertListUpdateWithWarning(result);
  });

  test("Update List - Invalid DTO", async () => {
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("list/update", {});
    } catch (e) {
      assertInvalidDtoError(e);
    }
  });

  test("Update List - Not Authorized", async () => {
    const list = await createAndReturnList(LIST);

    await TestHelper.login("Creators2");

    expect.assertions(2);
    try {
      await updateList({ id: list.id, name: "Updated", archived: true });
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

async function updateList(listDto) {
  return TestHelper.executePostCommand("list/update", listDto);
}

async function updateListWithUnsupportedKeys(listId) {
  return TestHelper.executePostCommand("list/update", { id: listId, name: "Updated", another: "another" });
}

function assertSuccessfulListUpdate(result, updatedList) {
  expect(result.data.name).toEqual(updatedList.name);
  expect(result.data.archived).toEqual(updatedList.archived);
  expect(result.data.uuAppErrorMap).toEqual({});
}

function assertListUpdateWithWarning(result) {
  expect(result.data.name).toEqual("Updated");
  expect(result.data.archived).toEqual(LIST.archived);
  expect(result.data.uuAppErrorMap).not.toEqual({});
  expect(Object.keys(result.data.uuAppErrorMap)).toHaveLength(1);
}

function assertInvalidDtoError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/update/invalidDtoIn");
  expect(Object.keys(e.paramMap.missingKeyMap)).toHaveLength(1);
  expect(e.status).toEqual(400);
}

function assertNotAuthorizedError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/update/notAuthorized");
  expect(e.status).toEqual(403);
}
