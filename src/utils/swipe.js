export let swipe = (target, action) => {
   let startPosX = 0,
       posXDiffrence = 0,
       deletePos = 15,
       moved = false,
       scrolled = false;
         
   // Default styles
   let toDefault = () => {
      startPosX = 0;
      posXDiffrence = 0;
      deletePos = 15;
      target.style.setProperty('transition', 'transform var(--transition), opacity var(--transition)');
      target.style.setProperty('transform', null);
      target.style.setProperty('opacity', null);
      target.style.setProperty('touch-action', null);
   }

   // Set start pos
   target.addEventListener('touchstart', async (event) => {
      startPosX = event.touches[0].clientX;
      target.style.setProperty('transition', null);
   }, {passive: true});

   // Touchmove
   target.addEventListener('touchmove', async (event) => {
      if(scrolled === false){
         window.addEventListener('scroll', stopSwipe, true);
         posXDiffrence = Math.round(event.touches[0].clientX - startPosX);
         target.style.setProperty('transform', 'translateX(' + posXDiffrence + 'px)');
         target.style.setProperty('opacity', (1 - (Math.abs(posXDiffrence) / 150)));
         target.style.setProperty('touch-action', 'none');
         if(moved === false){
            moved = true;
            setTimeout(() => {
               deletePos = 120;
            }, 400);
         }
      }
   }, {passive: true});

   // Touchend
   target.addEventListener('touchend', async () => {
      if(Math.abs(posXDiffrence) >= deletePos){
         target.style.setProperty('transition', 'transform var(--transition), opacity var(--transition), margin-bottom var(--transition)');
         target.style.setProperty('transform', posXDiffrence > 0 ? 'translateX(450px)' : 'translateX(-450px)');
         target.style.setProperty('opacity', '0');
         target.style.setProperty('margin-bottom', (target.offsetHeight * -1) + 'px');
         setTimeout(() => {
            action();
         }, 300)
      } else {
         toDefault();
      }
      window.removeEventListener('scroll', stopSwipe, true);
      scrolled = false;
      moved = false;
   }, {passive: true});

   let stopSwipe = () => {
      scrolled = true;
      toDefault();
   }
}