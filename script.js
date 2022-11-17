"use strict";

import JOURNAL from "./journal.js";

const phi = function ([n00, n01, n10, n11]) {
	return (
		(n11 * n00 - n10 * n01) /
		Math.sqrt((n11 + n10) * (n01 + n00) * (n01 + n11) * (n10 + n00))
	);
};

const tableFor = function (event, journal = JOURNAL) {
	const table = [0, 0, 0, 0];
	for (let entry of journal) {
		let index = 0;
		if (entry.events.includes(event)) index += 1;
		if (entry.squirrel) index += 2;
		table[index] += 1;
	}
	return table;
};

const journalEvents = function (journal = JOURNAL) {
	const diffEvents = new Set();
	for (const entry of journal) {
		for (const event of entry.events) {
			diffEvents.add(event);
		}
	}
	return [...diffEvents];
};

const correlate = function (journal) {
	for (const event of journalEvents(journal)) {
		const result = phi(tableFor(event, journal));
		if (result < -0.1 || result > 0.1)
			console.log(`${event.padEnd(15)}  ${result}`);
	}
};

correlate(JOURNAL);

for (let entry of JOURNAL) {
	if (
		entry.events.includes("peanuts") &&
		!entry.events.includes("brushed teeth")
	) {
		entry.events.push("peanut teeth");
	}
}
