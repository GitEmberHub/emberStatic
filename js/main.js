document.addEventListener('DOMContentLoaded', function() {
    // Detect navbar overlap
    const navbar = document.querySelector('.nav-bar');
    const content = document.querySelector('.text-box');
    
    function checkOverlap() {
        if (!navbar || !content) return;
        
        const navbarRect = navbar.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        
        if (navbarRect.bottom > contentRect.top) {
            navbar.classList.add('nav-overlap');
        } else {
            navbar.classList.remove('nav-overlap');
        }
    }
    
    window.addEventListener('scroll', checkOverlap);
    checkOverlap();

    // Parallax Background effect
    document.addEventListener("mousemove", function(e) {
        const layers = document.querySelectorAll(".layer");
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
    
        layers.forEach((layer, index) => {
            const depth = (index+1) ** 3;
            const xOffset = -x * depth;
            const yOffset = 0;
            layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Ember Title-explosion
    const emberExplosion = document.getElementById('ember-explosion');
    if (emberExplosion) {
        emberExplosion.addEventListener('click', function(e) {
            const emberText = this;
            const rect = emberText.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                const angle = -Math.random() * Math.PI * 2;
                const velocity = Math.random() * 3 + 2;
                const distance = Math.random() * 100 + 50;
                
                particle.style.left = `${centerX}px`;
                particle.style.top = `${centerY}px`;
                
                document.body.appendChild(particle);
                
                let startTime = null;
                function animate(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    
                    const x = centerX + Math.cos(angle) * velocity * progress / 10;
                    const y = centerY + Math.sin(angle) * velocity * progress / 10;
                    
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    
                    const opacity = 1 - progress / 2000;
                    particle.style.opacity = opacity;
                    
                    if (progress < 2000) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                }
                
                requestAnimationFrame(animate);
            }
        });
    }
}); 