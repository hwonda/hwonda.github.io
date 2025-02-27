import MarkdownContent from '../MarkdownContent';
import { Usecase } from '@/types';

interface UsecaseSectionProps {
  usecase: Usecase
}

const UsecaseSection = ({ usecase }: UsecaseSectionProps) => {
  if((!usecase.industries || usecase.industries.length === 0) && !usecase.example && !usecase.description) return null;

  return (
    <section className="group-section">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-section-title transition-opacity">{'#'}</span>
        {'사용 사례'}
      </h2>
      <div className="flex flex-wrap gap-1 mb-3">
        {usecase.industries?.map((tag, index) => (
          <span
            key={index}
            className="tag-button-no-link text-sub text-sm mb-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className='flex flex-col gap-3'>
        <MarkdownContent content={usecase.example ?? ''} />
        <MarkdownContent content={usecase.description ?? ''} />
      </div>
    </section>
  );
};

export default UsecaseSection;