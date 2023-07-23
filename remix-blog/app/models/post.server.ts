import { Prisma } from "@prisma/client";
import { db } from "../db.server";


export async function getPosts() {
  return db.post.findMany();
}

export async function getPost(slug: string) {
  return db.post.findUnique({
    where: { slug },
  });
}

type Post = Prisma.PostCreateInput;

export async function createPost(post: Post) {
  return db.post.create({ data: post });
}