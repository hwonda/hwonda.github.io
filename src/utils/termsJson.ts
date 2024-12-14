import fs from 'fs';
import path from 'path';
import { TermData } from '@/types';
import { transformToSlug } from '@/utils/filters';

let cachedTermsData: TermData[] | null = null;

export async function fetchTermsData(): Promise<TermData[]> {
  if (cachedTermsData) {
    return cachedTermsData;
  }

  const filePath = path.join(process.cwd(), 'public', 'terms.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const termsData: TermData[] = JSON.parse(jsonData);

  cachedTermsData = termsData.map((data) => {
    const urlPath = transformToSlug(data.title.en);
    return {
      ...data,
      url: `/posts/${urlPath}`,
    };
  });

  return cachedTermsData;
}

export async function getTermData(slug: string): Promise<TermData | undefined> {
  const termsDataList = await fetchTermsData();
  return termsDataList.find((term) =>
    transformToSlug(term.title.en) === slug
  );
}

export function clearCache() {
  cachedTermsData = null;
}
