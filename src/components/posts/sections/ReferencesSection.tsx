import Link from 'next/link';
import { References } from '@/types';

interface ReferencesSectionProps {
  references: References;
}

const ReferencesSection = ({ references }: ReferencesSectionProps) => {
  const isEmpty
   = references.tutorials?.length === 0
   && references.books?.length === 0
   && references.academic?.length === 0
   && references.opensource?.length === 0;

  if (isEmpty) return null;

  const getLinkProps = (external_link: string | null) => {
    if (!external_link || external_link === '#') {
      return {
        href: '#',
        onClick: (e: React.MouseEvent) => e.preventDefault(),
      };
    }

    return {
      href: external_link,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  };

  type Tutorial = NonNullable<typeof references.tutorials>[number];

  const formatTutorialDetails = (tutorial: Tutorial) => {
    return tutorial.platform || '';
  };

  type Book = NonNullable<typeof references.books>[number];

  const formatBookDetails = (book: Book) => {
    const parts = [];

    if (book.authors && book.authors.length > 0) {
      parts.push(book.authors.join(', '));
    }

    const parenthesisParts = [];
    if (book.year) parenthesisParts.push(book.year);
    if (book.publisher) parenthesisParts.push(book.publisher);

    if (parenthesisParts.length > 0) {
      parts.push(`(${ parenthesisParts.join(', ') })`);
    }

    return [parts.join(' '), book.isbn ? `ISBN: ${ book.isbn }` : null].filter(Boolean);
  };

  type Academic = NonNullable<typeof references.academic>[number];

  const formatAcademicDetails = (paper: Academic) => {
    const parts = [];

    const authorYear = [];
    if (paper.authors && paper.authors.length > 0) {
      authorYear.push(paper.authors.join(', '));
    }
    if (paper.year) {
      authorYear.push(`(${ paper.year })`);
    }
    if (authorYear.length > 0) {
      parts.push(authorYear.join(' '));
    }

    if (paper.doi) {
      parts.push(`DOI: ${ paper.doi }`);
    }

    return parts;
  };

  type OpenSource = NonNullable<typeof references.opensource>[number];

  const formatOpenSourceDetails = (project: OpenSource) => {
    const parts = [];

    if (project.description) {
      parts.push(project.description);
    }
    if (project.license) {
      parts.push(`License: ${ project.license }`);
    }

    return parts;
  };

  return (
    <section className="references-section break-all">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 references-section-hover:opacity-100 transition-opacity">{'#'}</span>
        {'레퍼런스'}
      </h2>
      <div className='grid lg:grid-cols-2 gap-4 sm:mt-[-4px]'>
        {references.tutorials && references.tutorials.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-1 mb-1.5'>{'Tutorials'}</strong>
            {references.tutorials.map((tutorial, index) => (
              <Link
                {...getLinkProps(tutorial.external_link ?? null)}
                key={index}
                className={`ml-1 group flex flex-col justify-center gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !tutorial.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-primary group-hover:underline'>{tutorial.title}</span>
                {formatTutorialDetails(tutorial) && (
                  <span className='text-sm font-medium'>
                    {formatTutorialDetails(tutorial)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
        {references.books && references.books.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-1 mb-1.5'>{'Books'}</strong>
            {references.books.map((book, index) => (
              <Link
                {...getLinkProps(book.external_link ?? null)}
                key={index}
                className={`ml-1 group flex flex-col justify-center gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !book.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-primary group-hover:underline'>{book.title}</span>
                {formatBookDetails(book).map((detail, i) => (
                  <span key={i} className='text-sm font-medium'>{detail}</span>
                ))}
              </Link>
            ))}
          </div>
        )}
        {references.academic && references.academic.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-1 mb-1.5'>{'Academic'}</strong>
            {references.academic.map((paper, index) => (
              <Link
                {...getLinkProps(paper.external_link ?? null)}
                key={index}
                className={`ml-1 group flex flex-col justify-center gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !paper.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-primary group-hover:underline'>{paper.title}</span>
                {formatAcademicDetails(paper).map((detail, i) => (
                  <span key={i} className='text-sm font-medium'>{detail}</span>
                ))}
              </Link>
            ))}
          </div>
        )}
        {references.opensource && references.opensource.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-1 mb-1.5'>{'Open Source'}</strong>
            {references.opensource.map((project, index) => (
              <Link
                {...getLinkProps(project.external_link ?? null)}
                key={index}
                className={`ml-1 group flex flex-col justify-center gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !project.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-primary group-hover:underline'>{project.name}</span>
                {formatOpenSourceDetails(project).map((detail, i) => (
                  <span key={i} className='text-sm font-medium'>{detail}</span>
                ))}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReferencesSection;