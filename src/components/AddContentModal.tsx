import { useEffect, useRef, useState } from "react";
import { Close } from "../icons/Close";
import { Button } from "./Button";
import axios from "axios";

export default function AddContentModal({
  open,
  onClose,
  fetch,
}: {
  open: boolean;
  onClose: () => void;
  fetch: () => void;
}) {
  const API_URL = useRef(import.meta.env.VITE_API_URL);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${API_URL.current}/content/tags`);
        const tagsList = response.data.tags.map(
          (tag: { title: string }) => tag.title
        );
        setPopularTags(tagsList.slice(0, 5));
      } catch (error) {
        console.error("Error fetching tags: ", error);
      }
    };
    fetchTags();
  }, []);

  const handleAdd = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title) {
      alert("Please enter a title");
      return;
    }

    try {
      await axios.post(
        `${API_URL.current}/content`,
        {
          title: title,
          link: link,
          description: description,
          tags: tags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`Error: ${e.response?.data.error}`);
      }
      console.log(e);
    } finally {
      fetch();
      onClose();
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setTags([]);
    onClose();
  };
  return (
    <>
      {open && (
        <>
          <div className="fixed h-screen w-screen bg-gray-400 opacity-50 z-4"></div>

          <div className="fixed h-screen w-screen z-10 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md w-1/2 max-w-130 relative">
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleClose}
              >
                <Close />
              </div>
              <h2 className="text-lg font-medium mb-4 text-center">
                Add Content
              </h2>
              <div className="m-3">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  name="title"
                  className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
                />
              </div>
              <div className="m-3">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="link"
                >
                  Link
                </label>
                <input
                  ref={linkRef}
                  type="text"
                  name="link"
                  className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
                />
              </div>
              <div className="m-3">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  ref={descriptionRef}
                  type="text"
                  name="description"
                  className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
                />
              </div>
              <div className="m-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs p-1 bg-blue-500 border border-cyan-600 rounded-lg text-white flex items-center"
                    >
                      #{tag}
                      <button
                        className="ml-1 text-white font-bold cursor-pointer"
                        onClick={() => removeTag(index)}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="text-sm">Popular Tags : </p>
                  {popularTags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs p-0.5 bg-blue-500 border border-cyan-600 rounded-lg text-white flex"
                    >
                      {" "}
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center mt-7">
                <Button
                  variant="primary"
                  size="md"
                  text="Add"
                  onClick={handleAdd}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
