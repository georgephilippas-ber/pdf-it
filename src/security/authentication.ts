export const username_valid: string = "demo";
export const password_valid: string = "demo";

export function isAuthenticated()
{
    try
    {
        return localStorage.getItem("crypticPhrase") === [username_valid, password_valid].join(" ");
    } catch (e)
    {
        return "";
    }
}
