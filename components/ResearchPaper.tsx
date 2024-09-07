'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CiBookmark } from "react-icons/ci";
import { BiSolidBookmark } from "react-icons/bi";

interface ResearchPaperProps {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  citationsCount: number;
  description: string;
  handleSave: (id: string) => void
}

const ResearchPaper = ({
  id,
  title,
  authors,
  publicationYear,
  citationsCount,
  description,
  handleSave
}: ResearchPaperProps) => {
  const [clamp, setClamp] = useState(true)
  const [saved, setSaved] = useState(JSON.parse(localStorage.getItem('savedPapers') || "[]").includes(id))
  const handlePaperSave = () => {
    handleSave(id)
    setSaved(!saved)
  }
  return (
    <div className="flex flex-col m-8 shadow-lg px-10 py-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-sm md:text-lg">{title}</h1>
        <Button onClick={handlePaperSave} variant='secondary'>{saved ? <><BiSolidBookmark className="text-xl" /> &nbsp; <p className="hidden md:block">Saved</p></> : <><CiBookmark className="text-xl" /> &nbsp; <p className="hidden md:block">Save</p></>}</Button>
      </div>
      <p className="text-xs md:text-sm text-gray-500">
        {authors?.join(", ")} - {publicationYear}
      </p>
      <p className="text-xs md:text-sm text-gray-500">{citationsCount} citations</p>
      <p className={`text-sm md:text-base pt-2 ${clamp && 'line-clamp-2'}`}>{description}</p>
      <span onClick={() => setClamp(!clamp)} className="hover:underline cursor-pointer underline-offset-2 text-sm self-end">{clamp? 'Show more' : 'Show less'}</span>
    </div>
  );
};

export default ResearchPaper;
