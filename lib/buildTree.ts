/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildTree(folders: any[], files: { folderId: string | number; }[]) {
  const map: Record<string | number, any> = {};

  folders.forEach((folder: { id: string | number; }) => {
    map[folder.id] = {
      ...folder,
      type: "folder",
      children: [],
    };
  });

  const root: any[] = [];

  folders.forEach(
    (folder: { parentId: string | number; id: string | number }) => {
      if (folder.parentId) {
        map[folder.parentId]?.children.push(map[folder.id]);
      } else {
        root.push(map[folder.id]);
      }
    },
  );

  files.forEach((file: { folderId: string | number; }) => {
    const node = {
      ...file,
      type: "file",
    };

    if (file.folderId) {
      map[file.folderId]?.children.push(node);
    } else {
      root.push(node);
    }
  });

  return root;
}
