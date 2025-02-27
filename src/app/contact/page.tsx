import { getProfileData } from '@/utils/profilesData';
import { fetchTermsData } from '@/utils/termsData';
import ContactClient from '@/components/common/ContactClient';
import Footer from '@/components/common/Footer';

const ContactPage = async () => {
  const profile = await getProfileData();
  const terms = await fetchTermsData();
  return (
    <>
      <ContactClient profile={profile} terms={terms} />
      <div className='block sm:hidden'>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
