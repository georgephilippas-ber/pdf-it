function HeadingLevel(level: number)
{
    const MAX_LEVEL: number = 3;

    let class_: { [key_ in number]: string } =
        {
            1: "text-6xl",
            2: "text-4xl",
            3: "text-2xl",
        };

    return ({children}: { children: any }) => <div className={level > 0 && level <= MAX_LEVEL ? class_[level] : ""}>
        {children}
    </div>
}

export const markdownComponents: any =
    {
        h1: HeadingLevel(1),
        h2: HeadingLevel(2),
        h3: HeadingLevel(3),
    };