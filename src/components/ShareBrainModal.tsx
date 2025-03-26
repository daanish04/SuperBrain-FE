import { useRef, useState } from "react";
import { Close } from "../icons/Close";
import { Button } from "./Button";
import axios from "axios";

export default function ShareBrainModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const API_URL = useRef(import.meta.env.VITE_API_URL);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [unshareLoading, setUnshareLoading] = useState(false);

  const handleShareBrain = (share: boolean) => {
    setTimeout(async () => {
      try {
        const link = await axios.post(
          `${API_URL.current}/brain/share`,
          {
            share: share,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setShareLink(
          share ? `${window.location.origin}${link.data.link}` : null
        );
      } catch (e) {
        alert(`Failed to update Brain sharing. Error: ${e}`);
        return;
      } finally {
        setShareLoading(false);
        setUnshareLoading(false);
      }
    }, 500);
    // clearTimeout(timeout);
  };
  return (
    <>
      {open && (
        <>
          <div className="fixed h-screen w-screen bg-gray-400 opacity-50 z-4"></div>

          <div className="fixed h-screen w-screen z-10 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-md w-1/2 relative">
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={onClose}
              >
                <Close />
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <h2 className="text-center text-darkgrey font-medium text-xl">
                  Share your Brain ?
                </h2>
                <h3 className="text-center text-darkgrey font-medium text-lg">
                  Share your thoughts with others
                </h3>
                {shareLink ? (
                  <div className="text-center text-darkgrey font-medium text-md">
                    Share Link:{" "}
                    <a
                      href={shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-pink underline font-bold text-md"
                    >
                      {shareLink}
                    </a>
                  </div>
                ) : (
                  <div className="text-center text-darkgrey font-medium text-md">
                    Your Brain is not being shared.
                  </div>
                )}
                <div className="flex flex-col gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    text={shareLoading ? "Sharing" : "Yes"}
                    onClick={() => {
                      setShareLoading(true);
                      handleShareBrain(true);
                    }}
                  />
                  <Button
                    variant="secondary"
                    size="md"
                    text={unshareLoading ? "Unsharing" : "No"}
                    onClick={() => {
                      setUnshareLoading(true);
                      handleShareBrain(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
