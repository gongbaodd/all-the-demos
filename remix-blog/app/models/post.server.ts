import { db } from "../db.server";

type Post = {
  slug: string;
  title: string;
};

const posts: Post[] = [
  { slug: "my-first-post", title: "My First Post" },
  { slug: "my-second-post", title: "My Second Post" },
];

export async function getPosts() {
  // return posts;
  return db.post.findMany();
}

export async function getPost(slug: string) {
  // return posts.find((post) => post.slug === slug);
  return db.post.findUnique({
    where: { slug },
  });
}
