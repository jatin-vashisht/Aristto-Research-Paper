"use client";
import ResearchPaper from "@/components/ResearchPaper";
import { demoPapers } from "@/constants/data";
import {
  addPaper,
  getAllPapers,
  searchPaper,
} from "@/lib/actions/paper.action";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [researchPapers, setResearchPapers] = useState<any>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    (async () => {
      // const handleAdd = async () => {
      //   for(let i=0 ; i<demoPapers.length ; i++) {
      //     const {title, authors, description, publicationYear, citationsCount} = demoPapers[i]
      //     await addPaper({title, authors, description, publicationYear, citationsCount});
      //     console.log(`Added paper ${demoPapers[i].title}`)
      //   }
      // }
      // handleAdd()      // feed demo data into the database
      const papers = await getAllPapers();
      setResearchPapers(papers);
      localStorage.setItem("allPapers", JSON.stringify(papers));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!query) {
        const allPapers = await getAllPapers();
        setResearchPapers(allPapers);
        return;
      }
      const filteredPapers = await searchPaper(query);
      setResearchPapers(filteredPapers);
    })();
  }, [query]);

  const handleSave = (id: string) => {
    const savedPapers = JSON.parse(localStorage.getItem("savedPapers") || "[]");
    if (!savedPapers.includes(id)) {
      savedPapers.push(id);
      localStorage.setItem("savedPapers", JSON.stringify(savedPapers));
    } else {
      const remainingSaved = savedPapers.filter(
        (savedId: any) => savedId !== id
      );
      localStorage.setItem("savedPapers", JSON.stringify(remainingSaved));
    }
  };

  return (
    <div className="w-full max-w-5xl">
      {researchPapers.map(
        ({
          _id,
          title,
          authors,
          description,
          publicationYear,
          citationsCount,
        }: any) => (
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
