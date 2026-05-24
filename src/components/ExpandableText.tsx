"use client";
import { useState } from "react";

interface Props {
  text: string;
}

export default function ExpandableText({ text }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? text
    : `${text.split(" ").slice(0, 20).join(" ")}...`;

  return (
    <div>
      <p className="text-gray-300 leading-relaxed text-lg inline">
        {displayText}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-teal-400 font-semibold ml-2 hover:text-teal-300 transition-colors"
      >
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
}
