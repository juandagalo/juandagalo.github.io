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

export interface BlogEntry extends PostEntry {
  body: string;
  data: PostEntry["data"] & {
    draft?: boolean;
    lang: string;
  };
}
