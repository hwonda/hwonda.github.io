import { getTermData } from '@/utils/termsData';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import MarkdownContent from './MarkdownContent';
import { formatDate, getReadingTime } from '@/utils/metaData';
import { Clock3 } from 'lucide-react';

interface Props {
  slug: string
}

const PostDetail = async ({ slug }: Props) => {
  const term = await getTermData(slug);

  if (!term) {
    notFound();
  }

  return (
    <div className='prose'>
      <section className='flex justify-between items-end mt-10 mb-5 border-b border-main'>
        <div className='flex flex-col mb-5'>
          <h1 className="text-3xl font-bold">{term.title.ko}{'('}{term.title.en}{')'}</h1>
          <p className='text-sub'>{term.description.short}</p>
          <div className="flex flex-wrap gap-1">
            {term.tags.map((tag, index) => (
              <button
                key={index}
                className="px-2 py-0.5 rounded-3xl bg-[#cff4ff] text-[#333] hover-bg-primary"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className='flex flex-col sm:flex-row gap-2 items-end sm:justify-end sm:items-center'>
        <div className="flex items-center gap-1">
          <span className='text-sub'>{'by '}{term.metadata.authors}</span>
          <span className="text-gray-400">{'•'}</span>
          <Clock3 className="size-4 text-sub" />
          <span className='text-sub'>{getReadingTime(term)}</span>
        </div>
        <span className="text-gray-400 hidden sm:block">{'•'}</span>
        <div className='flex gap-2 items-center'>
          <span className='text-sub'>{'발행: '}{formatDate(term.metadata.created_at)}</span>
          <span className="text-gray-400">{'•'}</span>
          <span className='text-sub'>{'수정: '}{formatDate(term.metadata.updated_at)}</span>
        </div>
      </div>
      <div className='block md:grid grid-cols-[5fr_1fr] gap-2 md:mr-5'>
        <div className='sm:ml-5'>
          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3 relative flex">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'개념'}
            </h2>
            <MarkdownContent content={term.description.full} />
          </section>

          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'난이도'}
            </h2>
            <p>{term.difficulty.level}{' stars'}</p>
            <p className='mt-2'>{term.difficulty.description}</p>
          </section>

          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'관련성'}
            </h2>
            <div className='block sm:flex justify-center'>
              <div className='w-[100vw-8px] sm:w-[300px] flex justify-center items-center border-main border-2 sm:mr-2'>{'삼각형'}</div>
              <div className='grid grid-cols-[3fr_2fr_10fr]'>
                <span className="text-lg text-sub text-center my-2 sm:m-0">{'직무'}</span>
                <span className="text-lg text-sub text-center my-2 sm:m-0">{'관련도'}</span>
                <span className="text-lg text-sub pl-3 my-2 sm:m-0">{'설명'}</span>

                <div className="pr-2 grid grid-rows-3">
                  {/* <span className="text-lg text-sub text-center self-center">{'직무'}</span> */}
                  <h3 className="text-center self-center">{'Data Analyst'}</h3>
                  <h3 className="text-center self-center">{'Data Engineer'}</h3>
                  <h3 className="text-center self-center">{'Data Scientist'}</h3>
                </div>

                <div className="px-2 border-x border-custom-border grid grid-rows-3">
                  {/* <span className="text-lg text-sub text-center self-center">{'관련도'}</span> */}
                  <span className='text-center self-center'>{term.relevance.analyst.score}{' stars'}</span>
                  <span className='text-center self-center'>{term.relevance.engineer.score}{' stars'}</span>
                  <span className='text-center self-center'>{term.relevance.scientist.score}{' stars'}</span>
                </div>

                <div className="pl-3 grid grid-rows-3">
                  {/* <span className="text-lg text-sub self-center">{'설명'}</span> */}
                  <span className="self-center py-1">{term.relevance.analyst.description}</span>
                  <span className="self-center py-1">{term.relevance.engineer.description}</span>
                  <span className="self-center py-1">{term.relevance.scientist.description}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'관련용어'}
            </h2>
            <ul>
              {term.terms.map((item, index) => (
                <li key={index} className='my-2 flex items-center'>
                  <span className='px-2 py-1 rounded-3xl bg-accent hover-bg-primary text-white mr-2 shrink-0'>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-primary"
                    >
                      {item.term}
                      <ExternalLink className="size-4" />
                    </a>
                  </span>
                  {item.description}
                </li>
              ))}
            </ul>
          </section>

          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'사용사례'}
            </h2>
            <div className="flex flex-wrap gap-1 mb-2">
              {term.usecase.industries.map((tag, index) => (
                <button
                  key={index}
                  className="px-2 py-0.5 hover-bg-primary rounded-3xl bg-accent text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p>{term.usecase.example}</p>
            <p className='text-sub mt-2'>{term.usecase.description}</p>
          </section>

          <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'레퍼런스'}
            </h2>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'1. Tutorials'}</h3>
              <ul>
                {term.references.tutorials.map((tutorial, index) => (
                  <li key={index}>
                    <a className='text-lg text-primary hyperlink' href={tutorial.link} target="_blank" rel="noopener noreferrer">{tutorial.title}</a>
                    <div className='text-sub'>{tutorial.platform}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'2. Books'}</h3>
              <ul>
                {term.references.books.map((book, index) => (
                  <li key={index}>
                    <div>
                      <a className='text-lg text-primary hyperlink' href={book.link} target="_blank" rel="noopener noreferrer">{book.title}</a>
                    </div>
                    <div className='text-sub'>{' by '}{book.authors.join(', ')}{'('}{book.year}{', '}{book.publisher}{')'}</div>
                    <div className='text-sub'>{'ISBN: '}{book.isbn}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'3. Academic'}</h3>
              <ul>
                {term.references.academic.map((paper, index) => (
                  <li key={index}>
                    <a className='text-lg text-primary hyperlink' href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                    <div className='text-sub'>{paper.authors.join(', ')}{' ('}{paper.year}{') '}</div>
                    <div className='text-sub'>{'DOI: '}{paper.doi}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'4. Open Source'}</h3>
              <ul>
                {term.references.opensource.map((project, index) => (
                  <li key={index}>
                    <a className='text-lg text-primary hyperlink' href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a>
                    <div className='text-sub'>{project.description}</div>
                    <div className='text-sub'>{'(License: '}{project.license}{')'}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* <section className="my-12 group">
            <h2 className="text-xl font-semibold mb-3">
              <span className="text-primary sm:ml-[-20px] mr-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">{'#'}</span>
              {'Tags'}
            </h2>
            <div className="flex flex-wrap gap-1">
              {term.tags.map((tag, index) => (
                <button
                  key={index}
                  className="px-3 py-1 rounded-3xl bg-accent text-white hover-bg-primary"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section> */}

          {/* <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'Metadata'}</h2>
            <p><strong>{'Contributors:'}</strong> {term.metadata.contributors}</p>
            <p><strong>{'Authors:'}</strong> {term.metadata.authors}</p>
            <p><strong>{'Last reviewed:'}</strong> {term.metadata.last_reviewed}</p>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'Publish Status'}</h2>
            <p>{term.publish ? 'Published' : 'Not Published'}</p>
          </section> */}
        </div>
        <div className='sticky mt-10 top-[150px] h-32 border border-main hidden md:block'>
          {'TOC'}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;