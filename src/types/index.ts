export interface SectionProps {
    preview?: boolean;
  }

  export interface Album {
    id: number;
    title: string;
    year: number;
    cover: string;
    songs: string[];
    description: string;
  }
  
  export interface Tribute {
    id: number;
    location: string;
    name: string;
    message: string;
    date: string;
    hasCandle: boolean;
    photo?: string;
    relationship: string;
  }
  
  export interface GalleryImage {
    id: number;
    src: string;
    caption: string;
    description: string;
    category: 'concert' | 'charity' | 'personal' | 'ministry' | 'studio'| 'awards' | 'fans'|'worship' |'media'| 'performance'| '';
    date: string;
  }
  
  export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    type: string;
    icon: string;
    significance:string;
  }
  
  export interface DonationOption {
    id: number;
    title: string;
    description: string;
    icon: string;
    impact: string;
    suggestedAmounts: number[];
  }
  
  export interface Chapter {
    title: string;
    content: string;
    image: string;
    year: string;
    quote: string;
  }
  
  export interface Video {
    id: number;
    title: string;
    type:string;
    description: string;
    views: string;
    duration: string;
    uploadDate: string;
    thumbnail: string;
    youtubeId: string;
  }
  
  export interface TributeFormData {
    name: string;
    message: string;
    photo?: FileList;
    relationship: string;
    location: string;
  }