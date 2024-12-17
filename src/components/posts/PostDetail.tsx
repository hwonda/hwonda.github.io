import TableOfContents from '@/components/common/TableOfContents';
import PostHeader from './sections/PostHeader';
import DifficultyLevel from './sections/DifficultyLevel';
import DescriptionSection from './sections/DescriptionSection';
import RelevanceSection from './sections/RelevanceSection';
import RelatedTermsSection from './sections/RelatedTermsSection';
import UsecaseSection from './sections/UsecaseSection';
import ReferencesSection from './sections/ReferencesSection';
import RecommendationSection from './sections/RecommendationSection';
import { TermData } from '@/types';

interface Props {
  term: TermData
  slug: string
}

const PostDetail = async ({ term, slug }: Props) => {
  return (
    <div className='prose block md:grid md:grid-cols-[1fr_5fr]'>
      <TableOfContents title={term.title?.ko ?? ''} />
      <div className='md:mr-40 text-justify'>
        <PostHeader term={term} slug={slug} />
        <div className='animate-introSecond sm:ml-5'>
          <DifficultyLevel
            level={term.difficulty?.level ?? 0}
            description={term.difficulty?.description ?? ''}
          />
          <DescriptionSection description={term.description?.full ?? ''} />
          <RelatedTermsSection terms={term.terms ?? []} />
          <RelevanceSection
            analyst={term.relevance?.analyst ?? { score: 0, description: '' }}
            engineer={term.relevance?.engineer ?? { score: 0, description: '' }}
            scientist={term.relevance?.scientist ?? { score: 0, description: '' }}
          />
          <UsecaseSection usecase={term.usecase ?? { industries: [], example: '', description: '' }} />
          <ReferencesSection references={term.references ?? { tutorials: [], books: [], academic: [], opensource: [] }} />
          <RecommendationSection />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;