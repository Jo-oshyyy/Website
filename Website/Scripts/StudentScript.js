// Student Tab Functionality
(function () {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
    });

    function initializeTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        // Add click event to each tab header
        tabHeaders.forEach(function (header) {
            header.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Add keyboard navigation
        tabHeaders.forEach(function (header, index) {
            header.addEventListener('keydown', function (e) {
                let newIndex;

                if (e.key === 'ArrowRight') {
                    newIndex = (index + 1) % tabHeaders.length;
                    tabHeaders[newIndex].focus();
                    tabHeaders[newIndex].click();
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (index - 1 + tabHeaders.length) % tabHeaders.length;
                    tabHeaders[newIndex].focus();
                    tabHeaders[newIndex].click();
                }
            });

            // Make tabs keyboard accessible
            header.setAttribute('role', 'tab');
            header.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // Set ARIA attributes for accessibility
        tabContents.forEach(function (content) {
            content.setAttribute('role', 'tabpanel');
        });
    }

    function switchTab(targetTabId) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        // Remove active class from all headers
        tabHeaders.forEach(function (header) {
            header.classList.remove('active');
            header.setAttribute('tabindex', '-1');
            header.setAttribute('aria-selected', 'false');
        });

        // Remove active class from all content panels
        tabContents.forEach(function (content) {
            content.classList.remove('active');
        });

        // Add active class to clicked header
        const activeHeader = document.querySelector('.tab-header[data-tab="' + targetTabId + '"]');
        if (activeHeader) {
            activeHeader.classList.add('active');
            activeHeader.setAttribute('tabindex', '0');
            activeHeader.setAttribute('aria-selected', 'true');
        }

        // Show corresponding content
        const activeContent = document.getElementById(targetTabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Optional: Store active tab in session storage
        try {
            sessionStorage.setItem('activeStudentTab', targetTabId);
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // Restore last active tab on page load
    function restoreActiveTab() {
        try {
            const savedTab = sessionStorage.getItem('activeStudentTab');
            if (savedTab) {
                switchTab(savedTab);
            }
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // Initialize restoration if needed
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreActiveTab);
    } else {
        restoreActiveTab();
    }

})();