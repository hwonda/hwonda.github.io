import '@/app/style/card.css';

interface CardComponentProps {
  score: number;
  description: string;
  title: string;
  subtitle: string;
  className?: string;
}

const levelColors = {
  1: 'level-1',
  2: 'level-2',
  3: 'level-3',
  4: 'level-4',
  5: 'level-5',
} as const;

const RelevanceCard = ({
  score,
  description,
  title,
  subtitle,
  className,
}: CardComponentProps) => {
  let tag = '';
  let relevance = '';

  switch (title) {
    case '데이터 분석가':
      tag = 'DA';
      break;
    case '데이터 엔지니어':
      tag = 'DE';
      break;
    case '데이터 과학자':
      tag = 'DS';
      break;
  }

  switch (score) {
    case 1:
      relevance = '희박';
      break;
    case 2:
      relevance = '낮음';
      break;
    case 3:
      relevance = '보통';
      break;
    case 4:
      relevance = '높음';
      break;
    case 5:
      relevance = '밀접';
      break;
  }

  return (
    <div className={`group rounded-lg border overflow-hidden flex flex-col relative ${ className }
      transition-transform duration-300 backdrop-blur-xl bg-white/5
      border-gray1`}
    >
      <div className="p-2.5 lg:p-4 flex flex-col gap-2 opacity-90 flex-1 relative z-10">
        <div className="flex justify-between items-center">
          <span className="flex items-center font-semibold text-primary">
            {tag}{' | '}
            {subtitle}
          </span>
          <span className={`text-${ levelColors[score as keyof typeof levelColors] } text-xs border border-${ levelColors[score as keyof typeof levelColors] } rounded-full px-1.5 py-0.5`}>{relevance}</span>
        </div>
        {/* <div className="w-full flex">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="flex-1 flex flex-col items-center">
              <span
                className={`text-center text-xs mb-0.5 font-semibold ${ level === score
                  ? `text-${ levelColors[level as keyof typeof levelColors] }`
                  : 'opacity-0'
                }`}
              >
                {level === score ? relevance : '-'}
              </span>
              <div
                className={`h-2 w-full ${ level < 5
                  ? `bg-gradient-to-r from-${ levelColors[level as keyof typeof levelColors] } to-${ levelColors[(level + 1) as keyof typeof levelColors] }`
                  : `bg-${ levelColors[level as keyof typeof levelColors] }`
                } ${ level === 1 ? 'rounded-l-full' : '' } ${ level === 5 ? 'rounded-r-full' : '' }`}
              />
            </div>
          ))}
        </div> */}
        <div className="card-description text-sub text-sm font-semibold">{description}</div>
      </div>
    </div>
  );
};

export default RelevanceCard;
