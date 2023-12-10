const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await setupTestEnvironment();
  await createTestLists([LIST1, LIST2, LIST3]);
});

afterEach(async () => {
  await TestHelper.teardown();
});

const createTestList = async (list) => {
  await TestHelper.executePostCommand("list/create", list);
};

const createTestLists = async (lists) => {
  await Promise.all(lists.map(createTestList));
};

const LIST1 = { name: "Test List", members: [], items: [], archived: false };
const LIST2 = { name: "Test List 2", members: [], items: [], archived: false };
const LIST3 = { name: "Test List 3", members: [], items: [], archived: false };

describe("List List Command Tests", () => {
  test("List Lists - Happy Path", async () => {
    const dtoIn = {
      pageInfo: {
        pageIndex: 1,
        pageSize: 2,
      },
    };

    const result = await getListList(dtoIn);

    assertHappyPathListList(result);
  });

  test("List Lists - Warning (Unsupported Keys)", async () => {
    const result = await getListListWithUnsupportedKeys();

    assertListListWithWarning(result);
  });
});

async function setupTestEnvironment() {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
  await TestHelper.login("Creators");
}

async function getListList(dtoIn) {
  return TestHelper.executeGetCommand("list/list", dtoIn);
}

async function getListListWithUnsupportedKeys() {
  return TestHelper.executeGetCommand("list/list", { another: "another" });
}

function assertHappyPathListList(result) {
  expect(result.data.pageInfo.total).toEqual(3);
  expect(result.data.pageInfo.pageIndex).toEqual(1);
  expect(result.data.pageInfo.pageSize).toEqual(2);
  expect(result.data.itemList).toHaveLength(1);
}

function assertListListWithWarning(result) {
  expect(result.data.pageInfo.total).toEqual(3);
  expect(result.data.uuAppErrorMap).not.toBe({});
  expect(Object.keys(result.data.uuAppErrorMap)).toHaveLength(1);
}