// src/lib/getQuestions.ts
import fs from 'fs';
import path from 'path';

export async function getMarkdownData() {
  // Path to your markdown file
  const filePath = path.join(process.cwd(), 'src/content/React.md');
  
  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  return fileContent;
}