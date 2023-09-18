const jsdom = require("jsdom");

exports.startApplication = async (configFilename, exec) => {
	jest.resetModules();
	if (global.app) {
		await this.stopApplication();
	}
	// Set config sample for use in test
	if (configFilename === "") {
		process.env.MM_CONFIG_FILE = "config/config.js";
	} else {
		process.env.MM_CONFIG_FILE = configFilename;
	}
	if (exec) exec;
	global.app = require("../../../js/app");

	return global.app.start();
};

exports.stopApplication = async () => {
	if (!global.app) {
		return Promise.resolve();
	}
	await global.app.stop();
	delete global.app;
};

exports.getDocument = () => {
	return new Promise((resolve) => {
		const url = `http://${config.address || "localhost"}:${config.port || "8080"}`;
		jsdom.JSDOM.fromURL(url, { resources: "usable", runScripts: "dangerously" }).then((dom) => {
			dom.window.name = "jsdom";
			dom.window.fetch = fetch;
			dom.window.onload = () => {
				global.MutationObserver = dom.window.MutationObserver;
				global.document = dom.window.document;
				resolve();
			};
		});
	});
};

exports.waitForElement = (selector, options) => {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			const checkElem = (elem, obs) => {
				let opt = options;
				if (!opt) opt = {};
				if (!opt.type) opt.type = "text";
				if (opt.type === "text") {
					if (elem && elem.textContent) {
						let txt = elem.textContent.trim();
						if (!opt.allowUndefined)
							txt = txt
								.replace(/undefined/gm, "")
								.replace(/undefinedError.*/, "")
								.replace(/Loading.*/, "")
								.trim();
						if (txt !== "" && (!opt.ignoreText || !txt.includes(opt.ignoreText))) {
							clearInterval(interval);
							if (obs) obs.disconnect();
							resolve(elem);
						}
					}
				} else if (opt.type === "html") {
					if (elem && elem.outerHTML) {
						if (elem.outerHTML !== "") {
							clearInterval(interval);
							if (obs) obs.disconnect();
							resolve(elem);
						}
					}
				}
			};

			if (document.querySelector(selector)) {
				checkElem(document.querySelector(selector));
			}

			const observer = new MutationObserver(() => {
				checkElem(document.querySelector(selector), observer);
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}, 5);
	});
};

exports.waitForAllElements = (selector) => {
	return new Promise((resolve) => {
		let oldVal = 999999;
		const interval = setInterval(() => {
			const checkElem = (elem, obs) => {
				if (elem) {
					let newVal = elem.length;
					if (newVal === oldVal) {
						clearInterval(interval);
						if (obs) obs.disconnect();
						resolve(elem);
					} else {
						if (newVal !== 0) oldVal = newVal;
					}
				}
			};

			if (document.querySelectorAll(selector)) {
				checkElem(document.querySelectorAll(selector));
			}

			const observer = new MutationObserver(() => {
				checkElem(document.querySelectorAll(selector), observer);
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}, 5);
	});
};

exports.testMatch = async (element, regex) => {
	const elem = await this.waitForElement(element);
	expect(elem).not.toBe(null);
	expect(elem.textContent).toMatch(regex);
};
