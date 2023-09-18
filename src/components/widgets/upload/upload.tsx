import {ChangeEvent, useState} from "react";

export function Upload({onContentsUploaded, onFileSelected}: {
    onContentsUploaded?: (fileContents: ArrayBuffer) => void,
    onFileSelected?: (file: File) => void
})
{
    const [fileSize, setFileSize] = useState<string | undefined>(undefined);

    const [status, setStatus] = useState<string>("");

    function onChange(event: ChangeEvent<HTMLInputElement>)
    {
        if (event.target?.files && event.target.files.length)
        {
            onFileSelected?.(event.target.files[0]);

            setFileSize((event.target.files[0].size / 1_024.).toFixed(2));

            if (onContentsUploaded)
            {

                const fileReader = new FileReader();

                fileReader.onload = ev =>
                {
                    if (ev.target?.result)
                        onContentsUploaded?.(ev.target?.result as ArrayBuffer)
                }

                fileReader.onprogress
                {
                    setStatus("locally uploading")
                }

                fileReader.onloadend
                {
                    setStatus("locally available")
                }

                fileReader.readAsArrayBuffer(event.target.files[0]);
            }
        }
    }

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Select a file</span>
                <span className="label-text-alt">{fileSize ? [fileSize, "kB"].join(" ") : null}</span>
            </label>
            <input onChange={onChange} type="file" accept={"application/pdf"}
                   className="file-input file-input-bordered w-full max-w-xs"/>
            <label className="label">
                <span className="label-text-alt">{status}</span>
            </label>
        </div>
    );
}