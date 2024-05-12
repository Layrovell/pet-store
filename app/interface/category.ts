export type CategoryType = {
  id: number;
  description: string;
  name: string;
  parentId: number | null;
};

export type CategoryNavigationType = CategoryType & {
  children: CategoryType[];
};
