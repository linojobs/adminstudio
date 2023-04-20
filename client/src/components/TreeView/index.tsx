import classNames from "classnames";
import React, { useCallback } from "react";

const Tree:React.FC<TreeViewProps> = (props) => {

    const {dataSource} = props;

    const toggle = useCallback((target:HTMLElement)=>{
        if(target.firstElementChild?.classList.contains("fa-caret-down")){
            target.firstElementChild?.classList.remove("fa-caret-down");
            target.parentElement?.classList.remove("TreeActive");
        }else{
            target.firstElementChild?.classList.add("fa-caret-down");
            target.parentElement?.classList.add("TreeActive");
        }
    },[]);

    const handleRef = useCallback((ele:HTMLDivElement)=>{
        ele.addEventListener("click",(e:MouseEvent)=>{
            const target = e.target as HTMLElement;
            if(target.dataset.role === "toggle"){
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                toggle(target);
            }
        });
    },[]);

    return (
        <div className="Tree" ref={handleRef}>
            <ul>
                {
                    dataSource.map(node=>(
                        <TreeNode key={node.id} {...node} />
                    ))
                }
            </ul>
        </div>
    );
};

const TreeNode:React.FC<TreeViewNode> = (node) => {
    const TreeCaretClass = classNames({
        TreeCaret:true,
        pointer:node.children.length !== 0
    });
    return (
        <li>
            <div data-role="toggle" data-node-id={node.id} className={TreeCaretClass}>
                {
                    node.children.length === 0 ? <>&#183;</> : (
                        <span className="fa fa-caret-right none-event"></span>
                    )
                }
            </div>
            <div className="TreeLabel">{node.title}</div>
            <div className="TreeNested">
                {
                    node.children.length === 0 ? <></> : (
                        <ul>
                            {
                                node.children.map(node=>(
                                    <TreeNode key={node.id} {...node} />
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </li>
    );
};

export default Tree;