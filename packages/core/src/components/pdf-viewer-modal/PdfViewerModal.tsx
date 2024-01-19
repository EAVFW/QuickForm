"use client";
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import styles from './PdfViewerModal.module.css';
import { Button } from '..';
import SpinnerComponent from '../spinner/Spinner';
import classNames from 'classnames';

type Props = {
    onClose: () => void;
    pdf: {
        url: string;
        title: string;
    }
};

const PdfViewerModalContext = createContext<React.Dispatch<React.SetStateAction<Partial<Props["pdf"]>>> | undefined>(undefined);
export const usePdfViewerModal = () => useContext(PdfViewerModalContext)! ?? (() => { throw new Error("Not registered") })();
export const PdfViewerModal: React.FC<PropsWithChildren> = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
     

    const pdfstate = useState<Partial<Props["pdf"]>>({});

    const { title, url } = pdfstate[0];
    const onClose = () => pdfstate[1]({});
    const showPDF = typeof url !== "undefined"

    return (<PdfViewerModalContext.Provider value={pdfstate[1]}>
        {loading && (
            <div className={classNames(styles.overlay, { [styles.overlayVisible]: loading || showPDF })}>
                <SpinnerComponent speed='medium' message='Loading PDF...' />
            </div>
        )}
        {!!url && <div className={styles.pdfModalContainer}>
            <div className={styles.pdfModalContent}>
                <Button style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', paddingRight: '50px' }} onClick={onClose}>X</Button>
                {/*<div id="pdf" className={styles.iframe}>*/}
                {/*    <object width="100%" height="650" type="application/pdf" data={`${pdf.url}#zoom=85&scrollbar=0&toolbar=0&navpanes=0`} id="pdf_content" style={{'pointerEvents': 'none'}}>*/}
                {/*        <p>Insert your error message here, if the PDF cannot be displayed.</p>*/}
                {/*    </object>*/}
                {/*</div>*/}
                <iframe
                    className={styles.iframe}
                    src={url}
                    title={title}
                    allowFullScreen
                    style={{ border: 0 }}
                ></iframe>
                <Button style={{ display: 'flex', justifyContent: 'center' }} onClick={onClose}>Close</Button>
            </div>
           
        </div>
        }
        {children}
    </PdfViewerModalContext.Provider>
    );
};

