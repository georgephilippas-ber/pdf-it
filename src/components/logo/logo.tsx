export function LogoFake({maxHeight = "4em"}: {
    maxHeight?: number | string
})
{
    return <img className={"object-contain rounded-3xl opacity-75"} style={{maxHeight}} alt={"logo"}
                src={"./26f872fbec8c4ad59a775f5f93b7ce34.png"}/>
}
