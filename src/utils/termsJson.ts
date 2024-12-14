import fs from 'fs';
import path from 'path';
import { TermData } from '@/types';
import { transformToSlug } from '@/utils/filters';

export async function fetchTermsData(): Promise<TermData[]> {
  try {
    // 데이터 파일 경로
    const filePath = path.join(process.cwd(), 'data', 'terms.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const termsData: TermData[] = JSON.parse(jsonData);

    // URL 추가
    return termsData.map((data) => {
      const urlPath = transformToSlug(data.title.en);
      return {
        ...data,
        url: `/posts/${ urlPath }`,
      };
    });
  } catch (error) {
    console.error('Failed to read terms.json:', error);
    return [];
  }
}

export async function getTermData(slug: string): Promise<TermData | undefined> {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) =>
    transformToSlug(term.title.en) === slug
  );
}
