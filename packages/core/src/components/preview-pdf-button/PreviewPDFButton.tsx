import React, { useMemo, useState } from 'react';
import SpinnerComponent from '../spinner/Spinner';
import classNames from 'classnames';
import styles from "./PreviewPDFButton.module.css";
import { Button } from '..';
import { PdfViewerModal, usePdfViewerModal } from '../pdf-viewer-modal/PdfViewerModal';
import { useCurrentQuestion, useQuickForm } from '../../context/QuickFormContext';

type Props = {
    style?: React.CSSProperties;
    onBtnClick?: () => void;
};

const PreviewPDFButton: React.FC<Props> = ({ style, onBtnClick }) => {
  
    const { questionState: { pdfpreviewurl } } = useQuickForm();
    const handleOnPreviewPDFBtnClicked = () => {
        //setLoading(true);
        ///* TODO: Implement PDF-fetching here @Poul @Thyge */
        //setTimeout(() => {
        //    setLoading(false);
        //    setShowPDF(true);
        //}, 2000);

        
        pdfmodal({ url: pdfpreviewurl, title: "PDF Preview" });

    };

    const pdfmodal = usePdfViewerModal();
   // const loading = useMemo(() => showPDF && !pdfpreviewurl, [showPDF, pdfpreviewurl]);
    //const handleClosePDFViewer = () => {
    //    setShowPDF(false);
       
    //};

    return (
        <div>
            

            <Button
                style={style}
                onClick={onBtnClick ? onBtnClick : handleOnPreviewPDFBtnClicked}>
                Preview PDF
            </Button>

            {/*{showPDF && !!pdfpreviewurl && (*/}
            {/*    <PdfViewerModal*/}
            {/*        onClose={handleClosePDFViewer}*/}
            {/*        // Pass data to the PdfViewerModal component*/}
            {/*        pdf={{*/}
            {/*            url: pdfpreviewurl,*/}
            {/*            title: "PDF Preview"*/}
            {/*        }}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

export default PreviewPDFButton;
