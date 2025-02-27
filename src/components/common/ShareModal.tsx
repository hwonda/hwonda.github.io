'use client';

import { Copy, Facebook, MessageCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface KakaoShare {
  sendDefault: (options: {
    objectType: string;
    content: {
      title: string;
      description: string;
      imageUrl: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
  })=> void;
}

interface KakaoStatic {
  init: (apiKey: string)=> void;
  isInitialized: ()=> boolean;
  Share: KakaoShare;
}

declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: ()=> void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${ scrollbarWidth }px`;
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('URL이 복사되었습니다.');
      onClose();
    });
  };

  const shareKakao = () => {
    if (typeof window === 'undefined') return;

    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

    if (!KAKAO_KEY) {
      console.error('Kakao API key가 없습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        imageUrl: 'https://hwonda.github.io/thumbnail.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  const shareFacebook = () => {
    const shareUrl = window.location.href;
    const encodedUrl = encodeURIComponent(shareUrl);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${ encodedUrl }&quote=${ encodeURIComponent(document.title) }\n${ encodedUrl }`;

    window.open(url, '_blank');
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-6 w-80 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-main">{'공유하기'}</span>
          <button onClick={onClose} className="p-1">
            <X className="size-5 text-main" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={shareKakao}
            className="flex flex-col items-center gap-2 p-3 hover:bg-background-secondary rounded-lg"
          >
            <MessageCircle className="size-6 text-main" />
            <span className="text-sm">{'카카오톡'}</span>
          </button>

          <button
            onClick={shareFacebook}
            className="flex flex-col items-center gap-2 p-3 hover:bg-background-secondary rounded-lg"
          >
            <Facebook className="size-6 text-main" />
            <span className="text-sm">{'페이스북'}</span>
          </button>

          <button
            onClick={copyLink}
            className="flex flex-col items-center gap-2 p-3 hover:bg-background-secondary rounded-lg"
          >
            <Copy className="size-6 text-main" />
            <span className="text-sm">{'링크 복사'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareModal;