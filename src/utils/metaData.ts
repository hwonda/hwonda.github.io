import readingTime from 'reading-time';
import { FetchTermData } from '@/types';

const getReadingTime = (term: FetchTermData) => {
  const allTextContent = `
    ${ term.description.full }
    ${ term.difficulty.description }
    ${ term.relevance.analyst.description }
    ${ term.relevance.engineer.description }
    ${ term.relevance.scientist.description }
    ${ term.usecase.example }
    ${ term.usecase.description }
    ${ term.references.tutorials.map((t) => t.title).join(' ') }
    ${ term.references.books.map((b) => b.title).join(' ') }
    ${ term.references.academic.map((a) => a.title).join(' ') }
    ${ term.references.opensource.map((o) => o.name).join(' ') }
  `;

  const stats = readingTime(allTextContent);
  const minutes = Math.ceil(stats.minutes);
  return `${ minutes }분`;
};

export { getReadingTime };