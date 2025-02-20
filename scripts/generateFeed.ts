import { promises as fs } from 'fs';
import RSS from 'rss';
import { fetchTermsData } from '@/utils/termsData'; // 데이터를 가져오는 함수 (경로는 실제 파일에 맞게 수정)
import { dikiMetadata } from '@/constants';
import { TermData } from '@/types'; // TermData 타입 (타입 정의가 필요)

(async() => {
  const generateFeed = async (): Promise<void> => {
    // fetchTermsData 함수에서 TermData[] 배열을 반환한다고 가정
    const postLists: TermData[] = await fetchTermsData();
    const metadata = dikiMetadata;

    // RSS 객체 생성
    const feed = new RSS({
      title: 'Diki',
      description: '데이터 위키 - Diki',
      feed_url: 'https://dxwiki.github.io/feed.xml',
      site_url: 'https://dxwiki.github.io',
      image_url: 'https://dxwiki.github.io/logo.png',
      language: 'ko',
      pubDate: new Date(),
      ttl: 60,
    });

    // 각 포스트를 RSS 항목으로 추가
    postLists.forEach((post) => {
      feed.item({
        title: post.title?.ko ?? '', // 한국어 제목
        description: (post.description?.short ?? '') + (post.description?.full ?? ''), // 설명
        url: metadata.url + post.url, // 포스트의 URL
        guid: metadata.url + post.url, // GUID (URL)
        categories: post.usecase?.industries ?? [], // 산업 카테고리
        author: post.metadata?.authors?.join(', ') ?? '', // 저자
        date: new Date(post.metadata?.updated_at ?? post.metadata?.created_at ?? ''), // 업데이트 날짜
      });
    });

    // RSS XML 생성
    const xml = feed.xml({ indent: true });

    // `public/feed.xml` 파일에 RSS 저장
    await fs.writeFile('out/feed.xml', xml);
    console.log('RSS feed generated');
  };

  // 실행
  generateFeed().catch((error) => {
    console.error('Error generating feed:', error);
  });
})();
