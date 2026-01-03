// This is Login.js

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing login page...');

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

    // ==================== Password Toggle ====================
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle eye icon
            togglePassword.classList.toggle('hidden');
        });
    }

    // ==================== Login Form Submission ====================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === '' || password === '') {
                alert('Please fill in both username and password fields.');
                return false;
            }

            // Submit the form
            this.submit();
        });
    }

    // ==================== Modal Elements ====================
    const modal = document.getElementById('forgotPasswordModal');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const modalClose = document.getElementById('modalClose');
    const emailStep = document.getElementById('emailStep');
    const otpStep = document.getElementById('otpStep');
    const getOtpBtn = document.getElementById('getOtpBtn');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const resendOtpLink = document.getElementById('resendOtpLink');
    const emailInput = document.getElementById('emailInput');
    const displayEmail = document.getElementById('displayEmail');
    const otpInputs = document.querySelectorAll('.otp-input');

    console.log('Modal element:', modal);
    console.log('Forgot password link:', forgotPasswordLink);

    // ==================== Open Modal ====================
    if (forgotPasswordLink && modal) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Forgot password link clicked');
            modal.style.display = 'block';
            if (emailStep) emailStep.classList.add('active');
            if (otpStep) otpStep.classList.remove('active');
            // Focus on email input
            setTimeout(() => {
                if (emailInput) emailInput.focus();
            }, 100);
        });
    } else {
        console.error('Modal or forgot password link not found!');
    }

    // ==================== Close Modal ====================
    if (modalClose && modal) {
        modalClose.addEventListener('click', function () {
            console.log('Closing modal');
            modal.style.display = 'none';
            resetModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
            resetModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (modal && e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            resetModal();
        }
    });

    // ==================== Get OTP Button ====================
    if (getOtpBtn) {
        getOtpBtn.addEventListener('click', function () {
            const email = emailInput.value.trim();

            if (email === '') {
                alert('Please enter your email address');
                emailInput.focus();
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            // TODO: Send request to backend to send OTP
            // For now, just switch to OTP step
            displayEmail.textContent = email;
            emailStep.classList.remove('active');
            otpStep.classList.add('active');

            // Focus on first OTP input
            setTimeout(() => otpInputs[0].focus(), 100);

            // Show success message (temporary)
            console.log('OTP would be sent to:', email);
        });
    }

    // ==================== OTP Input Navigation ====================
    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            // Handle input
            input.addEventListener('input', function (e) {
                const value = this.value;

                // Only allow numbers
                if (!/^\d*$/.test(value)) {
                    this.value = '';
                    return;
                }

                // Move to next input if value is entered
                if (value && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            // Handle backspace
            input.addEventListener('keydown', function (e) {
                // Move to previous input on backspace
                if (e.key === 'Backspace' && !this.value && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });

            // Handle paste
            input.addEventListener('paste', function (e) {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').slice(0, 6);

                if (/^\d+$/.test(pasteData)) {
                    pasteData.split('').forEach((char, i) => {
                        if (otpInputs[i]) {
                            otpInputs[i].value = char;
                        }
                    });

                    // Focus on last filled input or last input
                    const lastIndex = Math.min(pasteData.length - 1, otpInputs.length - 1);
                    otpInputs[lastIndex].focus();
                }
            });
        });
    }

    // ==================== Verify OTP Button ====================
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', function () {
            const otp = Array.from(otpInputs).map(input => input.value).join('');

            if (otp.length !== 6) {
                alert('Please enter all 6 digits');
                otpInputs[0].focus();
                return;
            }

            // TODO: Send OTP to backend for verification
            console.log('Verifying OTP:', otp);
            console.log('Email:', displayEmail.textContent);

            // For now, just show success message and close modal
            alert('OTP verification functionality will be implemented here.\n\nOTP: ' + otp + '\nEmail: ' + displayEmail.textContent);

            // Uncomment when you want to close modal after verification
            // modal.style.display = 'none';
            // resetModal();
        });
    }

    // ==================== Resend OTP ====================
    if (resendOtpLink) {
        resendOtpLink.addEventListener('click', function (e) {
            e.preventDefault();
            const email = displayEmail.textContent;

            // TODO: Send request to backend to resend OTP
            console.log('Resending OTP to:', email);

            // Show feedback to user
            alert('A new OTP has been sent to ' + email);

            // Clear OTP inputs
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
        });
    }

    // ==================== Helper Functions ====================

    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Reset modal to initial state
     */
    function resetModal() {
        // Clear inputs
        if (emailInput) emailInput.value = '';
        if (otpInputs) {
            otpInputs.forEach(input => input.value = '');
        }

        // Reset to email step
        if (emailStep) emailStep.classList.add('active');
        if (otpStep) otpStep.classList.remove('active');
    }

});