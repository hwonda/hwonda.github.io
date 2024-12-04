import RadarChart from '@/components/GLRadarChart';
import Stars from '@/components/ui/Stars';

interface RelevanceSectionProps {
  analyst: {
    score: number;
    description: string;
  };
  engineer: {
    score: number;
    description: string;
  };
  scientist: {
    score: number;
    description: string;
  };
}

const RelevanceElement = ({ title, score, description }: { title: string, score: number, description: string }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-background-secondary rounded-[8px_8px_0_0] px-3.5 py-1">
        <strong className='font-bold'>{title}</strong>
        <Stars rating={score} size={12} />
      </div>
      <span className="border border-extreme-light rounded-[0_0_8px_8px] px-3.5 py-1 lg:py-2.5 flex-1">{description}</span>
    </div>
  );
};

const RelevanceSection = ({ analyst, engineer, scientist }: RelevanceSectionProps) => {
  return (
    <section className="group">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'직무 연관도'}
      </h2>
      <div className='w-full flex justify-center items-center'>
        <RadarChart
          targetData={[analyst.score,scientist.score,engineer.score]}
          labelData={['Analyst', 'Scientist', 'Engineer']}
          init
        />
      </div>
      <div className='grid lg:grid-cols-3 gap-4'>
        <RelevanceElement title="Analyst" score={analyst.score} description={analyst.description} />
        <RelevanceElement title="Engineer" score={engineer.score} description={engineer.description} />
        <RelevanceElement title="Scientist" score={scientist.score} description={scientist.description} />
      </div>
    </section>
  );
};

export default RelevanceSection;