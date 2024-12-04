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

  return (
    <section className="group">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
        {'레퍼런스'}
      </h2>
      <div className='grid lg:grid-cols-2 gap-4'>
        {references.tutorials.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2'>{'Tutorials'}</strong>
            {references.tutorials.map((tutorial, index) => (
              <div key={index} className={`flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary ${ index > 0 ? 'mt-2' : '' }`}>
                <Link href={tutorial.external_link ?? '#'} target="_blank" rel="noopener noreferrer">{tutorial.title}</Link>
                <span className='text-sm'>{tutorial.platform}</span>
              </div>
            ))}
          </div>
        )}
        {references.books.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2'>{'Books'}</strong>
            {references.books.map((book, index) => (
              <div key={index} className={`flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary ${ index > 0 ? 'mt-2' : '' }`}>
                <Link href={book.external_link ?? '#'} target="_blank" rel="noopener noreferrer">{book.title}</Link>
                <span className='text-sm'>{book.authors.join(', ')}{' ('}{book.year}{', '}{book.publisher}{')'}</span>
                <span className='text-sm'>{'ISBN: '}{book.isbn}</span>
              </div>
            ))}
          </div>
        )}
        {references.academic.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2'>{'Academic'}</strong>
            {references.academic.map((paper, index) => (
              <div key={index} className={`flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary ${ index > 0 ? 'mt-2' : '' }`}>
                <Link href={paper.external_link ?? '#'} target="_blank" rel="noopener noreferrer">{paper.title}</Link>
                <span className='text-sm'>{paper.authors.join(', ')}{' ('}{paper.year}{') '}</span>
                {paper.doi && <span className='text-sm'>{'DOI: '}{paper.doi}</span>}
              </div>
            ))}
          </div>
        )}
        {references.opensource.length > 0 && (
          <div className='flex flex-col'>
            <strong className='ml-2'>{'Open Source'}</strong>
            {references.opensource.map((project, index) => (
              <div key={index} className={`flex flex-col gap-1 border border-light flex-1 px-2.5 py-1 lg:px-3 lg:py-2 rounded-lg hover:bg-background-secondary ${ index > 0 ? 'mt-2' : '' }`}>
                <Link href={project.external_link ?? '#'} target="_blank" rel="noopener noreferrer">{project.name}</Link>
                <span className='text-sm'>{project.description}</span>
                <span className='text-sm'>{'(License: '}{project.license}{')'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReferencesSection;