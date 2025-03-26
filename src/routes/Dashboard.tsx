import { useEffect, useState } from "react";
import AddContentModal from "../components/AddContentModal";
import { Button } from "../components/Button";
import Card, { CardProps } from "../components/Card";
import { Plus } from "../icons/Plus";
import { Print } from "../icons/Print";
import { Share } from "../icons/Share";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShareBrainModal from "../components/ShareBrainModal";
import { API_URL } from "../config";

export default function Dashboard() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [content, setContent] = useState<CardProps[]>([]);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContent(res.data.content);
      if (res.data.content?.length > 0 && res.data.content[0]?.userId?.name)
        setUserName(res.data.content[0].userId.name);
      else setUserName(res.data.content.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.error}`);
      }
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Do you really want to delete this content?")) return;
    try {
      await axios.delete(`${API_URL}/content/`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { id },
      });
      setContent((prevContents) =>
        prevContents.filter((item) => item._id !== id)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.error}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <>
      <AddContentModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        fetch={fetchContent}
      />
      <ShareBrainModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      <div className="px-5 w-full min-h-screen bg-gray-100">
        <div className="py-2 flex justify-between items-center gap-1.5">
          <div className="flex gap-2">
            <Print />
            <h1 className="text-blue-700 text-2xl font-bold cursor-default">
              SuperBrain
            </h1>
          </div>
          <div className="flex gap-9 items-center">
            <h3 className="text-lg font-medium ">{`Hi, ${userName}`}</h3>
            <Button
              variant="action"
              size="md"
              text="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2 mb-4 px-4">
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<Share />}
            onClick={() => setShareModalOpen(true)}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            startIcon={<Plus />}
            onClick={() => setAddModalOpen(true)}
          />
        </div>
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
                onDelete={handleDelete}
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
