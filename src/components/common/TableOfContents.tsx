'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { TermData, Tags } from '@/types';
import { transformToSlug } from '@/utils/filters';

interface Section {
  id: string;
  text: string;
}

interface Props {
  title: string;
  // onShare: ()=> void;
  term: TermData;
  slug: string;
}

const HEADER_HEIGHT = 64;
const Threshold = 10;

const TableOfContents = ({ title, term }: Props) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const sectionElements = document.querySelectorAll<HTMLElement>('section');

    const sectionData: Section[] = Array.from(sectionElements).map((section) => {
      const heading = section.querySelector('h2');
      return {
        id: heading?.textContent?.replace('#', '').trim() ?? '',
        text: heading?.textContent?.replace('#', '').trim() ?? '',
      };
    });

    setSections(sectionData);

    if (sectionData.length > 0) {
      setActiveSection(sectionData[0].text);
    }

    const handleScroll = () => {
      // 페이지 하단 도달 감지
      const bottomReached
        = window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 10;

      if (bottomReached && sectionElements.length > 0) {
        const lastSection = sectionElements[sectionElements.length - 1];
        const lastHeading = lastSection.querySelector('h2');
        const lastHeadingText = lastHeading?.textContent?.replace('#', '').trim() ?? '';
        setActiveSection(lastHeadingText);
        return;
      }

      Array.from(sectionElements).forEach((section) => {
        const heading = section.querySelector('h2');
        if (!heading) return;

        const { top: sectionTop, bottom: sectionBottom } = section.getBoundingClientRect();
        const headerLine = HEADER_HEIGHT;
        const headerLineThreshold = headerLine + Threshold;

        if (sectionTop <= headerLineThreshold && sectionBottom >= headerLineThreshold) {
          const headingText = heading.textContent?.replace('#', '').trim() ?? '';
          setActiveSection(headingText);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string): void => {
    const sectionSelector = 'section h2';
    const sections = document.querySelectorAll<HTMLHeadingElement>(sectionSelector);

    const targetSection = Array.from(sections).find(
      (section) => section.textContent?.replace('#', '').trim() === sectionId
    );

    if (targetSection) {
      const y = targetSection.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className='animate-introSecond flex flex-col'>
      <div className='h-[168px] hidden md:block' />
      <div className='sticky top-[132px] hidden md:block'>
        <nav className="space-y-2 text-sm min-w-32">
          <span className='text-main text-base font-bold'>{title}</span>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`cursor-pointer transition-colors underline underline-offset-4 decoration-light hover:text-accent hover:decoration-accent
                  ${ activeSection === section.text ? 'text-primary font-medium decoration-primary' : 'text-sub' }
                `}
              onClick={() => scrollToSection(section.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  scrollToSection(section.id);
                }
              }}
              aria-current={activeSection === section.text ? 'true' : 'false'}
            >
              {section.text}
            </div>
          ))}
        </nav>
        <div className="flex flex-col flex-wrap mt-10 gap-2">
          <span className='text-main text-base font-bold'>{'관련 포스트'}</span>
          {term.tags?.map((tag: Tags, index: number) => (
            tag.internal_link ? (
              <Link
                key={index}
                href={transformToSlug(tag.internal_link)}
                className='font-normal text-sm text-main cursor-pointer transition-colors underline underline-offset-4 decoration-light hover:text-accent hover:decoration-accent'
              >
                {tag.name}
              </Link>
            ) : (
              <span key={index} className='font-normal text-sm'>
                <span className='border-b border-light pb-px text-gray1'>{tag.name}</span>
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;