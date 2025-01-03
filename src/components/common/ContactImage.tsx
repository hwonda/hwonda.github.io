import Image from 'next/image';

import contact1 from '../../../public/images/github-mark.png';
import contact2 from '@/assets/images/linkedin.jpeg';
import contact3 from '@/assets/images/github-mark.png';

const ContactImage = () => {
  return (
    <>
      <Image src="/images/github-mark.png" alt='절대경로' width={100} height={100} />
      <Image src="/public/images/github-mark.png" alt='절대경로' width={100} height={100} />
      <Image src="https://hwonda.github.io/images/github-mark.png" alt='절대경로' width={100} height={100} />
      <Image src={contact1} alt='상대-public' width={100} height={100} />
      <Image src={contact2} alt='상대-assets' width={100} height={100} />
      <Image src={contact3} alt='상대-assets git' width={100} height={100} />
    </>
  );
};

export default ContactImage;