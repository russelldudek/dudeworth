export const scrollToSection = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const additionalOffset = -80; // Adjust this value to fine-tune the scroll position
      
      let targetPosition;
      if (targetId === '#hero') {
        // For the hero section, scroll to the top of the page
        targetPosition = 0;
      } else {
        // For other sections, apply the offset
        targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - additionalOffset;
      }
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };