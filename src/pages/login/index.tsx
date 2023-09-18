import {LogoFake} from "@/components/logo/logo";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {isAuthenticated, password_valid, username_valid} from "@/security/authentication";

export default function Login()
{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    useEffect(() =>
    {
        if (isAuthenticated())
            router.push("/");

    }, []);

    function performLogin()
    {
        if (username === username_valid && password === password_valid)
        {
            window.localStorage.setItem("crypticPhrase", [username_valid, password_valid].join(" "));

            router.push("/");
        } else
        {
            setUsername(username_valid);
            setPassword(password_valid);
        }
    }

    return (!isAuthenticated() ?
            <form onSubmit={event => event.preventDefault()} className={"mx-auto p-4 max-w-lg w-4/5 "}>
                <div className={"flex justify-center mb-8"}>
                    <LogoFake maxHeight={"12em"}/>
                </div>
                <div className={"flex flex-col gap-4 mb-4"}>
                    <input value={username} onChange={event => setUsername(event.target.value)} type="text"
                           placeholder="username" className="input input-bordered w-full"/>
                    <input value={password} onChange={event => setPassword(event.target.value)} type="password"
                           placeholder="password" className="input input-bordered w-full"/>
                </div>
                <div className={"flex justify-center"}>
                    <button type={"submit"} onClick={performLogin}
                            className={"btn"}>Login
                    </button>
                </div>
            </form> : <div></div>
    );
}
