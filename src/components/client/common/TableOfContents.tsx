'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  text: string;
}

interface Props {
  title: string;
}

const HEADER_HEIGHT = 64;

const TableOfContents = ({ title }: Props) => {
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

    const handleScroll = () => {
      // 페이지 하단 도달 감지
      const isAtBottom
        = window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 10;

      if (isAtBottom && sectionElements.length > 0) {
        // 페이지 하단에서는 마지막 섹션 활성화
        const lastSection = sectionElements[sectionElements.length - 1];
        const lastHeading = lastSection.querySelector('h2');
        const lastHeadingText = lastHeading?.textContent?.replace('#', '').trim() ?? '';
        setActiveSection(lastHeadingText);
        return;
      }

      // header 위치의 가로선과 겹치는 섹션 찾기
      for (const section of sectionElements) {
        const heading = section.querySelector('h2');
        if (!heading) continue;

        const { top: sectionTop, bottom: sectionBottom } = section.getBoundingClientRect();
        const headerLine = HEADER_HEIGHT;

        // 섹션이 header 위치의 가로선을 포함하고 있는지 확인
        if (sectionTop <= headerLine && sectionBottom >= headerLine) {
          const headingText = heading.textContent?.replace('#', '').trim() ?? '';
          setActiveSection(headingText);
          break;
        }
      }
    };

    // 초기 활성 섹션 설정과 스크롤 이벤트 리스너 등록
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const sectionSelector = 'section h2';
    const sections = document.querySelectorAll<HTMLHeadingElement>(sectionSelector);

    const targetSection = Array.from(sections).find(
      (section) => section.textContent?.replace('#', '').trim() === sectionId
    );

    if (targetSection) {
      const y = targetSection.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="space-y-2 text-sm">
      <span className='text-main text-base font-bold'>{title}</span>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`cursor-pointer hover:text-primary transition-colors
            ${ activeSection === section.text ? 'text-accent font-medium' : 'text-sub' }
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
  );
};

export default TableOfContents;