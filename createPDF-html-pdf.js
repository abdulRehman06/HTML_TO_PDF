let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let utility = require("./utility");

init()
function init() {
    let basePath = path.join('file://' + __dirname, 'views', 'img')
    let dbObject = {
        headerImg: path.join(basePath, 'header.png').replace(/\\/g, '/'),
        PSID: "123123123", // <%= dbObject.logoImg %>
        houseNumber: " R-0001",
        billingMonth: "december",
        dueDate: " 12-12-2020",
        utilityBill: " 15,000.00",
        mosque: " 15,000.00",
        miscellaneous: "Rs : 18,000.00",
        arrears: " 19,000.00",
        totalPayable: "RS: 17,000.00",
    }


    ejs.renderFile(path.join(__dirname, 'views/pages', "invoice.ejs"), {
        dbObject // passing object for custom values 
    }, (err, data) => {
        if (err) {
            console.log(`err  ${err}`)
        } else {
            var options = {
                format: 'A4'
            };
            pdf.create(data, options).toFile("pdf/pdfFileName.pdf", function (err, data) { // PDF file save in PDF folder 
                if (err) {
                    console.log(`err  :${err}`)
                } else {
                    console.log(` file genrated successfullt   ` , JSON.stringify(data))
                }
            });


            /*
            //================================= if you want to send email then use below code 



            pdf.create(data, options).toBuffer(function (err, buffer) { // PDF file save in PDF folder 
                if (err) {
                    console.log(`err  :${err}`)
                } else {
                    utility.SendEmailNotification('your@email', 'Monthly Bill Statement', 'your bill', buffer, 'Monthly_Bill_Statement.pdf').then((result) => {
                        console.log(` send successfully   `)
                    }).catch((err) => {
                        console.log(`err  `)
                    });
                    // console.log(` file buffer  genrated successfullt  `) //  you can wrinte your email send code here 
                }
            });
            */
        }
    })
}


