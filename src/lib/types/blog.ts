export interface PostEntry {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags: string[];
  };
}
