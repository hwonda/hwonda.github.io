export interface FetchTermData {
  id: number;
  usecase: {
    example: string;
    description: string;
    industries: string[];
  };
  relevance: {
    analyst: {
      score: number;
      description: string;
    };
    engineer: {
      score: number;
      description: string;
    };
    scientist: {
      score: number;
      description: string;
    };
  };
  difficulty: {
    description: string;
    level: number;
  };
  title: {
    en: string;
    etc: string[];
    ko: string;
  };
  tags: string[];
  terms: Array<{
    link: string;
    description: string;
    term: string;
  }>;
  publish: boolean;
  metadata: {
    contributors: string[];
    authors: string[];
    updated_at: string;
    last_reviewed: string;
    created_at: string;
  };
  references: {
    tutorials: Array<{
      link: string;
      platform: string;
      title: string;
    }>;
    books: Array<{
      link: string;
      isbn: string;
      authors: string[];
      publisher: string;
      year: string;
      title: string;
    }>;
    academic: Array<{
      link: string;
      authors: string[];
      year: string;
      title: string;
      doi: string;
    }>;
    opensource: Array<{
      name: string;
      license: string;
      description: string;
      link: string;
    }>;
  };
  description: {
    full: string;
    short: string;
  };
}

export interface TermData extends FetchTermData {
  url: string;
}