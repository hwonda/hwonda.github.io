// src/app/feed/page.tsx

import { fetchTermsData } from '@/utils/termsData'; // 데이터 가져오는 함수
import { dikiMetadata } from '@/constants';
import RSS from 'rss';
import { TermData } from '@/types/database';

export default async function FeedPage() {
  // 포스트 데이터를 서버에서 직접 가져옵니다.
  const postLists: TermData[] = await fetchTermsData();
  const metadata = dikiMetadata;

  // RSS 객체 생성
  const feed = new RSS({
    title: '데이터 위키',
    description: '데이터 위키, 데이터 백과사전 - 디키',
    feed_url: 'https://dxwiki.github.io/feed.xml',
    site_url: 'https://dxwiki.github.io',
    image_url: 'https://dxwiki.github.io/logo.png',
    language: 'ko',
    pubDate: new Date(),
    ttl: 60, // 60분마다 업데이트
  });

  // 포스트들을 RSS 항목으로 추가
  postLists.forEach((post) => {
    feed.item({
      title: post.title.ko, // 한국어 제목
      description: post.description.short, // 짧은 설명
      url: metadata.url + post.url, // 포스트 URL
      guid: post.url, // GUID (URL)
      categories: post.usecase.industries, // 산업 카테고리
      author: post.metadata.authors.join(', '), // 저자
      date: new Date(post.metadata.updated_at), // 업데이트 날짜
    });
  });

  // XML 문자열 생성
  const xml = feed.xml({ indent: true });

  // RSS XML을 반환합니다.
  return (
    <div>
      <h1>{'RSS Feed'}</h1>
      <pre>{xml}</pre>
    </div>
  );
}
