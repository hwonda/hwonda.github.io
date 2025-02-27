'use client';

import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTerms } from '@/store/termsSlice';
import { TermData } from '@/types';

export default function StoreInitializer({ terms }: { terms: TermData[] }) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(setTerms(terms));
      initialized.current = true;
    }
  }, [dispatch, terms]);

  return null;
}