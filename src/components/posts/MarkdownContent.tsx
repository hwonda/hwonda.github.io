'use client';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  const parseMarkdown = (text: string) => {
    let html = text
      .replace(/<br\s*\/?>/gi, '\n\n')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n\s*\n/g, '\n\n');
    html = html.split('\n\n').map((paragraph) =>
      paragraph.trim() ? `<p>${ paragraph.trim() }</p>` : ''
    ).join('');
    return html;
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

export default MarkdownContent;