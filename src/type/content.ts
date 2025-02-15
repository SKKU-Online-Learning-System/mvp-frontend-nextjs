export type ContentType = {
  id: number;
  type: "YOUTUBE" | "INFLEARN";
  title: string;
  description: string;
  author: string;
  link: string;
  thumbnail_url: string;
  tags: string[];
};

export type ContentDetailType = {
  id: number;
  type: "YOUTUBE" | "INFLEARN";
  title: string;
  description: string;
  author: string;
  link: string;
  thumbnail_url: string;
  tags: string[];
};
