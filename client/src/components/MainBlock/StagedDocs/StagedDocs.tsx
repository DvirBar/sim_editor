import React, { Component, useRef, useState } from 'react'
import { Documents } from '../../../interfaces/simData'
import useOnClickOutside from '../../Common/OnClickOutside/useOnClickOutside'
import StagedDocItem from './StagedDocItem/StagedDocItem'
import './StagedDocs.css'

interface IProps {
    documents: Documents
    display: boolean
    changeDisplay: (status: boolean) => void
}

const StagedDocs: React.FC<IProps> = ({ 
    documents, 
    display, 
    changeDisplay }) => {

    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(
        ref, 
        display, 
        () => changeDisplay(false))
    
    return (
        <div className="staged-docs-wrapper">
            <div className={`staged-docs-mask
            ${display ? 'display' : ''}`}></div>
            <div 
            ref={ref}
            className={`staged-docs 
            ${display ? 'display' : ''}`}>
                <div className="staged-docs__container">
                    <div>
                        <p className="staged-docs__title">
                            הסימולציות שלי:
                        </p>
                        <p className="staged-docs__subtitle">
                            ניתן ליצור עד 10 סימולציות
                        </p>
                    </div>

                    <div className="staged-docs__list">
                        {Object.keys(documents).map(key =>
                            <StagedDocItem 
                            key={key}
                            id={key} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StagedDocs
   

