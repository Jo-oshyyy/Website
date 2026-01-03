// This is layout.js
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing layout...');

    // ==================== Theme Toggle ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference, default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');

            // Save theme preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==================== Active Page Highlighting ====================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-center .nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const page = link.getAttribute('data-page');

        // Check if current path matches the link
        if (currentPath.includes(href) || currentPath.includes('/' + page)) {
            link.classList.add('active');
        }
    });

    // ==================== Settings Dropdown Toggle ====================
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsDropdown = document.getElementById('settingsDropdown');

    if (settingsToggle && settingsDropdown) {
        settingsToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle dropdown
            const isOpen = settingsDropdown.classList.contains('show');
            settingsDropdown.classList.toggle('show');
            settingsToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!settingsToggle.contains(e.target) && !settingsDropdown.contains(e.target)) {
                settingsDropdown.classList.remove('show');
                settingsToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown when pressing ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && settingsDropdown.classList.contains('show')) {
                settingsDropdown.classList.remove('show');
                settingsToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        settingsDropdown.addEventListener('click', function (e) {
            // Allow links to navigate, but stop propagation
            if (e.target.tagName === 'A') {
                // Let the link navigate
                return;
            }
            e.stopPropagation();
        });
    }

    // ==================== Navbar Toggle ====================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMiddle = document.querySelector('.NavBar-Content-Middle');

    if (navbarToggle && navbarMiddle) {
        navbarToggle.addEventListener('click', function () {
            navbarToggle.classList.toggle('active');
            navbarMiddle.classList.toggle('active');
        });

        // Close navbar when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbarToggle.contains(e.target) && !navbarMiddle.contains(e.target)) {
                navbarToggle.classList.remove('active');
                navbarMiddle.classList.remove('active');
            }
        });

        // Close navbar when pressing ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                navbarToggle.classList.remove('active');
                navbarMiddle.classList.remove('active');
            }
        });

        // Close navbar when clicking on a nav link (mobile)
        const navLinks = navbarMiddle.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    navbarToggle.classList.remove('active');
                    navbarMiddle.classList.remove('active');
                }
            });
        });
    }

    // ==================== Responsive Check ====================
    // Close mobile menu on window resize if viewport becomes larger
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                if (navbarToggle) navbarToggle.classList.remove('active');
                if (navbarMiddle) navbarMiddle.classList.remove('active');
            }
        }, 250);
    });

    // ==================== Logout Modal ====================
    const logoutModal = document.getElementById('logoutModal');
    const logoutLink = document.getElementById('logoutLink');
    const logoutModalClose = document.getElementById('logoutModalClose');
    const btnLogoutCancel = document.getElementById('btnLogoutCancel');
    const btnLogoutConfirm = document.getElementById('btnLogoutConfirm');

    // Make sure modal is hidden on page load
    if (logoutModal) {
        logoutModal.classList.remove('show');
        logoutModal.style.display = 'none';
    }

    // Open logout modal
    if (logoutLink && logoutModal) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Logout clicked');
            // Set display first, then add show class after a tiny delay for animation
            logoutModal.style.display = 'flex';
            setTimeout(function () {
                logoutModal.classList.add('show');
            }, 10);
            // Close settings dropdown
            if (settingsDropdown) {
                settingsDropdown.classList.remove('show');
            }
        });
    }

    // Close logout modal
    function closeLogoutModal() {
        if (logoutModal) {
            logoutModal.classList.remove('show');
            setTimeout(function () {
                logoutModal.style.display = 'none';
            }, 300); // Wait for animation to finish
        }
    }

    if (logoutModalClose) {
        logoutModalClose.addEventListener('click', closeLogoutModal);
    }

    if (btnLogoutCancel) {
        btnLogoutCancel.addEventListener('click', closeLogoutModal);
    }

    // Confirm logout - Redirect to Login page
    if (btnLogoutConfirm) {
        btnLogoutConfirm.addEventListener('click', function () {
            // Clear any stored data (theme preferences will remain)
            // Remove any auth-related data when you implement backend
            // localStorage.removeItem('authToken');
            // sessionStorage.clear();

            // Redirect to Login view
            window.location.href = '/Login/Index';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (logoutModal && e.target === logoutModal) {
            closeLogoutModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (logoutModal && e.key === 'Escape' && logoutModal.classList.contains('show')) {
            closeLogoutModal();
        }
    });
});