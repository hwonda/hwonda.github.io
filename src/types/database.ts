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
  tags: Array<{
    internal_link: string | null;
    name: string;
  }>;
  terms: Array<{
    internal_link: string | null;
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
      external_link: string | null;
      platform: string;
      title: string;
    }>;
    books: Array<{
      external_link: string | null;
      isbn: string;
      authors: string[];
      publisher: string;
      year: string;
      title: string;
    }>;
    academic: Array<{
      external_link: string | null;
      authors: string[];
      year: string;
      title: string;
      doi: string;
    }>;
    opensource: Array<{
      external_link: string | null;
      name: string;
      license: string;
      description: string;
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