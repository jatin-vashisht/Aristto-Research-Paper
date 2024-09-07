'use server'
import Paper from "../models/paper.model";
import { connectToDatabase } from "../mongoose";

interface PaperProps {
  title: string;
  authors: string[];
  description: string;
  publicationYear: number;
  citationsCount: number;
}

export async function getAllPapers() {
  try {
    await connectToDatabase();

    const allPapers = await Paper.find({});
    return allPapers;
  } catch (error: any) {
    console.log(`Failed to get papers: ${error.message}`);
    throw new Error(error.message);
  }
}

export async function addPaper({title, authors, description, publicationYear, citationsCount}: PaperProps) {
  try {
    await connectToDatabase();
    const newPaper = new Paper({
      title,
      authors,
      description,
      publicationYear,
      citationsCount,
    });
    await newPaper.save();
  } catch (error: any) {
    console.log(`Failed to add paper: ${error.message}`);
    throw new Error(error.message);
  }
}

export async function searchPaper(query: string | null){
  console.log(query)
  try{
    await connectToDatabase();
    const regexQuery = { $regex: query, $options: "i" };
    let results = []

    const types = ['title', 'authors', 'description']

    for(const type of types){
      const queryresults = await Paper.find({[type]: regexQuery})
      if(queryresults.length > 0){
        results.push(...queryresults)
      }
    }
    return results;

  } catch(error: any){
    console.log(`Failed to search paper: ${error.message}`)
    throw new Error(error.message);
  }
}