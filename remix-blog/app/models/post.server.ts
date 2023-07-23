import { db } from "../db.server";

export async function getPosts() {
  return db.post.findMany();
}
