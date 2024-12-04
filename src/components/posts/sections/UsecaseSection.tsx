import MarkdownContent from '../MarkdownContent';

interface UsecaseSectionProps {
  usecase: {
    industries: string[],
    example: string,
    description: string
  }
}

const UsecaseSection = ({ usecase }: UsecaseSectionProps) => {
  return (
    <section className="group">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'사용사례'}
      </h2>
      <div className="flex flex-wrap gap-1 mb-3">
        {usecase.industries.map((tag, index) => (
          <span
            key={index}
            className="tag-button-no-link bg-extreme-light text-sm mb-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <MarkdownContent content={usecase.example} />
      <MarkdownContent content={usecase.description} />
    </section>
  );
};

export default UsecaseSection;