'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-semibold text-slate-lightest mt-12 mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-slate-lightest mt-10 mb-4">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-slate-lightest mt-8 mb-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-slate-light leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-accent hover:underline"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-slate-light">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-light">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 italic text-slate my-6">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-navy-light text-accent px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-navy-light p-4 rounded-md overflow-x-auto text-sm font-mono">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-navy-light p-4 rounded-md overflow-x-auto my-6">
            {children}
          </pre>
        ),
        hr: () => <hr className="border-grey-dark my-8" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-lightest">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
