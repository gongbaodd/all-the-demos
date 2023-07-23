import { Prisma, Post } from "@prisma/client";
import { db } from "../db.server";


export async function getPosts() {
  return db.post.findMany();
}

export async function getPost(slug: string) {
  return db.post.findUnique({
    where: { slug },
  });
}

export async function createPost(post: Prisma.PostCreateInput) {
  return db.post.create({ data: post });
}