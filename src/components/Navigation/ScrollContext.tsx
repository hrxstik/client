import React, { createContext, useContext, useRef, ReactNode } from 'react';

export type ScrollElement = 'about' | 'houseInfo' | 'activities' | 'questions';

interface ScrollContextType {
  scrollToElement: (element: ScrollElement) => void;
  refs: { [key in ScrollElement]: React.RefObject<HTMLDivElement | null> };
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const refs = {
    about: useRef<HTMLDivElement | null>(null),
    houseInfo: useRef<HTMLDivElement | null>(null),
    activities: useRef<HTMLDivElement | null>(null),
    questions: useRef<HTMLDivElement | null>(null),
  };

  const scrollToElement = (element: ScrollElement) => {
    refs[element]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollContext.Provider value={{ scrollToElement, refs }}>{children}</ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
