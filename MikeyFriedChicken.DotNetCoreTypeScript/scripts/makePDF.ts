import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as fs from "fs";
//import * as path from "path";
import TCreatedPdf = pdfMake.TCreatedPdf;
import TDocumentDefinitions = pdfMake.TDocumentDefinitions;

// tslint:disable-next-line:typedef
module.exports = function (callback: (error: any, result: any) => void, filename: string) {

    var docDefinition: TDocumentDefinitions = {
        content: [
            // if you don't need styles, you can use a simple string to define a paragraph
            "This is a standard paragraph, using default style",

            // using a { text: '...' } object lets you set styling properties
            { text: "This paragraph will have a bigger font", fontSize: 15 },

            // if you set pass an array instead of a string, you'll be able
            // to style any fragment individually
            {
                text: [
                    "This paragraph is defined as an array of elements to make it possible to ",
                    { text: "restyle part of it and make it bigger ", fontSize: 15 },
                    "than the rest."
                ]
            }
        ]
    };

    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    var pdf: TCreatedPdf = pdfMake.createPdf(docDefinition);

    var ret: {stuff: any, data: any} = {stuff: "cool", data: "" };

    try {
        (<any>pdf).getBase64(function (encodedString: any) {
            ret = { stuff: "hey", data: encodedString };
            callback(null, ret);
        });
       
    } catch (e) {
        ret = { stuff: "error", data: e.toString() };
        callback(null, ret);
    }

};



