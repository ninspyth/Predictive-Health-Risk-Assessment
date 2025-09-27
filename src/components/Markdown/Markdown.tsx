/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from 'remark-gfm';

export default function MyMarkdown({ children }: { children: any }) {

    const copyToClipboard = (s: string) => {
        navigator.clipboard.writeText(s);
    }

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p({ node, ...props }) {
                    return (
                        <p
                            className="leading-relaxed text-base"
                            {...props}
                        />
                    );
                },
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const lang = match?.[1];
                    if (match) {
                        return (
                            <div className="my-4 rounded-lg overflow-auto text-sm relative bg-white m-4">
                                <button className="border rounded-lg absolute right-2 top-2" onClick={() => copyToClipboard(String(children).replace(/\n$/, ""))}>Copy</button>
                                <SyntaxHighlighter
                                    language={lang}
                                    PreTag="div"
                                    customStyle={{
                                        borderRadius: 8,
                                        fontSize: 15,
                                        margin: 0,
                                        padding: 20,
                                        background: "inherit",
                                    }}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </div>
                        );
                    }
                    return (
                        <code
                            className="bg-gray-800 text-orange-400 px-2 py-0.5 rounded text-sm"
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                table({ node, ...props }) {
                    return (
                        <div className="overflow-x-auto my-6 rounded-lg border border-gray-700 shadow-sm">
                            <table className="min-w-[600px] w-full text-sm text-gray-200">
                                {props.children}
                            </table>
                        </div>
                    );
                },
                thead({ node, ...props }) {
                    return (
                        <thead className="bg-gray-800/90 text-gray-100">{props.children}</thead>
                    );
                },
                tbody({ node, ...props }) {
                    return <tbody className="divide-y divide-gray-700">{props.children}</tbody>;
                },
                tr({ node, ...props }) {
                    return (
                        <tr className="even:bg-gray-800/40 hover:bg-rose-900 transition">
                            {props.children}
                        </tr>
                    );
                },
                th({ node, ...props }) {
                    return (
                        <th className="px-4 py-2 font-bold border border-gray-700 bg-gray-800 text-left whitespace-nowrap">
                            {props.children}
                        </th>
                    );
                },
                td({ node, ...props }) {
                    return (
                        <td className="px-4 py-2 border border-gray-700 bg-gray-900 whitespace-nowrap align-top">
                            {props.children}
                        </td>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
}