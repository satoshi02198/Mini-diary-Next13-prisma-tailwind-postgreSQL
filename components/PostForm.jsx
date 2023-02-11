"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function submitPost(e) {
    e.preventDefault();
    const data = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    const res = await data.json();
    setTitle("");
    setContent("");
    router.refresh();
    if (!res.ok) console.log(res.message);
  }

  return (
    <form
      onSubmit={submitPost}
      className="flex flex-col justify-center items-center "
    >
      <label className="font-bold">title</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className=" border border-solid border-gray-300 transition ease-in-out m-0  focus:bg-slate-100  focus:border-lime-500 focus:outline-none"
      />
      <label className="font-bold">Contet</label>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        cols={40}
        rows={5}
        className="form-control block  px-3 py-1.5 text-base font-normal bg-clip-padding  border border-solid border-gray-300 transition ease-in-out m-0  focus:bg-slate-100  focus:border-lime-500 focus:outline-none"
      />
      <button
        type="submit"
        className="text-gray-800 bg-gray-400 rounded-md inline-block px-4 py-1 text-lg mt-4 shadow-sm hover:bg-gray-300 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transision duration-150 ease-in-out"
      >
        create post
      </button>
    </form>
  );
}
