import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import fs from 'fs'
import Controllers from "./controllers";
import path from "path";
import config from 'config';

// @route   GET api/simList
// @desc    Get available simulations and chapters
router.get("/simList", (req: Request, res: Response) => {
    const data = Controllers.getData();
    return res.send(data);
});

// @route   POST api/generateSimulations
// @desc    Generate pdf simulation files
router.post("/generateSimulations", async (req: Request, res: Response) => {
    const { files, options } = req.body;

    if (files.length === 0) {
        res.status(400).send("Requires at least one file definition");
    }

    try {
        const {
            zipPath,
            tempFolderPath
        } = await Controllers.createSimulations(files, options);
        
        res.download(zipPath, 'mySimulations.zip', err => {
            if(err) {
                console.error(err)
            }

            console.log("Sent zip file");

            try {
                fs.rmdirSync(tempFolderPath, { recursive: true })

                console.log(`Deleted ${tempFolderPath} successfully`); 
            }

            catch(err) {
                console.error(err);

                // Cleanup - remove created folder if created
                if(tempFolderPath) {
                    fs.rmdirSync(tempFolderPath, { recursive: true })
                    console.log(`Successful cleanup for ${tempFolderPath}`)
                }
            }
        });

        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
});

export default router;
