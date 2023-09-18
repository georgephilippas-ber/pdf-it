import {ImFilePdf} from "react-icons/im";
import {MdDelete} from "react-icons/md";

export function ListElement({file, onClick, onDelete}: {
    file: File,
    onClick?: (file: File) => void,
    onDelete?: (file: File) => void
})
{
    return (
        <div className={"flex flex-row gap-2 p-3 items-center cursor-pointer"} onClick={event => onClick?.(file)}>
            <div className={"text-2xl"}>
                <ImFilePdf/>
            </div>
            <div className={"whitespace-nowrap overflow-hidden select-accent"}>
                {file.name.toUpperCase().endsWith(".PDF") ? file.name.slice(0, file.name.length - 4) : file.name}
            </div>
            <div className={"text-xl ml-auto"} onClick={event =>
            {
                onDelete?.(file);
                event.stopPropagation();
            }}>
                <MdDelete/>
            </div>
        </div>
    )
}

export function List({files, onDelete, onClick}: {
    files: File[],
    onClick?: (file: File) => void,
    onDelete?: (file: File) => void
})
{
    return (files.length ?
            <div className={"mt-4 max-w-md hidden lg:flex lg:flex-col border-2 rounded-xl p-2"}>
                {files.map((value, index) =>
                {
                    return <ListElement key={index} onClick={onClick} onDelete={onDelete} file={value}/>
                })}
            </div> : null
    )
}
