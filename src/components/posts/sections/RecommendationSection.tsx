import PostCard from '@/components/posts/PostCard';
import { fetchTermsData } from '@/utils/termsData';

const RecommendationSection = async () => {
  const terms = await fetchTermsData();

  const recentTerms = [...terms]
    .sort((a, b) => new Date(b.metadata.updated_at).getTime() - new Date(a.metadata.updated_at).getTime())
    .slice(0, 6);

  return (
    <div className='flex flex-col items-center gap-2 border-t border-background-secondary mt-10 pt-14'>
      <h2>{'추천 포스트'}</h2>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-3 gap-4">
          {recentTerms.map((term) => (
            <div
              key={term.id}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <PostCard
                key={term.url}
                term={term}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;
