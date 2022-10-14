// https://playwright.dev/docs/api/class-testconfig#test-config-web-server
// https://medium.com/geekculture/grouping-and-organising-test-suite-in-playwright-dccf2c55d776

// @ts-check
const { test, expect } = require("@playwright/test");

test("homepage has MagicMirror in title and get started link linking to the intro page", async ({ page }) => {
	await page.goto("http://localhost:8080");

	await expect(page).toHaveTitle("MagicMirror²");

	expect.soft(["Hello There", "Good Evening", "Evening test"]).toContain(await page.locator(".compliments .module-content").textContent());
/*
	page.evaluate(() => {
		Date.now = () => {
			return new Date("01 Oct 2022 10:00:00 GMT");
		};
	});
	expect.soft(["Hi", "Good Morning", "Morning test"]).toContain(await page.locator(".compliments .module-content").textContent());
*/
});
