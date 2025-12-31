// src/app/page.tsx
import { getMarkdownData } from "@/lib/getQuestions";
import { parseInterviewQuestions } from "@/lib/test";
import QuestionList from "@/components/QuestionList";

export default async function HomePage() {
  // 1. Fetch the raw markdown string from your file
  const rawContent = await getMarkdownData();

  // 2. Parse that string into an array of objects {id, question, answer}
  const questions = parseInterviewQuestions(rawContent);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <header className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            React Interview Vault
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-3">
            Analyzing {questions.length} questions for your upcoming Senior
            Developer rounds.
          </p>
        </header>

        {/* 3. Pass the parsed data to the Searchable Client Component */}
        <QuestionList questions={questions} />
      </div>
    </main>
  );
}
