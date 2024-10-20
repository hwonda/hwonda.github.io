import { getTermData } from '@/utils/termsData';
import { notFound } from 'next/navigation';

interface Props {
  slug: string
}

const PostDetail = async ({ slug }: Props) => {
  const term = await getTermData(slug);

  if (!term) {
    notFound();
  }

  return (
    <div>
      <section className='flex justify-between items-end my-5 py-5 border-b border-gray-500'>
        <div className='flex flex-col'>
          <h1 className="text-3xl font-bold">{term.title.ko}</h1>
          <p className='text-gray-500'>{term.description.short}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-gray-500'><strong>{'발행일:'}</strong> {term.metadata.created_at}</p>
          <p className='text-gray-500'><strong>{'수정일:'}</strong> {term.metadata.updated_at}</p>
        </div>
      </section>
      <div className='grid grid-cols-[5fr_1fr] gap-2'>
        <div>
          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'개념'}</h2>
            <p>{term.description.full}</p>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'난이도'}</h2>
            <p><strong>{'Level:'}</strong> {term.difficulty.level} stars</p>
            <p><strong>{'Description:'}</strong> {term.difficulty.description}</p>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'관련성'}</h2>
            <div className='grid grid-cols-[5fr_4fr_2fr_10fr] gap-2'>
              <div className='col-span-1 row-span-4 flex justify-center items-center border-gray-500 border-2'>삼각형</div>
              <p>직무</p>
              <p>관련도</p>
              <p>설명</p>
              <h3 className="text-xl font-semibold">{'Data Analyst'}</h3>
              <p>{term.relevance.analyst.score} stars</p>
              <p>{term.relevance.analyst.description}</p>
              <h3 className="text-xl font-semibold">{'Data Engineer'}</h3>
              <p>{term.relevance.engineer.score} stars</p>
              <p>{term.relevance.engineer.description}</p>
              <h3 className="text-xl font-semibold">{'Data Scientist'}</h3>
              <p>{term.relevance.scientist.score} stars</p>
              <p>{term.relevance.scientist.description}</p>
            </div>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'관련용어'}</h2>
            <ul>
              {term.terms.map((item, index) => (
                <li key={index} className='my-2 flex items-center'>
                  <p className='py-1 px-2 rounded-3xl bg-[#33CFFF] text-white'>{item.term}</p> 
                  {item.description}
                  {'('}<a href={item.link} target="_blank" rel="noopener noreferrer" className='border-b border-gray-500'>{'Link'}</a>{')'}
                </li>
              ))}
            </ul>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'사용사례'}</h2>
            <p>{term.usecase.industries.join(', ')}</p>
            <p>{term.usecase.example}</p>
            <p className='text-gray-500'>{term.usecase.description}</p>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'레퍼런스'}</h2>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'1. Tutorials'}</h3>
              <ul>
                {term.references.tutorials.map((tutorial, index) => (
                  <li key={index}>
                    <a className='text-lg text-[#33cfff] border-b border-[#33cfff]' href={tutorial.link} target="_blank" rel="noopener noreferrer">{tutorial.title}</a>
                    <p>{tutorial.platform}</p>
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
                    <a className='text-lg text-[#33cfff] border-b border-[#33cfff]' href={book.link} target="_blank" rel="noopener noreferrer">{book.title}</a>
                    </div>
                    {' by '}{book.authors.join(', ')}{'('}{book.year}{', '}{book.publisher}{')'}
                    <div>
                    {'ISBN: '}{book.isbn}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'3. Academic'}</h3>
              <ul>
                {term.references.academic.map((paper, index) => (
                  <li key={index}>
                    <div>
                    <a className='text-lg text-[#33cfff] border-b border-[#33cfff]' href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                    </div>
                    {paper.authors.join(', ')}{' ('}{paper.year}{') '}
                    <div>
                      {'DOI: '}{paper.doi}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mt-5">{'4. Open Source'}</h3>
              <ul>
                {term.references.opensource.map((project, index) => (
                  <li key={index}>
                    <div>
                    <a className='text-lg text-[#33cfff] border-b border-[#33cfff]' href={project.link} target="_blank" rel="noopener noreferrer">{project.name}</a>
                    </div>
                    {project.description}
                    {'(License: '}{project.license}{')'}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="my-10">
            <h2 className="text-xl font-semibold mb-3">{'Tags'}</h2>
            <p>{term.tags.join(', ')}</p>
          </section>

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
      <div className='sticky top-[120px] h-32 border border-gray-500'>
        TOC
      </div>
      </div>
    </div>
  );
};

export default PostDetail;