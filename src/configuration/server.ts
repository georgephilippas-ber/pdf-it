const development_server: boolean = true;

class Server
{
    private readonly development_server_address: string = "http://localhost:8080";
    private readonly production_server_address: string = "http://live-tick-optionally.ngrok-free.app";

    constructor(private development_server_: boolean)
    {

    }

    public get_address(): string
    {
        return this.development_server_ ? this.development_server_address : this.production_server_address;
    }

    public resolve(relative_path: string)
    {
        return [this.get_address(), relative_path].join("");
    }
}

export const server: Server = new Server(development_server);
