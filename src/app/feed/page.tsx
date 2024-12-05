// app/feed/page.tsx

import { GetStaticProps } from 'next';
import RSS from 'rss';
import { fetchTermsData } from '@/utils/termsData'; // 데이터를 가져오는 함수
import { TermData } from '@/types/database'; // 데이터 타입
import { dikiMetadata } from '@/constants';
import fs from 'fs';
import path from 'path';

// getStaticProps를 사용하여 빌드 타임에 RSS 파일을 생성합니다.
export const getStaticProps: GetStaticProps = async () => {
  const postLists: TermData[] = await fetchTermsData();
  const metadata = dikiMetadata;

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

  postLists.forEach((post) => {
    feed.item({
      title: post.title.ko,
      description: post.description.short,
      url: metadata.url + post.url,
      guid: post.url,
      categories: post.usecase.industries,
      author: post.metadata.authors.join(', '),
      date: new Date(post.metadata.updated_at),
    });
  });

  const xml = feed.xml({ indent: true });

  // 'public/feed.xml' 파일에 저장
  const filePath = path.join(process.cwd(), 'public', 'feed.xml');
  fs.writeFileSync(filePath, xml);

  return {
    props: {},
  };
};

const FeedPage = () => {
  return (
    <div>
      <h1>{'RSS Feed'}</h1>
      <p>{'RSS Feed가 정상적으로 생성되었습니다. '}<a href="/feed.xml">{'XML 파일 보기'}</a></p>
    </div>
  );
};

export default FeedPage;
