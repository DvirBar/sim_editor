import fsImport from 'fs'
const fs = fsImport.promises
import { PDFDocument } from 'pdf-lib'
import { Chapter } from '../interfaces'

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