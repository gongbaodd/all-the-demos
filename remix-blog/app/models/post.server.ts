type Post = {
  slug: string;
  title: string;
};

export async function getPosts() {
  const posts: Post[] = [
    { slug: "my-first-post", title: "My First Post" },
    { slug: "my-second-post", title: "My Second Post" },
  ];

  return posts;
}
