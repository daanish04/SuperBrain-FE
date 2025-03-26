import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card, { CardProps } from "../components/Card";
import { Print } from "../icons/Print";
import axios from "axios";

export default function PublicShare() {
  const API_URL = useRef(import.meta.env.VITE_API_URL);
  const [user, setUser] = useState<string | null>(null);
  const [content, setContent] = useState<CardProps[]>([]);
  const { shareLink } = useParams();
  console.log(`render`);
  const fetchContent = async (link: string) => {
    try {
      const res = await axios.get(`${API_URL.current}/brain/${link}`, {});
      setContent(res.data.content);
      if (res.data.content?.length > 0 && res.data.content[0]?.userId?.name)
        setUser(res.data.content[0].userId.name);
      else setUser(res.data.content.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.error}`);
      }
    }
  };

  useEffect(() => {
    if (shareLink) {
      fetchContent(shareLink);
    }
  }, [shareLink]);

  return (
    <>
      <div className="px-5 w-full min-h-screen bg-gray-100">
        <div className="py-2 flex justify-between items-center gap-1.5">
          <div className="flex gap-2">
            <Print />
            <h1 className="text-blue-700 text-2xl font-bold cursor-default">
              SuperBrain
            </h1>
          </div>
          <div className="flex gap-9 items-center">
            <h3 className="text-lg font-medium ">{`You're exploring, ${user}'s Brain`}</h3>
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-wrap gap-4">
          {content.length > 0 ? (
            content.map(({ _id, title, link, description, tags }) => (
              <Card
                key={_id}
                _id={_id}
                title={title}
                link={link}
                description={description}
                tags={
                  Array.isArray(tags)
                    ? tags.map((tag) =>
                        typeof tag === "string" ? { title: tag } : tag
                      )
                    : []
                }
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg p-10">No content available</p>
          )}
        </div>
      </div>
    </>
  );
}
