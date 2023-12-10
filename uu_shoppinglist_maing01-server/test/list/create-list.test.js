const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await setupTestEnvironment();
});

afterEach(async () => {
  await teardownTestEnvironment();
});

describe("List Command Tests", () => {
  test("Create List - Happy Day", async () => {
    const dtoIn = createListDto({
      name: "Test List",
      members: [],
      items: [],
      archived: false,
    });

    const result = await TestHelper.executePostCommand("list/create", dtoIn);

    assertListCreation(result, dtoIn);
  });

  test("Create List - Warning", async () => {
    const dtoIn = createListDto({
      name: "Test List",
      members: [],
      items: [],
      archived: false,
      uuAppErrorMap: { someErrorKey: "Some error message" },
    });

    const result = await TestHelper.executePostCommand("list/create", dtoIn);

    assertListCreationWithWarning(result, dtoIn);
  });

  test("Create List - Invalid DTO", async () => {
    expect.assertions(3);

    try {
      await TestHelper.executePostCommand("list/create", {});
    } catch (e) {
      assertInvalidDtoError(e);
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

function createListDto({ name, members, items, archived }) {
  return {
    name,
    members,
    items,
    archived,
  };
}

function assertListCreation(result, dtoIn) {
  expect(result.data.name).toEqual(dtoIn.name);
  expect(result.data.members).toEqual(dtoIn.members);
  expect(result.data.items).toEqual(dtoIn.items);
  expect(result.data.archived).toEqual(dtoIn.archived);
  expect(result.data.creatorUuId).toBeDefined();
  expect(result.data.creatorName).toBeDefined();
  expect(result.data.awid).toEqual(TestHelper.awid);
  expect(result.data.uuAppErrorMap).toEqual({});
}

function assertListCreationWithWarning(result, dtoIn) {
  expect(result.data.name).toEqual(dtoIn.name);
  expect(result.data.members).toEqual(dtoIn.members);
  expect(result.data.items).toEqual(dtoIn.items);
  expect(result.data.archived).toEqual(dtoIn.archived);
  expect(result.data.creatorUuId).toBeDefined();
  expect(result.data.creatorName).toBeDefined();
  expect(result.data.awid).toEqual(TestHelper.awid);
  expect(result.data.uuAppErrorMap).not.toBe({});
  expect(Object.keys(result.data.uuAppErrorMap).length).toEqual(0);
}

function assertInvalidDtoError(e) {
  expect(e.code).toEqual("uu-shoppinglist-main/list/create/invalidDtoIn");
  expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(2);
  expect(e.status).toEqual(400);
}