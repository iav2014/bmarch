/*
* goal: read pdf file, no waw with %20 spaces between words
* tenant: Banca March partial solution
* author: (c) 29/01/2019 Nacho Ariza
* MIT license
*/
const pdfreader = require('pdfreader');
const fs = require('fs');

let rows = {}; // indexed by y-position
let string = '';
let printRows = () => {
	Object.keys(rows) // => array of y-positions (type: float)
		.sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
		.forEach((y) => {
			let r = (rows[y] || []).join(' ');
			string += r + '\n';
			console.log(r)
		});
}

new pdfreader.PdfReader().parseFileItems('./source/informe-diario-de-inversion17690.pdf', (err, item) => {
	
	if (!item || item.page) {
		printRows();
		rows = {}; // clear rows for next page
	}
	else if (item.text) {
		// accumulate text items into rows object, per line
		(rows[item.y] = rows[item.y] || []).push(item.text);
	}
	if (!item) {
		fs.writeFileSync("./target/informe-diario-de-inversion17690.app2.txt", string);
		// eof processing
	}
});
