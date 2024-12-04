import { firestore } from '@/libs/firebaseAdmin';
import { TermData } from '@/types';
import { transformToSlug } from '@/utils/filters';

let cachedTermsData: TermData[] | null = null;

const fetchTermsData = async (): Promise<TermData[]> => {
  if (cachedTermsData) {
    return cachedTermsData;
  }

  try {
    const termsCollection = await firestore.collection('terms').get();
    cachedTermsData = termsCollection.docs.map((doc) => {
      const data = doc.data();
      const urlPath = transformToSlug(data.title.en);
      return {
        url: `/posts/${ urlPath }`,
        id: data.id,
        usecase: data.usecase,
        relevance: data.relevance,
        difficulty: data.difficulty,
        title: data.title,
        tags: data.tags,
        terms: data.terms,
        publish: data.publish,
        metadata: data.metadata,
        references: data.references,
        description: data.description,
      } as TermData;
    });
  } catch (error) {
    console.error('Error fetching terms:', error);
    cachedTermsData = [];
  }

  return cachedTermsData;
};

const getTermData = async (slug: string): Promise<TermData | undefined> => {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) =>
    transformToSlug(term.title.en) === slug
  );
};

const clearCache = () => {
  cachedTermsData = null;
};

export { fetchTermsData, getTermData, clearCache };