import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()
import Controllers from './controllers'
import path from 'path'
import { sliceString } from './utils'

// @route   GET api/simList
// @desc    Get available simulations and chapters
router.get('/simList', 
(req: Request, res: Response) => {
    const data = Controllers.getData()
    return res.send(data)
})

// @route   POST api/generateSimulations
// @desc    Generate pdf simulation files
router.post('/generateSimulations', 
async(req: Request, res: Response) => {
    const {
        files,
        options
    } = req.body

    if(files.length === 0) {
        res.status(400).send("Requires at least one file definition")
    }

    try {
        const zipFilePath = await Controllers
            .createSimulations(files, options)

        const dirname = sliceString(__dirname, '\src') 
        
        return res.sendFile(path.join(dirname, zipFilePath))
    }
    catch(err) {
        console.error(err)
        return res.status(500).send("Internal server error")
    }
})

export default router