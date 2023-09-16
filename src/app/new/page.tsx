"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

function NewPage({ params }: { params: { id: string } }) {
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();

  console.log(params);
  useEffect(() => {
    if (params.id) {
      axios.get(`/api/tasks/${params.id}`).then((res) => {
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      });
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await axios.put(`/api/tasks/${params.id}`, data);
    } else {
      await axios.post("/api/tasks", data);
    }
    router.push("/");
    router.refresh();
  });

  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-2/6 bg-slate-800 px-4 py-8 rounded-lg"
      >
        <h1 className="text-3xl font bold text-center py-3">
          {params.id ? "Update Task" : "Create Task"}
        </h1>
        <label htmlFor="title" className="font-bold text-xs">
          Write your title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Write a title"
          className="w-full px-3 py-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2"
          {...register("title")}
        />
        <label htmlFor="title" className="font-bold text-xs">
          Write your description
        </label>
        <textarea
          id="description"
          placeholder="Write a description"
          className="px-3 py-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full mb-2"
          {...register("description")}
        ></textarea>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-[80px] mt-2 px-3 py-2 bg-sky-500 rounded-md font-semibold hover:bg-sky-700"
          >
            {params.id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="w-[80px] mt-2 px-3 py-2 bg-red-500 rounded-md font-semibold hover:bg-red-700"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this task?")) {
                await axios.delete(`/api/tasks/${params.id}`);
                router.push("/");
                router.refresh();
              }
            }}
          >
            delete
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewPage;
