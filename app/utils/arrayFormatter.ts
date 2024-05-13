export const buildTreeView = (arr: any[]) => {
  if (!arr?.length) {
    return [];
  }

  const tree: { [key: number]: any } = {};

  arr.forEach((element) => {
    if (!element.parentId) {
      tree[element.id] = { ...element, children: [] };
    }
  });

  arr
    .filter((el) => el.parentId !== null)
    .forEach((element) => {
      const parent = tree[element.parentId as number];
      parent.children.push(element);
    });

  return Object.values(tree);
};
