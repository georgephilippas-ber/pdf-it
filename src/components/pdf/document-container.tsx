import {useEffect, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export function DocumentContainer({file, getTextContent}: {
    file: File,
    getTextContent?: (textContent: string) => void
})
{
    useEffect(() =>
    {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.js',
            import.meta.url,
        ).toString();
    }, []);

    const [numPages, set_numPages] = useState<number | undefined>(undefined);

    return (
        <>
            <Document className={"w-fit"} file={file} onLoadSuccess={document =>
            {
                set_numPages(document.numPages);

                Promise.all(Array(document.numPages).fill(0).map(async (value, index) =>
                {
                    return (await (await document.getPage(index + 1)).getTextContent()).items.filter(value2 => (value2 as any)?.["str"]).map(value1 => (value1 as any)["str"]).reduce((previousValue, currentValue) => previousValue + currentValue, "");
                })).then(value => getTextContent?.(value.reduce((previousValue, currentValue) => previousValue + currentValue, "")));
            }}>

                {numPages ? Array(numPages).fill(0).map((value, index) =>
                {
                    return <div className={"w-fit"} key={index}>
                        <Page className={"w-fit h-fit shadow shadow-amber-50"} pageIndex={index}/>
                        <div className={"h-6 text-center mb-2 mt-1"}>page {index + 1} of {numPages}</div>
                    </div>
                }) : null}
            </Document>
        </>)
}
