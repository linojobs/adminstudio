import { TreeViewNode } from "@adminstudio/components"

export async function getMenus(): Promise<TreeViewNode[]> {
    return [
        {
            id: "1",
            title: "Menu1",
            children: [
                {
                    id: "2",
                    title: "Child1",
                    children: []
                }
            ]
        },
        {
            id: "3",
            title: "Menu2",
            children: []
        }
    ];
}