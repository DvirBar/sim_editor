import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()
import Controllers from './controllers'


// @route   GET api/simList
// @desc    Get available simulations and chapters
router.get('/simList', 
(req: Request, res: Response) => {
    const data = Controllers.getData()
    return res.send(data)
})