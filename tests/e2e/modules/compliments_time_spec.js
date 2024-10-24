const helpers = require("../helpers/global-setup");

describe("Compliments module", () => {

	/**
	 * move similar tests in function doTest
	 * @param {Array} complimentsArray The array of compliments.
	 * @returns {boolean} result
	 */
	const doTest = async (complimentsArray) => {
		await helpers.getDocument();
		let elem = await helpers.waitForElement(".compliments");
		expect(elem).not.toBeNull();
		elem = await helpers.waitForElement(".module-content");
		expect(elem).not.toBeNull();
		expect(complimentsArray).toContain(elem.textContent);
		return true;
};

	afterEach(async () => {
		await helpers.stopApplication();
	});

	describe("parts of days", () => {
		it("Morning compliments for that part of day", async () => {
			await helpers.startApplication("tests/configs/modules/compliments/compliments_parts_day.js", "2022-10-01T10:00:00.000Z");
			await expect(doTest(["Hi", "Good Morning", "Morning test"])).resolves.toBe(true);
		});

		it("Afternoon show Compliments for that part of day", async () => {
			await helpers.startApplication("tests/configs/modules/compliments/compliments_parts_day.js", "2022-10-01T15:00:00.000Z");
			await expect(doTest(["Hello", "Good Afternoon", "Afternoon test"])).resolves.toBe(true);
		});

		it("Evening show Compliments for that part of day", async () => {
			await helpers.startApplication("tests/configs/modules/compliments/compliments_parts_day.js", "2022-10-01T20:00:00.000Z");
			await expect(doTest(["Hello There", "Good Evening", "Evening test"])).resolves.toBe(true);
		});
	});

	describe("Feature date in compliments module", () => {
		describe("Set date and empty compliments for anytime, morning, evening and afternoon", () => {
			it("shows happy new year compliment on new years day", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_date.js", "2022-01-01T10:00:00.000Z");
				await expect(doTest(["Happy new year!"])).resolves.toBe(true);
			});
		});

		describe("Test only custom date events shown with new property", () => {
			it("shows 'Special day message' on May 6", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_specialDayUnique_true.js", "2022-05-06T10:00:00.000Z");
				await expect(doTest(["Special day message"])).resolves.toBe(true);
			});
		});

		describe("Test all date events shown without new property", () => {
			it("shows 'any message' on May 6", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_specialDayUnique_false.js", "2022-05-06T10:00:00.000Z");
				await expect(doTest(["Special day message", "Typical message 1", "Typical message 2", "Typical message 3"])).resolves.toBe(true);
			});
		});

		describe("Test only custom cron date event shown with new property", () => {
			it("shows 'any message' on May 6", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_cron_entry.js", "2022-05-06T17:03:00.000Z");
				await expect(doTest(["just pub time"])).resolves.toBe(true);
			});
		});

		describe("Test any event shows after time window", () => {
			it("shows 'any message' on May 6", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_cron_entry.js", "2022-05-06T17:11:00.000Z");
				await expect(doTest(["just a test"])).resolves.toBe(true);
			});
		});

		describe("Test any event shows different day", () => {
			it("shows 'any message' on May 5", async () => {
				await helpers.startApplication("tests/configs/modules/compliments/compliments_cron_entry.js", "2022-05-05T17:00:00.000Z");
				await expect(doTest(["just a test"])).resolves.toBe(true);
			});
		});

	});
});
