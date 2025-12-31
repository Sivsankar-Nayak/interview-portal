// src/lib/parseMarkdown.ts

export interface QuestionEntry {
  id: number;
  question: string;
  answer: string;
}

export function parseInterviewQuestions(content: string): QuestionEntry[] {
  // We split by the heading (assuming ### Question Name)
  // This regex looks for '###' at the start of a line
  const sections = content.split(/^### /m).filter(Boolean);

  return sections.map((section, index) => {
    const lines = section.split('\n');
    const question = lines[0].trim();
    const answer = lines.slice(1).join('\n').trim();

    return {
      id: index,
      question,
      answer,
    };
  });
}