import PostCard from '@/components/posts/PostCard';
import { fetchTermsData } from '@/utils/termsData';

const RecommendationSection = async () => {
  const terms = await fetchTermsData();

  const recentTerms = [...terms]
    .sort((a, b) => new Date(b.metadata?.created_at ?? '').getTime() - new Date(a.metadata?.created_at ?? '').getTime())
    .slice(0, 6);

  if(recentTerms.length < 6) return null;

  return (
    <div className='flex flex-col gap-2 border-t border-background-secondary my-10 pt-4'>
      <span className='text-sub text-lg'>{'추천 포스트'}</span>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTerms.map((term) => (
            <div
              key={term.id}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <PostCard
                key={term.url}
                term={term}
                size='sm'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;
