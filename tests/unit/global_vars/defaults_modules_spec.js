const fs = require("node:fs");
const path = require("node:path");

require("#server_functions");

describe("Default modules set in modules/default/defaultmodules.js", () => {
	const expectedDefaultModules = require(`${global.root_path}/modules/default/defaultmodules`);

	for (const defaultModule of expectedDefaultModules) {
		it(`contains a folder for modules/default/${defaultModule}"`, () => {
			expect(fs.existsSync(path.join(global.root_path, "modules/default", defaultModule))).toBe(true);
		});
	}
});
