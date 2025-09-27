"use client";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import MyMarkdown from "../Markdown/Markdown";
const questions = ["What services does it provide?", "How to use it?"];

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `api/chat`,
      onError: (e: unknown) => {
        console.error(e);
      },
    });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesContainerRef = useRef<HTMLUListElement | null>(null);
  const handleQuestionClick = (question: string) => {
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  return (
    <section className="flex flex-col h-96 bg-slate-200 text-foregroundReverse rounded-lg">
      <section className="flex flex-col w-full flex-1 relative overflow-hidden">
        <ul
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-4 px-4 py-2 h-80"
        >
          {messages.map((m, index) => (
            <div
              key={index}
              className={`${m.role === "user" ? "ml-[25%]" : "mr-[25%]"}`}
            >
              <li
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`rounded-t-lg ${
                    m.role === "user" ? "rounded-l-lg" : "rounded-r-lg"
                  } p-1 bg-background text-foreground shadow-md w-fit overflow-hidden`}
                >
                  <MyMarkdown>{m.content}</MyMarkdown>
                </div>
              </li>
            </div>
          ))}
          {isLoading && (
            <li className="flex flex-row max-h-8">
              <div className="rounded-t-lg rounded-r-lg p-1 shadow-md flex flex-col max-w-3/4">
                <div className="flex gap-1 items-center h-8 w-fit">
                  <div className="w-1 h-full bg-foreground animate-wave [animation-delay:0s]"></div>
                  <div className="w-1 h-full bg-foreground animate-wave [animation-delay:0.1s]"></div>
                  <div className="w-1 h-full bg-foreground animate-wave [animation-delay:0.2s]"></div>
                  <div className="w-1 h-full bg-foreground animate-wave [animation-delay:0.3s]"></div>
                  <div className="w-1 h-full bg-foreground animate-wave [animation-delay:0.4s]"></div>
                </div>
              </div>
            </li>
          )}
        </ul>
        {messages.length === 0 && (
          <section className="absolute bottom-20 w-full flex flex-wrap gap-2 justify-center">
            {questions.map((q) => (
              <button
                key={q}
                className="p-2 border border-borderReverse rounded-xl mx-2"
                onClick={() => handleQuestionClick(q)}
              >
                {q}
              </button>
            ))}
          </section>
        )}
      </section>
      <section className="p-2 mt-auto">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <input
            value={input}
            ref={inputRef}
            onChange={handleInputChange}
            placeholder="Ask way"
            className="w-full flex-1 rounded-lg border-2 bg-transparent px-3 py-2.5 text-sm text-foregroundReverse border-borderReverse outline-none transition-colors focus:outline-none disabled:border-0 placeholder:text-rose-500"
          />
          <button
            className="m-1 p-1 rounded-lg bg-background text-foreground"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};
export default Chat;
