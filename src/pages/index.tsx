import {Upload} from "@/components/widgets/upload/upload";
import {useEffect, useState} from "react";
import {DocumentContainer} from "@/components/pdf/document-container";
import {List} from "@/components/widgets/list-element-with-icon/list-element";
import {useRouter} from "next/router";

import {isAuthenticated} from "@/security/authentication";

const clipboardExtractionMessages =
    {
        success: "success!",
        error: "an error occurred",
        default: "extract text to clipboard",
        progress: "extracting..."
    }

export default function Home()
{
    const [currentlyDisplayedFile, setCurrentlyDisplayedFile] = useState<File | undefined>(undefined);
    const [textContent, setTextContent] = useState<string | undefined>(undefined);

    const [files, set_files] = useState<File[]>([]);

    const [buttonCaption, setButtonCaption] = useState<string>(clipboardExtractionMessages.default);

    const router = useRouter();

    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() =>
    {
        if (!isAuthenticated())
            router.push("/login");
        else
            setAuthenticated(true);
    }, []);

    return authenticated ? <>
        <div className={"w-full flex flex-col lg:flex-row md:gap-4 h-screen"}>
            <div className={""}>
                <Upload onFileSelected={file1 =>
                {
                    console.log(file1.name);
                    setCurrentlyDisplayedFile(file1);

                    if (!files.filter(value => value.name === file1.name && value.size === file1.size).length)
                        set_files([...files, file1]);
                }}/>
                <button disabled={!textContent} onClick={event =>
                {
                    setButtonCaption(clipboardExtractionMessages.progress);

                    if (textContent)
                        navigator.clipboard.writeText(textContent).then(value =>
                        {
                            setButtonCaption(clipboardExtractionMessages.success);
                        }).catch(reason => setButtonCaption(clipboardExtractionMessages.error)).finally(() =>
                        {
                            setTimeout(args => setButtonCaption(clipboardExtractionMessages.default), 2_000);
                        });
                }}
                        className={["btn", "mb-2 w-full", !textContent ? "hidden" : null].filter(value => value).join(" ")}>
                    {buttonCaption}
                </button>
                <List onClick={file => setCurrentlyDisplayedFile(file)} onDelete={file1 =>
                {
                    const filtered_ = files.filter(value => value !== file1);

                    if (file1 === currentlyDisplayedFile)
                    {
                        setCurrentlyDisplayedFile(filtered_?.[0]);
                        setTextContent(undefined);
                    }

                    set_files(filtered_);
                }} files={files}/>
            </div>
            <div className={"w-fit h-full overflow-scroll"}>
                {currentlyDisplayedFile &&
                    <DocumentContainer file={currentlyDisplayedFile} getTextContent={setTextContent}/>}
            </div>
        </div>
    </> : <div></div>;
}

// import Image from 'next/image'
// import {Inter} from 'next/font/google'
//
// const inter = Inter({subsets: ['latin']})
//
// export default function Home() {
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/pages/index.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>
//
//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>
//
//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>
//
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>
//
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>
//
//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
