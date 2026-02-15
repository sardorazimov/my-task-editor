import { create } from "zustand";

type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  parentId?: string | null;
  content?: string;
};

type Store = {

  nodes: Node[];

  selectedId?: string;

  createFile: (name: string, parentId?: string) => void;

  createFolder: (name: string, parentId?: string) => void;

  select: (id: string) => void;

};

export const useExplorerStore = create<Store>((set, get) => ({

  nodes: [],

  createFile: (name, parentId) =>
    set({
      nodes: [
        ...get().nodes,
        {
          id: crypto.randomUUID(),
          name,
          type: "file",
          parentId,
          content: "",
        },
      ],
    }),

  createFolder: (name, parentId) =>
    set({
      nodes: [
        ...get().nodes,
        {
          id: crypto.randomUUID(),
          name,
          type: "folder",
          parentId,
        },
      ],
    }),

  select: (id) =>
    set({
      selectedId: id,
    }),

}));
