import MarkdownContent from '../MarkdownContent';
import Level from '@/components/ui/Level';

interface DifficultyLevelProps {
  level?: number;
  description?: string;
}

const DifficultyLevel = ({ level, description }: DifficultyLevelProps) => {
  if(!level) return null;

  return (
    <div className="group">
      <div className='flex gap-2 items-start'>
        <div>
          <Level level={level} />
        </div>
        {
          description ? (
            <div className='markdown-text-sub my-0.5'>
              <MarkdownContent content={description} />
            </div>
          ) : (
            <div className='markdown-text-sub'>
              <span>{'난이도 설명 없음'}</span>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default DifficultyLevel;