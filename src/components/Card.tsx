export interface CardProps {
  _id: string;
  link?: string;
  title: string;
  description?: string | null;
  tags?: { title: string }[];
  onDelete?: (id: string) => void;
}
import { Delete } from "../icons/Delete";
import { GoLink } from "../icons/GoLink";
import { TitleHere } from "../icons/TitleHere";

export default function Card(props: CardProps) {
  return (
    <div className="flex flex-col justify-around border bg-teapink border-gray-400 p-4 rounded-sm p-3 shadow-sm sm:w-71 sm:h-70 w-full max-h-70 relative group">
      <div className="flex justify-between w-full text-xl">
        <div className="flex gap-1 items-center">
          <TitleHere />
          <h2 className="font-bold text-deepblue">{props.title}</h2>
        </div>
        <div className="flex gap-2 items-center">
          {props.link ? (
            <a
              href={props.link}
              aria-label={`Visit ${props.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoLink col="blue" />
            </a>
          ) : (
            <GoLink col="grey" />
          )}
          {props.onDelete && (
            <div
              onClick={() => props.onDelete?.(props._id)}
              className="cursor-pointer"
              aria-label="Delete Card"
            >
              <Delete />
            </div>
          )}
        </div>
      </div>
      <div
        className="p-3 text-slate-600 text-sm line-clamp-7"
        title={props.description || ""}
      >
        {props.description ? (
          props.description
        ) : (
          <div className="opacity-65 flex justify-center">No Description</div>
        )}
      </div>
      <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar">
        {props.tags &&
          props.tags.map((tag) => (
            <span
              key={tag.title}
              className="text-xs p-0.5 border border-blue-600 rounded-lg text-white bg-blue-600"
            >
              {`#${tag.title}`}
            </span>
          ))}
      </div>
    </div>
  );
}
