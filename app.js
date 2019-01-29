/*
* goal: read pdf file
* tenant: Banca March partial solution
* author: (c) 29/01/2019 Nacho Ariza
* MIT license
*/

let fs = require('fs');
let PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this, 1);
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError)
);
pdfParser.on("pdfParser_dataReady", pdfData => {
	fs.writeFileSync("./target/informe-diario-de-inversion17690.txt", pdfParser.getRawTextContent());
});

pdfParser.loadPDF("./source/informe-diario-de-inversion17690.pdf");
