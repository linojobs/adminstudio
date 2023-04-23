import OrmTable from "../lib/orm/table";

interface AccountFields {
    id: number;
    username: string;
    passwd: string;
}

export default function Account() {
    return new OrmTable<AccountFields>("t_account", "id");
}