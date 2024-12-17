import readingTime from 'reading-time';
import { FetchTermData } from '@/types';

const getReadingTime = (term: FetchTermData) => {
  const allTextContent = `
    ${ term.description?.full ? term.description.full : '' }
    ${ term.difficulty && term.difficulty.description ? term.difficulty.description : '' }
    ${ term.relevance?.analyst?.description ? term.relevance.analyst.description : '' }
    ${ term.relevance?.engineer?.description ? term.relevance.engineer.description : '' }
    ${ term.relevance?.scientist?.description ? term.relevance.scientist.description : '' }
    ${ term.usecase && term.usecase.example ? term.usecase.example : '' }
    ${ term.usecase && term.usecase.description ? term.usecase.description : '' }
  `;

  const stats = readingTime(allTextContent);
  const minutes = Math.ceil(stats.minutes);
  return `${ minutes }분`;
};

export { getReadingTime };