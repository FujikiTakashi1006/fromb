export interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ScrollAnimationState {
  scrollY: number;
  targetScrollY: number;
  showGradient: boolean;
  showMenu: boolean;
  showText: boolean;
  showRedGradient: boolean;
  showWorks: boolean;
  showWorksTitle: boolean;
  showWorksContent: boolean;
  showContact: boolean;
}