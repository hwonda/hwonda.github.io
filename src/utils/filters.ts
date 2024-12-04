import dayjs from 'dayjs';

export const transformToSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

export const formatDate = (date: string): string => {
  return dayjs(date).format('YYYY년 MM월 DD일');
};