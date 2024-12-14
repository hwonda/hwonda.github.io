import { fetchTermsData } from '@/utils/termsData';
import { writeFileSync } from 'fs';
import { join } from 'path';

(async () => {
  const generateTermsJSON = async (): Promise<void> => {
    const terms = await fetchTermsData();
    writeFileSync(join(process.cwd(), 'public', 'terms.json'), JSON.stringify(terms));
    console.log('terms.json generated!');
  };

  // 실행
  generateTermsJSON().catch((error) => {
    console.error('Error generating terms.json:', error);
    process.exit(1);
  });
})();