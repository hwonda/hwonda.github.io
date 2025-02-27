import RelevanceCard from '@/components/ui/RelevanceCard';
import { Relevance } from '@/types';

// Tailwind 브레이크포인트에 맞춰 화면 폭 체크 훅
// function useIsSmallScreen() {
//   const [isSmall, setIsSmall] = useState(false);
//   useEffect(() => {
//     const checkScreen = () => {
//       // 640px(sm) 이하인지 여부
//       setIsSmall(window.innerWidth < 640);
//     };
//     checkScreen();
//     window.addEventListener('resize', checkScreen);
//     return () => window.removeEventListener('resize', checkScreen);
//   }, []);
//   return isSmall;
// }

interface RelevanceSectionProps {
  analyst: Relevance['analyst'];
  engineer: Relevance['engineer'];
  scientist: Relevance['scientist'];
}

export default function RelevanceSection({ analyst, engineer, scientist }: RelevanceSectionProps) {
  // const [inView, setInView] = useState(false);
  // const sectionRef = useRef<HTMLDivElement>(null);

  // // 작은 화면 판별
  // const isSmallScreen = useIsSmallScreen();

  // const nullRelevance
  //   = !analyst?.description && !engineer?.description && !scientist?.description
  //   && !analyst?.score && !engineer?.score && !scientist?.score;

  // // 화면이 md 이상일 때만 IntersectionObserver로 애니메이션 처리
  // useEffect(() => {
  //   if (isSmallScreen) return; // 작은 화면일 경우 애니메이션 로직 무시

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       const ratio = entry.intersectionRatio;
  //       // 30% 이상 보이면 inView = true, 미만이면 false
  //       if (ratio >= 0.3) setInView(true);
  //       else if (ratio < 0.3) setInView(false);
  //     },
  //     { threshold: [0, 0.3, 0.5, 0.7, 1] }
  //   );

  //   const currentRef = sectionRef.current;
  //   if (currentRef) observer.observe(currentRef);

  //   return () => {
  //     if (currentRef) observer.unobserve(currentRef);
  //   };
  // }, [isSmallScreen]);

  // 최고 점수 계산
  // const maxScore = Math.max(
  //   analyst?.score ?? 0,
  //   engineer?.score ?? 0,
  //   scientist?.score ?? 0
  // );

  // if (nullRelevance) return null;

  return (
    <section className='group-section relative bg-cover bg-center size-full'>
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-section-title transition-opacity">
          {'#'}
        </span>
        {'직무 연관도'}
      </h2>

      {/* <div className={isSmallScreen
        ? 'sm-carousel-wrapper overflow-x-auto flex gap-4 snap-x snap-mandatory scroll-smooth'
        : `cards-container ${ inView ? 'show' : '' } grid items-stretch grid-cols-3 gap-3`}
      > */}
      <div className="grid items-stretch grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 gap-3">
        {analyst && (
          <RelevanceCard
            title="데이터 분석가"
            subtitle="Data Analyst"
            score={analyst.score ?? 0}
            description={analyst.description ?? ''}
          />
        )}
        {scientist && (
          <RelevanceCard
            title="데이터 과학자"
            subtitle="Data Scientist"
            score={scientist.score ?? 0}
            description={scientist.description ?? ''}
          />
        )}
        {engineer && (
          <RelevanceCard
            title="데이터 엔지니어"
            subtitle="Data Engineer"
            score={engineer.score ?? 0}
            description={engineer.description ?? ''}
          />
        )}
      </div>
    </section>
  );
}
