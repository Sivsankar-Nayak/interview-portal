// ...existing code...
"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionEntry } from "@/lib/test";
import toc from "@/data/thereact-toc.json";

export default function QuestionList({
  questions,
}: {
  questions: QuestionEntry[];
}) {
  const [search, setSearch] = useState("");
  // scroll to hash targets inside accordions after navigation
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash?.replace("#", "");
      if (!hash) return;
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* anchor target for in-markdown "Back to Top" links */}{" "}
      <div
        id="table-of-contents"
        aria-hidden
        className="pointer-events-none -mt-6"
      />
      {/* Table of contents (generated from content) */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="toc">
          <AccordionTrigger className="text-left text-lg font-medium">
            Table of contents
          </AccordionTrigger>
          <AccordionContent className="prose max-w-none">
            <ul>
              {toc.map((h: { level: number; text: string; id: string }) => (
                <li key={h.id} style={{ marginLeft: (h.level - 1) * 12 }}>
                  <a href={`#${h.id}`} className="text-sky-600 hover:underline">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search questions (e.g. 'hooks', 'closure')..."
        className="w-full p-3 rounded-lg border border-slate-200 dark:bg-slate-900"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Accordion type="single" collapsible className="w-full">
        {filteredQuestions.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeHighlight]}
              >
                {item.answer}
              </ReactMarkdown>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
// ...existing code...
