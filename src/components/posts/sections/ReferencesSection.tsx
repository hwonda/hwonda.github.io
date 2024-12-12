import Link from 'next/link';

interface ReferencesSectionProps {
  references: {
    tutorials: Array<{
      external_link: string | null;
      platform: string;
      title: string;
    }>;
    books: Array<{
      external_link: string | null;
      isbn: string;
      authors: string[];
      publisher: string;
      year: string;
      title: string;
    }>;
    academic: Array<{
      external_link: string | null;
      authors: string[];
      year: string;
      title: string;
      doi: string;
    }>;
    opensource: Array<{
      external_link: string | null;
      name: string;
      license: string;
      description: string;
    }>;
  };
}

const ReferencesSection = ({ references }: ReferencesSectionProps) => {
  const isEmpty
   = references.tutorials.length === 0
   && references.books.length === 0
   && references.academic.length === 0
   && references.opensource.length === 0;

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

  const formatTutorialDetails = (tutorial: typeof references.tutorials[0]) => {
    return tutorial.platform || '';
  };

  const formatBookDetails = (book: typeof references.books[0]) => {
    const parts = [];

    if (book.authors.length > 0) {
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

  const formatAcademicDetails = (paper: typeof references.academic[0]) => {
    const parts = [];

    const authorYear = [];
    if (paper.authors.length > 0) {
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

  const formatOpenSourceDetails = (project: typeof references.opensource[0]) => {
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
        {references.tutorials.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2 mb-1.5'>{'Tutorials'}</strong>
            {references.tutorials.map((tutorial, index) => (
              <Link
                {...getLinkProps(tutorial.external_link)}
                key={index}
                className={`group flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !tutorial.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-accent group-hover:underline'>{tutorial.title}</span>
                {formatTutorialDetails(tutorial) && (
                  <span className='text-sm font-medium'>
                    {formatTutorialDetails(tutorial)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
        {references.books.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2 mb-1.5'>{'Books'}</strong>
            {references.books.map((book, index) => (
              <Link
                {...getLinkProps(book.external_link)}
                key={index}
                className={`group flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !book.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-accent group-hover:underline'>{book.title}</span>
                {formatBookDetails(book).map((detail, i) => (
                  <span key={i} className='text-sm font-medium'>{detail}</span>
                ))}
              </Link>
            ))}
          </div>
        )}
        {references.academic.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2 mb-1.5'>{'Academic'}</strong>
            {references.academic.map((paper, index) => (
              <Link
                {...getLinkProps(paper.external_link)}
                key={index}
                className={`group flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !paper.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-accent group-hover:underline'>{paper.title}</span>
                {formatAcademicDetails(paper).map((detail, i) => (
                  <span key={i} className='text-sm font-medium'>{detail}</span>
                ))}
              </Link>
            ))}
          </div>
        )}
        {references.opensource.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2 mb-1.5'>{'Open Source'}</strong>
            {references.opensource.map((project, index) => (
              <Link
                {...getLinkProps(project.external_link)}
                key={index}
                className={`group flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary no-underline ${ index > 0 ? 'mt-2' : '' } ${ !project.external_link ? 'cursor-default' : '' }`}
              >
                <span className='text-accent group-hover:underline'>{project.name}</span>
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