const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("List Use Cases", () => {
  describe("Create List", () => {
    test("should create a list with valid input", async () => {
      const dtoIn = {
        name: "Shopping List test",
        creator: "Belial",
      };

      const result = await TestHelper.executePostCommand("list/create", dtoIn);

      expect(result.data.name).toEqual(dtoIn.name);
      expect(result.data.creator).toEqual(dtoIn.creator);
      expect(result.data.awid).toEqual(TestHelper.awid);
      expect(result.data.uuAppErrorMap).toEqual({});
    });

    test("should handle invalid dtoIn", async () => {

      await expect(TestHelper.executePostCommand("list/create", {})).rejects.toMatchObject({
        code: "uu_shoppinglist_main/list/create/invalidDtoIn",
        paramMap: { missingKeyMap: expect.any(Object) },
        status: 400,
      });
    });
  });

});
