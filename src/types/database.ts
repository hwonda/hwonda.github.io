export interface Title {
  en?: string;
  etc?: string[];
  ko?: string;
}
export interface Description {
  full?: string;
  short?: string;
}
export interface Metadata {
  contributors?: string[];
  authors?: string[];
  updated_at?: string;
  last_reviewed?: string;
  created_at?: string;
}
export interface Tags {
  internal_link?: string;
  name?: string;
}
export interface Difficulty {
  description?: string;
  level?: number;
}
export interface Relevance {
  analyst?: {
    score?: number;
    description?: string;
  };
  engineer?: {
    score?: number;
    description?: string;
  };
  scientist?: {
    score?: number;
    description?: string;
  };
}
export interface Terms {
  internal_link?: string;
  description?: string;
  term?: string;
}
export interface Usecase {
  example?: string;
  description?: string;
  industries?: string[];
}
export interface References {
  tutorials: Array<{
    external_link?: string;
    platform?: string;
    title?: string;
  }> | undefined;
  books: Array<{
    external_link?: string;
    isbn?: string;
    authors?: string[];
    publisher?: string;
    year?: string;
    title?: string;
  }> | undefined;
  academic: Array<{
    external_link?: string;
    authors?: string[];
    year?: string;
    title?: string;
    doi?: string;
  }> | undefined;
  opensource: Array<{
    external_link?: string;
    name?: string;
    license?: string;
    description?: string;
  }> | undefined;
}

export interface FetchTermData {
  title?: Title;
  description?: Description;
  metadata?: Metadata;
  tags?: Tags[];
  difficulty?: Difficulty;
  relevance?: Relevance;
  terms?: Terms[];
  usecase?: Usecase;
  references?: References;
}

export interface TermData extends FetchTermData {
  id?: number;
  publish?: boolean;
  url?: string;
}