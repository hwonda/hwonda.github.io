import { firestore } from '@/libs/firebaseAdmin';
import { TermData } from '@/types';
import { transformToSlug } from '@/utils/filters';
import { store } from '@/store';
import { setTerms, setLoading, setError } from '@/store/termsSlice';

const fetchTermsData = async (): Promise<TermData[]> => {
  const state = store.getState();
  if (state.terms.terms.length > 0) {
    return state.terms.terms;
  }

  store.dispatch(setLoading(true));

  try {
    const termsCollection = await firestore.collection('terms').get();
    const termsData = termsCollection.docs.map((doc) => {
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

    store.dispatch(setTerms(termsData));
    return termsData;
  } catch (error) {
    const errorMessage = 'Error fetching terms: ' + error;
    store.dispatch(setError(errorMessage));
    console.error(errorMessage);
    return [];
  }
};

const getTermData = async (slug: string): Promise<TermData | undefined> => {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) =>
    transformToSlug(term.title?.en ?? '') === slug
  );
};

const clearCache = () => {
  store.dispatch(setTerms([]));
};

const getTermDataByID = async (id: number): Promise<TermData | undefined> => {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) => term.id === id);
};

export { fetchTermsData, getTermData, clearCache, getTermDataByID };