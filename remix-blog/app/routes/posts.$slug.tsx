import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "Missing slug");
  const post = await getPost(params.slug);
  invariant(post, "Post not found");
  const html = marked(post.markdown);
  return json({ post, html });
}

export default function Post() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  );
}
