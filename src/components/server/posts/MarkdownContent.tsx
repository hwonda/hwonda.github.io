import ReactMarkdown from 'react-markdown';

const MarkdownContent = ({ content }: { content: string }) => {
  const processedContent = content
    .replace(/\*\*([^*]+)\*\*([^*])/g, '**$1** $2')
    .replace(/<br\s*\/?>/gi, '\n\n');

  return (
    <ReactMarkdown>
      {processedContent}
    </ReactMarkdown>
  );
};

export default MarkdownContent;