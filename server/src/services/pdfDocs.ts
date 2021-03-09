import fsImport from 'fs'
const fs = fsImport.promises
import path from 'path'
import { PDFDocument, PDFPage } from 'pdf-lib'
import { Chapter } from '../interfaces'
import { createCanvas } from 'canvas'


export async function initPdfDoc(
    name: string,
    folderPath: string) {
    const pdfDoc = await PDFDocument.create()

    // Add first page with text
    const page = pdfDoc.addPage()

    // Create text image and add it to the first page
    const imagePath = await addTitle(name, page, folderPath)
    const jpegBytes = await fs.readFile(imagePath)
    
    const jpegImage = await pdfDoc.embedPng(jpegBytes)
    page.drawImage(jpegImage)
    
    // Delete text image
    await fs.unlink(imagePath)

    // Add blank page
    pdfDoc.addPage()

    return pdfDoc
}

export async function addTitle(
    name: string, 
    page: PDFPage,
    folderPath: string) {
    const { width, height } = page.getSize()

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    context.font = '80px Arial'
    context.textAlign = 'center'
    context.fillStyle = "#000"
    const text = 'סימולציה'
    context.fillText(text, width/2, height/2)

    context.font = '40px Arial'
    context.fillText(name, width/2, height/2 + 100)
    const buffer = canvas.toBuffer()
    const imagePath = path.join(folderPath, 'title.png')
    await fs.writeFile(imagePath, buffer)

    return imagePath
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

