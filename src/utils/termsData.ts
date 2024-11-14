import { firestore } from '@/lib/firebaseAdmin';
import { TermData } from '@/types';

let cachedTermsData: TermData[] | null = null;
let unsubscribe: (()=> void) | null = null;

const subscribeToTermsData = (updateCallback: (data: TermData[])=> void) => {
  unsubscribe = firestore.collection('terms').onSnapshot((snapshot) => {
    cachedTermsData = snapshot.docs.map((doc) => {
      const data = doc.data();
      const urlPath = data.title.en.toLowerCase().replace(/\s+/g, '-');
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
    updateCallback(cachedTermsData);
  });
};

const fetchTermsData = async (): Promise<TermData[]> => {
  if (cachedTermsData) {
    return cachedTermsData;
  }

  return new Promise((resolve) => {
    subscribeToTermsData((data) => {
      cachedTermsData = data;
      resolve(data);
    });
  });
};

const getTermData = async (slug: string): Promise<TermData | undefined> => {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) =>
    term.title.en.toLowerCase().replace(/\s+/g, '-') === slug
  );
};

const clearCache = () => {
  cachedTermsData = null;
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};

export { fetchTermsData, getTermData, clearCache };