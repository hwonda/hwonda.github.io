import lunr from 'lunr';
import { TermData } from '@/types';

const koTokenizer = (token: lunr.Token) => {
  return token.update((word: string) => {
    return word
      .normalize('NFC') // 유니코드 정규화 (자모 분리 방지)
      .replace(/^[^\w가-힣]+/, '') // 앞쪽 특수 문자 제거
      .replace(/[^\w가-힣]+$/, ''); // 뒤쪽 특수 문자 제거
  });
};

lunr.Pipeline.registerFunction(koTokenizer, 'koTokenizer');

// 검색 필드와 가중치 정의
const SEARCH_FIELDS = {
  titleEn: { boost: 10, path: (term: TermData) => term.title?.en },
  titleKo: { boost: 10, path: (term: TermData) => term.title?.ko },
  titleEtc: { boost: 8, path: (term: TermData) => term.title?.etc?.join(' ') },
  tags: { boost: 7, path: (term: TermData) => term.tags?.map((tag) => tag.name).join(' ') },
  descriptionShort: { boost: 3, path: (term: TermData) => term.description?.short },
  descriptionFull: { boost: 1, path: (term: TermData) => term.description?.full },
  termDescription: { boost: 1, path: (term: TermData) => term.terms?.map((t) => t.description).join(' ') },
  termTerm: { boost: 1, path: (term: TermData) => term.terms?.map((t) => t.term).join(' ') },
  usecaseExample: { boost: 1, path: (term: TermData) => term.usecase?.example },
  usecaseDescription: { boost: 1, path: (term: TermData) => term.usecase?.description },
  usecaseIndustries: { boost: 1, path: (term: TermData) => term.usecase?.industries?.join(' ') },
  tutorialTitles: { boost: 1, path: (term: TermData) => term.references?.tutorials?.map((t) => t.title).join(' ') },
  bookTitles: { boost: 1, path: (term: TermData) => term.references?.books?.map((b) => b.title).join(' ') },
  academicTitles: { boost: 1, path: (term: TermData) => term.references?.academic?.map((a) => a.title).join(' ') },
  opensourceTitles: { boost: 1, path: (term: TermData) => term.references?.opensource?.map((o) => o.name).join(' ') },
};

export function buildSearchIndex(terms: TermData[]) {
  return lunr(function (this: lunr.Builder) {
    this.pipeline.reset();
    this.searchPipeline.reset();
    this.pipeline.add(koTokenizer);
    this.searchPipeline.add(koTokenizer);

    // 필드 등록
    Object.entries(SEARCH_FIELDS).forEach(([field, { boost }]) => {
      this.field(field, { boost });
    });

    this.ref('id');

    terms.forEach((term, idx) => {
      const doc = {
        id: idx.toString(),
        ...Object.entries(SEARCH_FIELDS).reduce((acc, [field, { path }]) => ({
          ...acc,
          [field]: path(term) || '',
        }), {}),
      };
      this.add(doc);
    });
  });
}

function calculateScore(term: TermData, queryLower: string): number {
  return Object.entries(SEARCH_FIELDS).reduce((score, [, { boost, path }]) => {
    const value = (path(term) || '').toLowerCase();
    return score + ((value.split(queryLower).length - 1) * boost);
  }, 0);
}

function performFallbackSearch(terms: TermData[], queryLower: string): TermData[] {
  const matchingTerms = terms.filter((term) =>
    Object.values(SEARCH_FIELDS).some(({ path }) => {
      const value = path(term)?.toLowerCase() || '';
      return value.includes(queryLower);
    })
  );

  return matchingTerms
    .map((term) => ({ term, score: calculateScore(term, queryLower) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.term);
}

export function searchTerms(query: string, terms: TermData[]): TermData[] {
  if (!query.trim()) return [];

  const idx = buildSearchIndex(terms);
  const queryLower = query.toLowerCase();
  const words = queryLower.trim().split(/\s+/);

  const searchQueries = [
    `"${ query }"`,
    `${ query }*`,
    `*${ query }`,
    `${ query }~1`,
    ...words.filter((word) => word.length > 1).flatMap((word) => [word, `${ word }*`]),
  ];

  try {
    const allResults = searchQueries.flatMap((q) => {
      try {
        return idx.search(q);
      } catch {
        return [];
      }
    });

    const uniqueResults = Array.from(
      allResults.reduce((map, result) => {
        const existing = map.get(result.ref);
        if (!existing || existing.score < result.score) {
          map.set(result.ref, result);
        }
        return map;
      }, new Map())
    ).map(([, result]) => result);

    const filteredResults = uniqueResults
      .map((result) => terms[parseInt(result.ref)])
      .filter((term) =>
        Object.values(SEARCH_FIELDS).some(({ path }) => {
          const value = path(term)?.toLowerCase() || '';
          return value.includes(queryLower);
        })
      );

    if (filteredResults.length === 0) {
      return performFallbackSearch(terms, queryLower);
    }

    const scoredResults = filteredResults
      .map((term) => ({ term, score: calculateScore(term, queryLower) }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.term);

    return scoredResults.length > 0 ? scoredResults : performFallbackSearch(terms, queryLower);
  } catch (error) {
    console.log('error', error);
    return performFallbackSearch(terms, queryLower);
  }
}
