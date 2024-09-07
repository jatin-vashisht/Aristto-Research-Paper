"use client";
import ResearchPaper from "@/components/ResearchPaper";
import { useEffect, useState } from "react";

interface PaperProps {
  _id: string;
  title: string;
  authors: string[];
  description: string;
  publicationYear: number;
  citationsCount: number;
}

export default function Home() {
  const [savedPapers, setSavedPapers] = useState([]);
  const allPapers = JSON.parse(localStorage.getItem("allPapers") || "[]");

  const updateSavedPapers = () => {
    const allSavedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");
    const idSet = new Set(allSavedPapers);
    setSavedPapers(allPapers.filter((paper: PaperProps) => idSet.has(paper._id)));
  };

  useEffect(() => {
    updateSavedPapers();
  }, []);

  const handleSave = (id: string) => {
    const allSavedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");
    let updatedSavedPapers;

    if (!allSavedPapers.includes(id)) {
      updatedSavedPapers = [...allSavedPapers, id];
    } else {
      updatedSavedPapers = allSavedPapers.filter((savedId: string) => savedId !== id);
    }

    localStorage.setItem("savedPapers", JSON.stringify(updatedSavedPapers));
    updateSavedPapers();
  };

  return (
    <div className="w-full max-w-5xl">
      {savedPapers.map(
        ({
          _id,
          title,
          authors,
          description,
          publicationYear,
          citationsCount,
        }) => (
          <ResearchPaper
            key={_id}
            id={_id}
            title={title}
            authors={authors}
            description={description}
            publicationYear={publicationYear}
            citationsCount={citationsCount}
            handleSave={handleSave}
          />
        )
      )}
    </div>
  );
}
