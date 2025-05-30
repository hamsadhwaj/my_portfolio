
        // Mobile Menu Toggle
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });
        
        // Progress bar
        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        };
        
        // Fade in elements on scroll
        const fadeElems = document.querySelectorAll('.fade-in');
        
        const fadeIn = () => {
            fadeElems.forEach(elem => {
                const elemTop = elem.getBoundingClientRect().top;
                const elemBottom = elem.getBoundingClientRect().bottom;
                
                if (elemTop < window.innerHeight && elemBottom > 0) {
                    elem.style.opacity = '1';
                    elem.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for fade elements
        fadeElems.forEach(elem => {
            elem.style.opacity = '0';
            elem.style.transform = 'translateY(20px)';
            elem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Call fadeIn on load and scroll
        window.addEventListener('load', fadeIn);
        window.addEventListener('scroll', fadeIn);
        
        // Simple particles effect
        class Particle {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = '#4a86e8';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > this.canvas.width) {
                    this.x = 0;
                } else if (this.x < 0) {
                    this.x = this.canvas.width;
                }
                
                if (this.y > this.canvas.height) {
                    this.y = 0;
                } else if (this.y < 0) {
                    this.y = this.canvas.height;
                }
            }
            
            draw() {
                this.ctx.fillStyle = this.color;
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        function initParticles() {
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '1';
            
            const heroSection = document.querySelector('.hero');
            heroSection.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            const particles = [];
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(canvas));
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw connections
                ctx.strokeStyle = 'rgba(74, 134, 232, 0.15)';
                ctx.lineWidth = 0.5;
                
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                // Update and draw particles
                for (const particle of particles) {
                    particle.update();
                    particle.draw();
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Resize canvas on window resize
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        
        // Initialize particles when DOM is loaded
        document.addEventListener('DOMContentLoaded', initParticles);
        // Smooth scroll for anchor links