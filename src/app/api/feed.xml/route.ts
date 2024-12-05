import { NextResponse } from 'next/server';
import RSS from 'rss';
import { fetchTermsData } from '@/utils/termsData'; // 포스트 데이터를 가져오는 함수
import { TermData } from '@/types/database'; // 데이터베이스에서 가져온 데이터 타입
import { dikiMetadata } from '@/constants';

export async function GET(): Promise<NextResponse> {
  // 포스트 데이터를 가져옴 (이 함수는 TermData[] 배열을 반환한다고 가정)
  const postLists: TermData[] = await fetchTermsData();
  const metadata = dikiMetadata;

  // RSS 객체 생성
  const feed = new RSS({
    title: 'YUN DAE HEE',
    description: 'Tech Blog',
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
      title: post.title.ko, // 한국어 제목 (ko)
      description: post.description.short, // 짧은 설명
      url: metadata.url + post.url, // 포스트의 URL
      guid: post.url, // GUID (URL)
      categories: post.usecase.industries, // 산업 카테고리
      author: post.metadata.authors.join(', '), // 저자 (다수일 수 있음)
      date: new Date(post.metadata.updated_at), // 업데이트 날짜
    });
  });

  // XML 문자열 생성
  const xml = feed.xml({ indent: true });

  // XML 응답 반환
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
