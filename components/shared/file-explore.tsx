/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { buildTree } from "@/lib/buildTree";

function TreeNode({ node, onOpen }: { node: any; onOpen: (node: any) => void }) {

    const [open, setOpen] = useState(true);


    if (node.type === "folder") {

        return (
            <div>

                <div
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                >
                    📁 {node.name}
                </div>

                {open && (
                    <div className="ml-4">
                        {node.children.map((child: any) => (
                            <TreeNode
                                key={child.id}
                                node={child}
                                onOpen={onOpen}
                            />
                        ))}
                    </div>
                )}

            </div>
        );
    }

    return (
        <div
            className="cursor-pointer"
            onClick={() => onOpen(node)}
        >
            📄 {node.name}
        </div>
    );
}

export default function FileExplorer({ onOpen }: { onOpen: (node: any) => void }) {

    const [tree, setTree] = useState<any[]>([]);

    useEffect(() => {

        async function load() {

            const folders = await fetch("/api/folders").then(r => r.json());
            const files = await fetch("/api/files").then(r => r.json());

            setTree(buildTree(folders, files));

        }

        load();

    }, []);


    return (
        <div className="w-64 bg-neutral-900 text-white p-2">

            {tree.map(node => (
                <TreeNode
                    key={node.id}
                    node={node}
                    onOpen={onOpen}
                />
            ))}

        </div>
    );
}
