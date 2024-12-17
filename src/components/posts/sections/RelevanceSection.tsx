// import RadarChart from '@/components/GLRadarChart';
import Stars from '@/components/ui/Stars';
import { Relevance } from '@/types';

interface RelevanceSectionProps {
  analyst: Relevance['analyst'];
  engineer: Relevance['engineer'];
  scientist: Relevance['scientist'];
}

const RelevanceElement = ({ title, score, description }: { title: string, score: number, description: string }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-background-secondary rounded-[8px_8px_0_0] px-3.5 py-1">
        <strong className='font-bold py-1'>{title}</strong>
        {
          score !== 0 && (
            <Stars rating={score} size={12} />
          )
        }
      </div>
      {
        description && (
          <span className="border border-extreme-light border-t-0 text-sm rounded-[0_0_8px_8px] px-3.5 py-1 lg:py-2.5 flex-1 break-all">{description}</span>
        )
      }
    </div>
  );
};

const RelevanceSection = ({ analyst, engineer, scientist }: RelevanceSectionProps) => {
  const nullRelevance
    = !analyst?.description && !engineer?.description && !scientist?.description
    && !analyst?.score && !engineer?.score && !scientist?.score;
  if(nullRelevance) return null;

  return (
    <section className="group">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'직무 연관도'}
      </h2>
      {/* <div className='w-full flex justify-center items-center'>
        <RadarChart
          targetData={[analyst.score,scientist.score,engineer.score]}
          labelData={['Analyst', 'Scientist', 'Engineer']}
          init
        />
      </div> */}
      <div className='grid lg:grid-cols-3 gap-4'>
        {
          analyst && (
            <RelevanceElement title="데이터 분석가" score={analyst.score ?? 0} description={analyst.description ?? ''} />
          )
        }
        {
          engineer && (
            <RelevanceElement title="데이터 엔지니어" score={engineer.score ?? 0} description={engineer.description ?? ''} />
          )
        }
        {
          scientist && (
            <RelevanceElement title="데이터 과학자" score={scientist.score ?? 0} description={scientist.description ?? ''} />
          )
        }
      </div>
    </section>
  );
};

export default RelevanceSection;