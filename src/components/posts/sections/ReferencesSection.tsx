'use client';

import Link from 'next/link';
import { References } from '@/types';
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ReferencesSectionProps {
  references: References;
}

const ReferencesSection = ({ references }: ReferencesSectionProps) => {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, Record<number, boolean>>>({
    tutorials: {},
    books: {},
    academic: {},
    opensource: {},
  });

  const toggleExpand = (section: string, index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [index]: !prev[section][index],
      },
    }));
  };

  const isEmpty
   = references.tutorials?.length === 0
   && references.books?.length === 0
   && references.academic?.length === 0
   && references.opensource?.length === 0;

  if (isEmpty) return null;

  const getLinkProps = (external_link: string | undefined) => {
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
  type Book = NonNullable<typeof references.books>[number];
  type Academic = NonNullable<typeof references.academic>[number];
  type OpenSource = NonNullable<typeof references.opensource>[number];

  const formatTutorialDetails = (tutorial: Tutorial) => {
    return tutorial.platform ? [tutorial.platform] : [];
  };

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

  // Generic component for reference items with proper typing
  const ReferenceList = <T extends Tutorial | Book | Academic | OpenSource>({
    title,
    items,
    section,
    getTitle,
    formatDetails,
    getExternalLink,
  }: {
    title: string;
    items: T[] | undefined;
    section: string;
    getTitle: (item: T)=> string;
    formatDetails: (item: T)=> (string | null)[];
    getExternalLink: (item: T)=> string | undefined;
  }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className='flex flex-col'>
        <strong className='ml-1 mb-1.5'>{title}</strong>
        {items.map((item, index) => (
          <div key={index} className={`ml-1 overflow-hidden ${ index === 0 ? 'border-t border-light' : '' }`}>
            <div
              onClick={() => toggleExpand(section, index)}
              className={`group flex justify-between items-center border-b border-light px-3 py-2.5 lg:px-4 lg:py-2 cursor-pointer ${ expandedItems[section][index] ? 'border-x' : '' }`}
            >
              <span className={`text-main text-sm group-hover:text-primary ${ expandedItems[section][index] ? 'text-primary' : 'line-clamp-1' }`}>
                {getTitle(item)}
              </span>
              <span className='size-5'>
                <ChevronDown
                  className={`size-5 transition-transform group-hover:text-primary ${ expandedItems[section][index] ? 'rotate-180' : '' }`}
                />
              </span>
            </div>
            <div
              className={`transition-all duration-400 ease-in-out overflow-hidden bg-gray5 ${
                expandedItems[section][index] ? 'max-h-80 border-b border-x border-light' : 'max-h-0'
              }`}
            >
              <Link
                {...getLinkProps(getExternalLink(item))}
                className={`block px-3 py-2.5 lg:px-4 lg:py-2 hover:bg-background-secondary no-underline ${ !getExternalLink(item) ? 'cursor-default' : '' }`}
              >
                {formatDetails(item).map((detail, i) => (
                  detail && <span key={i} className='text-sm font-medium block'>{detail}</span>
                ))}
                {getExternalLink(item) && (
                  <span className='text-sm text-primary'>
                    {'바로가기 →'}
                  </span>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="group-section break-all">
      <h2>
        <span className="text-primary sm:ml-[-20px] mr-2.5 sm:opacity-0 group-section-title transition-opacity">{'#'}</span>
        {'참고 자료'}
      </h2>
      <div className='grid lg:grid-cols-2 gap-4 sm:mt-[-4px]'>
        <ReferenceList
          title="튜토리얼"
          items={references.tutorials}
          section="tutorials"
          getTitle={(item) => item.title || ''}
          formatDetails={formatTutorialDetails}
          getExternalLink={(item) => item.external_link}
        />
        <ReferenceList
          title="참고서적"
          items={references.books}
          section="books"
          getTitle={(item) => item.title || ''}
          formatDetails={formatBookDetails}
          getExternalLink={(item) => item.external_link}
        />
        <ReferenceList
          title="연구논문"
          items={references.academic}
          section="academic"
          getTitle={(item) => item.title || ''}
          formatDetails={formatAcademicDetails}
          getExternalLink={(item) => item.external_link}
        />
        <ReferenceList
          title="오픈소스"
          items={references.opensource}
          section="opensource"
          getTitle={(item) => item.name || ''}
          formatDetails={formatOpenSourceDetails}
          getExternalLink={(item) => item.external_link}
        />
      </div>
    </section>
  );
};

export default ReferencesSection;