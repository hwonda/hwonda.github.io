import Stars from '@/components/ui/Stars';
import MarkdownContent from '../MarkdownContent';

interface DifficultyLevelProps {
  level: number;
  description: string;
}

const DifficultyLevel = ({ level, description }: DifficultyLevelProps) => {
  return (
    <div className="group mt-1 p-2 sm:p-4 border border-light rounded-lg">
      <div className='flex items-center gap-2 mb-1'>
        <span className="h-[31px] text-primary font-bold text-[18px]">{'난이도 '}</span>
        <Stars rating={level} />
      </div>
      <div className='markdown-text-sub'>
        <MarkdownContent content={description} />
      </div>
    </div>
  );
};

export default DifficultyLevel;