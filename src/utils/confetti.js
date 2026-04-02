import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  // Basic confetti burst
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    startVelocity: 25,
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
  });
  
  // Add a second burst with different configuration
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6, x: 0.3 },
      startVelocity: 30,
      colors: ['#3b82f6', '#8b5cf6', '#ec4899']
    });
  }, 100);
  
  // Third burst from the right
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6, x: 0.7 },
      startVelocity: 30,
      colors: ['#10b981', '#f59e0b', '#ef4444']
    });
  }, 150);
};

export const triggerCelebration = () => {
  // Multiple bursts over time for bigger celebrations
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    
    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};