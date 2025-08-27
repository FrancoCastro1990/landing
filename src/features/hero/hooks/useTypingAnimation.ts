import { useState, useEffect } from 'react';

interface UseTypingAnimationOptions {
  fullText: string;
  afterText: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
}

/**
 * Hook for managing typing animation with cursor blinking
 * @param options - Configuration for the typing animation
 * @returns Object with animation state and text values
 */
export const useTypingAnimation = ({
  fullText,
  afterText,
  typingSpeed = 100,
  cursorBlinkSpeed = 500,
}: UseTypingAnimationOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [displayedAfterText, setDisplayedAfterText] = useState('');
  const [afterTextIndex, setAfterTextIndex] = useState(0);
  const [firstPartComplete, setFirstPartComplete] = useState(false);

  // Check for reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      setFirstPartComplete(true);
      setShowLogo(true);
      setDisplayedAfterText(afterText);
      setTypingComplete(true);
      return;
    }

    // First part typing
    if (currentIndex < fullText.length && !firstPartComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } 
    // Show logo after first part
    else if (!firstPartComplete && currentIndex >= fullText.length) {
      setFirstPartComplete(true);
      setTimeout(() => setShowLogo(true), 300);
    }
    // Second part typing
    else if (firstPartComplete && showLogo && afterTextIndex < afterText.length) {
      const timeout = setTimeout(() => {
        setDisplayedAfterText(prev => prev + afterText[afterTextIndex]);
        setAfterTextIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
    // Complete
    else if (afterTextIndex >= afterText.length && !typingComplete) {
      setTypingComplete(true);
    }
  }, [
    currentIndex,
    afterTextIndex,
    fullText,
    afterText,
    typingComplete,
    prefersReducedMotion,
    firstPartComplete,
    showLogo,
    typingSpeed
  ]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [prefersReducedMotion, cursorBlinkSpeed]);

  return {
    displayedText,
    displayedAfterText,
    showCursor,
    showLogo,
    typingComplete,
  };
};