require("#server_functions");

const Utils = require(`${global.root_path}/js/utils`);

describe("Utils", () => {
	it("should output system information", async () => {
		await expect(Utils.logSystemInformation()).resolves.toContain("platform: linux");
	});
});
