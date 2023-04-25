import bcrypt from "bcrypt";
import OrmTable from "../lib/orm/table";
import OrmRecord, { RecordValue } from "../lib/orm/record";

interface AccountFields {
    id: number;
    username: string;
    passwd: string;
    create_at:string;
    update_at:string;
    create_by:number;
    update_by:number;
    locked:number;
}

type UserAdd = Exclude<AccountFields,"id"|"salt"|"create_at"|"update_at"|"update_by">;
type UserMod = Exclude<AccountFields,"passwd"|"salt"|"create_at"|"create_by"|"update_at">;

export default function Account() {
    return new OrmTable<AccountFields>("t_account", "id");
}

export async function useradd(params:UserAdd):Promise<RecordValue>{
    const {username,passwd,create_by,locked} = params;
    const hash_passwd = await bcrypt.hash(passwd,10);
    const account = Account().record({});
    account.set("username",username);
    account.set("passwd",hash_passwd);
    account.set("create_by",create_by);
    account.set("locked",locked);
    await account.save();
    return account.get("id");
}

export async function usermod(params:UserMod):Promise<any>{
    const {id,username,locked} = params;
    const account = Account().record(params);
    account.set("id",id);
    account.set("username",username);
    account.set("locked",locked);
    const res = await account.save();
    return res;
}

export async function passwd_verify(p1:string,p2:string):Promise<boolean>{
    const result = await bcrypt.compare(p1,p2);
    return result;
}

export function userfinder(){
    return Account().finder();
}

export async function find_by_username(username:string):Promise<OrmRecord<AccountFields>>{
    const finder = userfinder();
    const account = Account();
    finder
        .limit(0,1)
        .where({
            username
        });
    const result = await finder.fetchAll();
    if(result.length === 1){
        return account.record(result[0]);
    } else {
        return account.record({});
    }
}