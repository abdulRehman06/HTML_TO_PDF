const path = require('path');
const puppeteer = require('puppeteer');


printPdf() 
const printPdf = async () => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	/** Launch a headleass browser */
	const browser = await puppeteer.launch();
	/* 1- Ccreate a newPage() object. It is created in default browser context. */
	const page = await browser.newPage();
	/* 2- Will open our generated `.html` file in the new Page instance. */
	// await page.goto(path.resolve('./build.html'), { waitUntil: 'networkidle0' });
	await page.goto(path.join(__dirname, 'views/pages', "invoice.html"), { waitUntil: 'networkidle0' });
	/* 3- Take a snapshot of the PDF */
	const pdf = await page.pdf({
		format: 'A4',
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	}).then((result) => {
		console.log(`result  ${result}`)

	}).catch((err) => {
		console.log(`err  ${err}`)
	});;
	/* 4- Cleanup: close browser. */
	await browser.close();
	console.log('Ending: Generating PDF Process');
	return pdf;
};
