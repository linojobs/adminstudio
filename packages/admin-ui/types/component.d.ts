interface BootProps{
    status:"idle"|"booting"|"end"|"failed"
    onBoot():void;
}

interface LoginPageProps{
    onSubmit():void;
}

// TreeView
interface TreeViewNode{
    id:string;
    title:string;
    children:TreeViewNode[];
}

interface TreeViewProps{
    dataSource:TreeViewNode[];
}

// DataGridView
interface DataGridViewColumn{
    title:string;
    dataIndex:string;
}

interface DataGridViewProps{
    columns:DataGridViewColumn[];
    dataSource:Record<string,string|number|object>[];
}