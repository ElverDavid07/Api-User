export interface User extends Credential{
    name: string,
    email:string,
    password:string,
    state:"active" | "inactive"
}