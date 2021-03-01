import fsImport from 'fs'
const fs = fsImport.promises
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib'
import { Chapter, TextConfig } from '../interfaces'
import fontkit from '@pdf-lib/fontkit'
import path from 'path'
import config from 'config'


export async function initPdfDoc(name: string) {
    const pdfDoc = await PDFDocument.create()
    
    // Embed font
    pdfDoc.registerFontkit(fontkit)
    const assetsPath: string = config.get("assetsPath")
    const fontBytes = await fs.readFile(path.join(assetsPath, 'fonts/ARIAL.TTF'))
    const arialFont = await pdfDoc.embedFont(fontBytes)

    // Add first page with text
    const page = pdfDoc.addPage()

    // Add blank page
    pdfDoc.addPage()

    return pdfDoc
}

export function writeToPage(
    text: string, 
    page: PDFPage, 
    options: TextConfig) {

    const { 
        width, 
        height, 
        font, 
        fontSize } = options

    const { 
        width: pageWidth, 
        height: pageHeight } = page.getSize() 
    

    page.drawText(text, {
        x: width || pageWidth/2 - (fontSize*text.length)/2,
        y: height || pageHeight/2,
        size: fontSize,
        font: font,
    })
} 


export async function copyPagesToDoc(
    chapterArr: Chapter[], 
    pdfDoc: PDFDocument) {

    let fileInfo = []

    for(let chapterItem of chapterArr) {
        const {
            src,
            name,
            pageIndices
        } = chapterItem
        
        const copiedPages = await pdfDoc.copyPages(src, pageIndices)

        for(let page of copiedPages) {
            pdfDoc.addPage(page)
        }

        fileInfo.push(name)
    }

    return {
        pdfDoc,
        fileInfo
    }
}

