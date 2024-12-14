import { fetchTermsData } from '@/utils/termsData'; // Firestore에서 데이터를 가져오는 유틸
import { writeFileSync } from 'fs';
import { join } from 'path';

(async () => {
  const generateTermsJSON = async (): Promise<void> => {
    const terms = await fetchTermsData();

    const outputPath = join(process.cwd(), 'data', 'terms.json'); // 파일 저장 경로 변경
    writeFileSync(outputPath, JSON.stringify(terms, null, 2)); // JSON 포맷팅
    console.log(`terms.json generated at ${ outputPath }`);
  };

  generateTermsJSON().catch((error) => {
    console.error('Error generating terms.json:', error);
    process.exit(1);
  });
})();