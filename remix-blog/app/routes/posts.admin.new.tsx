import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { createPost } from "~/models/post.server";

export async function action({ request }: ActionArgs) {
    await new Promise(res => setTimeout(res, 1000))

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const markdown = formData.get("markdown") as string;
    await createPost({ title, slug, markdown });
    return redirect("/posts/admin");
}

const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";

export default function NewPost() {
  const navigation = useNavigation()
  const isCreating = navigation.state === "submitting"
  
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input
            type="text"
            name="title"
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input
            type="text"
            name="slug"
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}