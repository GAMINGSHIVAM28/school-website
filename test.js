/*
    Premium JavaScript: Interactive Screen Overlay & Customization Toolkit
    - Adds a beautiful, customizable overlay to any website.
    - Features: Welcome modal, dark/light mode toggle, animated background, and floating action button.
    - Plug-and-play: Just include this script in any HTML file.
*/

(function() {
    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .premium-overlay-bg {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: linear-gradient(120deg, #1e3c72 0%, #2a5298 100%);
            z-index: 9998; opacity: 0.95; pointer-events: none; transition: background 0.5s;
            animation: premium-bg-anim 10s infinite alternate;
        }
        @keyframes premium-bg-anim {
            0% { filter: hue-rotate(0deg);}
            100% { filter: hue-rotate(60deg);}
        }
        .premium-modal {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #fff; color: #222; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            padding: 2rem 2.5rem; z-index: 10000; text-align: center; min-width: 320px;
            font-family: 'Segoe UI', Arial, sans-serif; transition: background 0.5s, color 0.5s;
        }
        .premium-modal.dark { background: #222; color: #fff; }
        .premium-modal h2 { margin-top: 0; font-size: 2rem; }
        .premium-modal button {
            margin-top: 1.5rem; padding: 0.7rem 1.5rem; border: none; border-radius: 8px;
            background: #2a5298; color: #fff; font-size: 1rem; cursor: pointer; transition: background 0.3s;
        }
        .premium-modal button:hover { background: #1e3c72; }
        .premium-fab {
            position: fixed; bottom: 32px; right: 32px; z-index: 10001;
            width: 56px; height: 56px; border-radius: 50%; background: #2a5298;
            color: #fff; display: flex; align-items: center; justify-content: center;
            font-size: 2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.15); cursor: pointer;
            transition: background 0.3s;
        }
        .premium-fab:hover { background: #1e3c72; }
        .premium-fab-menu {
            position: fixed; bottom: 100px; right: 40px; z-index: 10001;
            display: flex; flex-direction: column; gap: 12px;
        }
        .premium-fab-menu button {
            background: #fff; color: #2a5298; border: none; border-radius: 8px;
            padding: 0.5rem 1rem; font-size: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            cursor: pointer; transition: background 0.3s, color 0.3s;
        }
        .premium-fab-menu button:hover {
            background: #2a5298; color: #fff;
        }
        @media (max-width: 600px) {
            .premium-modal { min-width: 90vw; padding: 1rem; }
            .premium-fab { bottom: 16px; right: 16px; }
            .premium-fab-menu { bottom: 80px; right: 20px; }
        }
    `;
    document.head.appendChild(style);

    // Overlay background
    const overlayBg = document.createElement('div');
    overlayBg.className = 'premium-overlay-bg';
    document.body.appendChild(overlayBg);

    // Modal
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.innerHTML = `
        <h2>Welcome!</h2>
        <p>This website uses a premium interactive overlay.<br>
        Enjoy the enhanced experience!</p>
        <button id="premium-close-modal">Get Started</button>
    `;
    document.body.appendChild(modal);

    // Floating Action Button (FAB)
    const fab = document.createElement('div');
    fab.className = 'premium-fab';
    fab.title = 'Open Premium Menu';
    fab.innerHTML = '☰';
    document.body.appendChild(fab);

    // FAB Menu
    const fabMenu = document.createElement('div');
    fabMenu.className = 'premium-fab-menu';
    fabMenu.style.display = 'none';
    fabMenu.innerHTML = `
        <button id="premium-toggle-theme">Toggle Dark/Light Mode</button>
        <button id="premium-show-modal">Show Welcome</button>
        <button id="premium-hide-overlay">Hide Overlay</button>
    `;
    document.body.appendChild(fabMenu);

    // State
    let darkMode = false;
    let overlayVisible = true;

    // Modal close
    document.getElementById('premium-close-modal').onclick = () => {
        modal.style.display = 'none';
        overlayBg.style.pointerEvents = 'none';
    };

    // FAB click
    fab.onclick = () => {
        fabMenu.style.display = fabMenu.style.display === 'none' ? 'flex' : 'none';
    };

    // Toggle theme
    document.getElementById('premium-toggle-theme').onclick = () => {
        darkMode = !darkMode;
        if (darkMode) {
            modal.classList.add('dark');
            overlayBg.style.background = 'linear-gradient(120deg, #232526 0%, #414345 100%)';
        } else {
            modal.classList.remove('dark');
            overlayBg.style.background = 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)';
        }
    };

    // Show modal
    document.getElementById('premium-show-modal').onclick = () => {
        modal.style.display = 'block';
        overlayBg.style.pointerEvents = 'auto';
    };

    // Hide overlay
    document.getElementById('premium-hide-overlay').onclick = () => {
        overlayBg.style.display = 'none';
        modal.style.display = 'none';
        fab.style.display = 'none';
        fabMenu.style.display = 'none';
        overlayVisible = false;
    };

    // Accessibility: ESC to close modal/menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            fabMenu.style.display = 'none';
        }
    });

    // Responsive: Hide overlay on print
    window.matchMedia('print').addEventListener('change', (e) => {
        if (e.matches) {
            overlayBg.style.display = 'none';
            modal.style.display = 'none';
            fab.style.display = 'none';
            fabMenu.style.display = 'none';
        } else if (overlayVisible) {
            overlayBg.style.display = '';
            fab.style.display = '';
        }
    });
})();