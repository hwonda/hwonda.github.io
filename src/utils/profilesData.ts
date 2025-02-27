import { firestore } from '@/libs/firebaseAdmin';
import { Profile } from '@/types';

let cachedProfilesData: Profile[] | null = null;

const fetchProfilesData = async (): Promise<Profile[]> => {
  if (cachedProfilesData) {
    return cachedProfilesData;
  }

  try {
    const profilesCollection = await firestore.collection('profiles').get();
    cachedProfilesData = profilesCollection.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        thumbnail: data.thumbnail,
        social: {
          github: data.social?.github,
          linkedin: data.social?.linkedin,
          twitter: data.social?.twitter,
        },
      } as Profile;
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    cachedProfilesData = [];
  }

  return cachedProfilesData;
};

const getProfileData = async (): Promise<Profile[]> => {
  return await fetchProfilesData();
};

const clearCache = () => {
  cachedProfilesData = null;
};

export { fetchProfilesData, getProfileData, clearCache };