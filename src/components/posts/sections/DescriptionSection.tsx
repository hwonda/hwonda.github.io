import MarkdownContent from '../MarkdownContent';
import { MathJaxProvider } from '../MathJaxProvider';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  if(!description) return null;
  return (
    <section className='group mt-10'>
      <h2 className='flex items-center'>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'개념'}
      </h2>
      <MathJaxProvider>
        <MarkdownContent content={description} />
      </MathJaxProvider>
    </section>
  );
};

export default DescriptionSection;