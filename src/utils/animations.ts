
export const animateElement = (
  element: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options: KeyframeAnimationOptions
): Animation => {
  return element.animate(keyframes, options);
};

export const fadeIn = (
  element: HTMLElement, 
  duration: number = 300
): Animation => {
  return animateElement(
    element,
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { 
      duration, 
      fill: 'forwards', 
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
    }
  );
};

export const fadeOut = (
  element: HTMLElement, 
  duration: number = 300
): Animation => {
  return animateElement(
    element,
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(10px)' }
    ],
    { 
      duration, 
      fill: 'forwards', 
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
    }
  );
};

export const scaleIn = (
  element: HTMLElement, 
  duration: number = 300
): Animation => {
  return animateElement(
    element,
    [
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    { 
      duration, 
      fill: 'forwards', 
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
    }
  );
};

export const highlightElement = (
  element: HTMLElement,
  color: string = '#f97316',
  duration: number = 800
): Animation => {
  const originalBackgroundColor = 
    window.getComputedStyle(element).backgroundColor;

  return animateElement(
    element,
    [
      { backgroundColor: originalBackgroundColor },
      { backgroundColor: color, offset: 0.5 },
      { backgroundColor: originalBackgroundColor }
    ],
    { duration, easing: 'ease-in-out' }
  );
};

export const moveElement = (
  element: HTMLElement,
  fromPosition: { x: number; y: number },
  toPosition: { x: number; y: number },
  duration: number = 500
): Animation => {
  return animateElement(
    element,
    [
      { transform: `translate(${fromPosition.x}px, ${fromPosition.y}px)` },
      { transform: `translate(${toPosition.x}px, ${toPosition.y}px)` }
    ],
    { 
      duration, 
      fill: 'forwards', 
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)' 
    }
  );
};

export const swapElements = (
  element1: HTMLElement,
  element2: HTMLElement,
  duration: number = 500
): void => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  
  const dx1 = rect2.left - rect1.left;
  const dy1 = rect2.top - rect1.top;
  const dx2 = rect1.left - rect2.left;
  const dy2 = rect1.top - rect2.top;
  
  animateElement(
    element1,
    [
      { transform: 'translate(0, 0)' },
      { transform: `translate(${dx1}px, ${dy1}px)` }
    ],
    { duration, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  );
  
  animateElement(
    element2,
    [
      { transform: 'translate(0, 0)' },
      { transform: `translate(${dx2}px, ${dy2}px)` }
    ],
    { duration, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  );
};
