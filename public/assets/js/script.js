document.addEventListener("DOMContentLoaded", function () {
    const shalomgames = document.querySelector(".shalomgames");
    const screenWidth = window.innerWidth;
    let positionX = -shalomgames.offsetWidth; // Inicializa à esquerda da tela

    // Define a velocidade de movimento (quanto maior, mais rápido)
    const moveSpeed = 1; // 1 pixel a cada milissegundo (ajuste conforme necessário)

    function moveShalomGames() {
        positionX += moveSpeed; // Aumenta a posição em função da velocidade
        if (positionX > screenWidth) {
            positionX = -shalomgames.offsetWidth; // Reseta a posição quando o elemento sair da tela
        }
        shalomgames.style.left = positionX + "px"; // Aplica a posição no estilo
    }

    // Define o intervalo de movimento a cada 1 milissegundo
    setInterval(moveShalomGames, 1);
});


// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');

            // Controla o scroll da página
            document.body.style.overflow = isHidden ? 'auto' : 'hidden';
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Load particles.js if you add it to your project
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});