export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: 'Commercial' | 'Music Video' | 'Fashion' | 'Documentary' | 'Campaign' | 'Social';
  duration: string;
  aspect: string;
  fps: string;
  camera: string;
  software: string[];
  synopsis: string;
  concept: string;
  editDecisions: string[];
  videoUrl: string;
  isVertical?: boolean;
  rawImage: string;
  gradeImage: string;
  previewVideo?: string;
  heroImage: string;
  gallery: string[];
  soundDesignNotes: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  previewImage: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  tools: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface BTSFrame {
  id: string;
  title: string;
  category: string;
  timecode: string;
  image: string;
}
