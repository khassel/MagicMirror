const fs = require("node:fs");
const path = require("node:path");

require("#server_functions");

const version = require(`${global.root_path}/package.json`).version;

describe("'global.root_path' set in js/server_functions.js", () => {
	const expectedSubPaths = ["modules", "serveronly", "js", "js/app.js", "js/main.js", "js/electron.js", "config"];

	expectedSubPaths.forEach((subpath) => {
		it(`contains a file/folder "${subpath}"`, () => {
			expect(fs.existsSync(path.join(global.root_path, subpath))).toBe(true);
		});
	});

	it("global.root_path is used for testing so should not be undefined", () => {
		expect(global.root_path).toBeDefined();
	});

	it("should not modify global.version for testing", () => {
		expect(global.version).toBeUndefined();
	});

	it("should expect the global.version equals package.json file", () => {
		const versionPackage = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
		expect(version).toBe(versionPackage);
	});
});
