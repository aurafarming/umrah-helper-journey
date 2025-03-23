
// Observer for scroll animations
export const createScrollObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Target all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

// Staggered animation for lists
export const staggeredAnimation = (
  elements: NodeListOf<Element> | Element[],
  baseDelay = 50
) => {
  if (!elements.length) return;

  Array.from(elements).forEach((el, index) => {
    const element = el as HTMLElement;
    element.style.animationDelay = `${baseDelay * index}ms`;
    element.style.opacity = '1';
  });
};

// Smooth scroll to element
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

// Subtle hover effect for interactive elements
export const addHoverEffects = () => {
  const interactiveElements = document.querySelectorAll('.card-hover');
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      el.classList.remove('hover');
    });
  });
};
