// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Multi-page navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Close mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'home.html')) {
            link.classList.add('active');
        }
    });
}

// Product Filtering Functionality with Smooth Scrolling Only
function initializeProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const softwareSection = document.querySelector('#software-products');
    const hardwareSection = document.querySelector('#hardware-products');
    const productsSection = document.querySelector('.products-section');

    if (!filterButtons.length) {
        return;
    }

    // Function to scroll to section with offset for fixed header
    function scrollToSection(sectionElement) {
        if (!sectionElement) return;

        const headerOffset = 100;
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter category
            const filterCategory = this.getAttribute('data-filter');

            // Scroll to appropriate section based on filter
            if (filterCategory === 'software' && softwareSection) {
                setTimeout(() => {
                    scrollToSection(softwareSection);
                }, 100);
            } else if (filterCategory === 'hardware' && hardwareSection) {
                setTimeout(() => {
                    scrollToSection(hardwareSection);
                }, 100);
            } else if (filterCategory === 'all' && productsSection) {
                setTimeout(() => {
                    scrollToSection(productsSection);
                }, 100);
            }
        });
    });

    // Add smooth scroll behavior to entire document
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Contact Form Validation (Frontend Only)
function initializeFormValidation() {
    const form = document.getElementById('inquiry-form');

    if (!form) {
        return;
    }

    // Add required styles for validation
    const validationStyles = document.createElement('style');
    validationStyles.textContent = `
        .form-input.error, .form-textarea.error, .cdrop-toggle.error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
        }
        .error-message {
            color: #dc3545 !important;
            font-size: 0.875rem !important;
            margin-top: 0.5rem !important;
            margin-bottom: 0 !important;
            display: block !important;
            font-weight: 500 !important;
            position: relative !important;
            z-index: 10 !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            line-height: 1.4 !important;
        }
        .form-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1.5rem;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        }
        .form-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1.5rem;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        }
        .success-icon {
            color: #28a745;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .error-icon {
            color: #dc3545;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .form-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        .form-group.has-error {
            margin-bottom: 2rem;
        }
        .other-details-group {
            margin-top: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 0.5rem;
            border-left: 4px solid #3498db;
        }
        .success-actions {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .btn-secondary {
            background: #6c757d;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
        }
        .btn-secondary:hover {
            background: #5a6268;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(validationStyles);

    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());

        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }

    // Clear success message
    function clearSuccess() {
        const successMessages = document.querySelectorAll('.form-success');
        successMessages.forEach(msg => msg.remove());
    }

    // Show error for specific input
    function showFieldError(input, message) {
        clearFieldError(input);

        input.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
            font-weight: 500;
            position: relative;
            z-index: 10;
        `;

        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');
            formGroup.appendChild(errorDiv);
        } else {
            // Create a wrapper if no form-group exists
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: relative; margin-bottom: 2rem;';
            wrapper.className = 'form-group has-error';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(errorDiv);
        }
    }

    // Clear error for specific field
    function clearFieldError(input) {
        input.classList.remove('error');

        // Check in form-group first
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('has-error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        } else {
            // Check in parent wrapper
            const parent = input.parentNode;
            if (parent) {
                parent.classList.remove('has-error');
                const errorMsg = parent.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        }

        // Also check for any error messages that might be siblings
        const nextSibling = input.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('error-message')) {
            nextSibling.remove();
        }
    }

    // Show success message
    function showSuccess(message) {
        clearErrors();
        clearSuccess();

        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h4 style="margin-bottom: 0.5rem; color: #155724;">Thank You!</h4>
            <p style="margin: 0; font-size: 1rem;">${message}</p>
            <div class="success-actions">
                <button type="button" id="newInquiryBtn" class="btn-secondary">
                    Send Another Inquiry
                </button>
            </div>
        `;

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.insertAdjacentElement('afterend', successDiv);

        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const newInquiryBtn = document.getElementById('newInquiryBtn');
        if (newInquiryBtn) {
            newInquiryBtn.addEventListener('click', resetForm);
        }
    }

    // Reset form function
    function resetForm() {
        form.reset();
        clearSuccess();
        clearErrors();

        const otherDetails = document.getElementById('other-details');
        if (otherDetails && otherDetails.parentNode) {
            otherDetails.parentNode.remove();
        }

        const firstField = form.querySelector('input, textarea, select');
        if (firstField) {
            firstField.focus();
        }
    }

    // Validation functions for individual fields
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();

        if (!nameValue) {
            showFieldError(nameInput, 'Please enter your name');
            return false;
        }

        if (nameValue.length < 2) {
            showFieldError(nameInput, 'Name must be at least 2 characters long');
            return false;
        }

        if (nameValue.length > 50) {
            showFieldError(nameInput, 'Name must be less than 50 characters');
            return false;
        }

        if (!/^[a-zA-Z\s\-'\.]+$/.test(nameValue)) {
            showFieldError(nameInput, 'Please enter a valid name (letters and spaces only)');
            return false;
        }

        return true;
    }

    function validateMobile() {
        const mobileInput = document.getElementById('mobile');
        const mobileValue = mobileInput.value.trim();

        if (!mobileValue) {
            showFieldError(mobileInput, 'Please enter a valid mobile number according to the Indian format (starting with digits 6–9)');
            return false;
        }

        const cleanMobile = mobileValue.replace(/\D/g, '');
        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
            showFieldError(mobileInput, 'Please enter a valid mobile number according to the Indian format (starting with digits 6–9)');
            return false;
        }

        return true;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();

        if (!emailValue) {
            showFieldError(emailInput, 'Please enter a valid email address');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            showFieldError(emailInput, 'Please enter a valid email address (e.g., your.email@example.com)');
            return false;
        }

        return true;
    }

    // === START: UPDATED STATE/CITY VALIDATION ===
    function validateState() {
        const stateInput = document.getElementById('state');
        const stateValue = stateInput.value.trim();
        
        if (!stateValue) {
            showFieldError(stateInput, 'Please enter your state');
            return false;
        }
        if (stateValue.length < 2) {
            showFieldError(stateInput, 'State must be at least 2 characters long');
            return false;
        }
        // Regex check: Sirf letters (a-z, A-Z) aur spaces (\s) allowed hain
        if (!/^[a-zA-Z\s]+$/.test(stateValue)) {
            showFieldError(stateInput, 'Please enter a valid state (letters and spaces only)');
            return false;
        }
        return true;
    }

    function validateCity() {
        const cityInput = document.getElementById('city');
        const cityValue = cityInput.value.trim();
        
        if (!cityValue) {
            showFieldError(cityInput, 'Please enter your city');
            return false;
        }
        if (cityValue.length < 2) {
            showFieldError(cityInput, 'City must be at least 2 characters long');
            return false;
        }
        // Regex check: Sirf letters (a-z, A-Z) aur spaces (\s) allowed hain
        if (!/^[a-zA-Z\s]+$/.test(cityValue)) {
            showFieldError(cityInput, 'Please enter a valid city (letters and spaces only)');
            return false;
        }
        return true;
    }
    // === END: UPDATED STATE/CITY VALIDATION ===

    function validateProductSelection() {
        const productInput = document.getElementById('product');
        const productValue = productInput.value;

        if (!productValue) {
            showFieldError(productInput, 'Please select a software/hardware category for your inquiry');
            return false;
        }

        if (productValue === 'other') {
            const otherDetails = document.getElementById('other-details');
            if (!otherDetails) {
                createOtherDetailsField();
                const newOtherDetails = document.getElementById('other-details');
                showFieldError(newOtherDetails, 'Please specify details for "Other" option');
                return false;
            }

            const otherDetailsValue = otherDetails.value.trim();
            if (!otherDetailsValue) {
                showFieldError(otherDetails, 'Please provide details for "Other" option');
                return false;
            }

            if (otherDetailsValue.length < 5) {
                showFieldError(otherDetails, 'Please provide more details (at least 5 characters)');
                return false;
            }
        }

        return true;
    }

    function validateInquiryDetails() {
        const inquiryDetailsInput = document.getElementById('inquiry-details');
        const inquiryValue = inquiryDetailsInput.value.trim();

        if (!inquiryValue) {
            showFieldError(inquiryDetailsInput, 'Please provide details about your inquiry, requirements, quantity, and any specific questions you may have');
            return false;
        }

        if (inquiryValue.length < 10) {
            showFieldError(inquiryDetailsInput, 'Please provide more detailed information (at least 10 characters)');
            return false;
        }

        if (inquiryValue.length > 2000) {
            showFieldError(inquiryDetailsInput, 'Inquiry details are too long (maximum 2000 characters)');
            return false;
        }

        return true;
    }

    function validateUrgency() {
        const urgencyInput = document.getElementById('urgency');
        const urgencyValue = urgencyInput.value;

        if (!urgencyValue) {
            showFieldError(urgencyInput, 'Please select an urgency level for your inquiry');
            return false;
        }

        return true;
    }

    function createOtherDetailsField() {
        const productGroup = document.getElementById('product').closest('.form-group');
        const otherDetailsDiv = document.createElement('div');
        otherDetailsDiv.className = 'form-group other-details-group';
        otherDetailsDiv.innerHTML = `
            <label for="other-details" style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 0.5rem;">
                📝 Please Specify Details *
            </label>
            <textarea id="other-details" name="other-details" class="form-textarea" 
                      placeholder="Please provide details about the software/hardware you're inquiring about..." 
                      rows="3" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;"></textarea>
        `;

        productGroup.insertAdjacentElement('afterend', otherDetailsDiv);

        const otherDetailsInput = document.getElementById('other-details');
        otherDetailsInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });

        return otherDetailsInput;
    }

    // Main form validation function - validates all fields and shows errors for empty fields
    function validateAllFields() {
        clearErrors();
        clearSuccess();

        let isValid = true;
        let firstErrorField = null;

        // Validate each field and show errors for empty/invalid fields
        const nameValid = validateName();
        if (!nameValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('name');
        }

        const mobileValid = validateMobile();
        if (!mobileValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('mobile');
        }

        const emailValid = validateEmail();
        if (!emailValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('email');
        }

        // === START: ADDED STATE/CITY VALIDATION CALLS ===
        const stateValid = validateState();
        if (!stateValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('state');
        }

        const cityValid = validateCity();
        if (!cityValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('city');
        }
        // === END: ADDED STATE/CITY VALIDATION CALLS ===

        const productValid = validateProductSelection();
        if (!productValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('product');
        }

        const inquiryValid = validateInquiryDetails();
        if (!inquiryValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('inquiry-details');
        }

        const urgencyValid = validateUrgency();
        if (!urgencyValid) {
            isValid = false;
            if (!firstErrorField) firstErrorField = document.getElementById('urgency');
        }

        // Scroll to top of form and then focus on first error field
        if (!isValid) {
            // First scroll to the top of the form
            const formTop = form.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: formTop,
                behavior: 'smooth'
            });

            // Then focus on first error field after scroll completes
            setTimeout(() => {
                if (firstErrorField) {
                    firstErrorField.focus();
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 800);
        }

        return isValid;
    }

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields and show individual errors
        if (validateAllFields()) {
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;

            // Naya code: Data ko server par bhejne ke liye Fetch API ka use karein
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', document.getElementById('name').value.trim());
            formDataToSend.append('mobileNumber', document.getElementById('mobile').value.trim());
            formDataToSend.append('email', document.getElementById('email').value.trim());
            
            // === START: ADDED STATE/CITY DATA ===
            formDataToSend.append('state', document.getElementById('state').value.trim());
            formDataToSend.append('city', document.getElementById('city').value.trim());
            // === END: ADDED STATE/CITY DATA ===

            // Product value handle karein (agar 'other' select kiya hai to uski value bhi lein)
            let productValue = document.getElementById('product').value;
            const otherDetailsInput = document.getElementById('other-details');
            if (productValue === 'other' && otherDetailsInput) {
                productValue = `Other: ${otherDetailsInput.value.trim()}`;
            }
            formDataToSend.append('productType', productValue);
            formDataToSend.append('description', document.getElementById('inquiry-details').value.trim());
            formDataToSend.append('urgencyLevel', document.getElementById('urgency').value);

            // === IMPORTANT: 'localhost' URL ko relative path se badal dein jab website live ho ===
            // Abhi ke liye localhost rakha hai
            fetch('http://localhost/inquiry_system/submit_inquiry.php', {
                method: 'POST',
                body: formDataToSend
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Server se success response aane par success message dikhayein
                    showSuccess('Your inquiry has been submitted successfully! We will contact you shortly.');
                } else {
                    // Server se error aane par alert dikhayein
                    alert('An error occurred: ' + data.message);
                }
            })
            .catch(error => {
                // Network ya server error ke liye
                console.error('Submission Error:', error);
                alert('Could not submit the form. Please check your connection or contact support.');
            })
            .finally(() => {
                // Success ya error, dono case mein button ko normal kar dein
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        }
    });

    // Initialize real-time validation for each field
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.classList.add('form-input');

        mobileInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            this.value = value;

            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });

        mobileInput.addEventListener('blur', validateMobile);

        mobileInput.addEventListener('keydown', function (e) {
            if ([46, 8, 9, 27, 13, 110].includes(e.keyCode) ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.classList.add('form-input');
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.classList.add('form-input');
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });
    }

    const inquiryDetailsInput = document.getElementById('inquiry-details');
    if (inquiryDetailsInput) {
        inquiryDetailsInput.classList.add('form-textarea');
        inquiryDetailsInput.addEventListener('blur', validateInquiryDetails);
        inquiryDetailsInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });
    }

    const productSelect = document.getElementById('product');
    if (productSelect) {
        productSelect.addEventListener('change', function () {
            const otherDetails = document.getElementById('other-details');

            if (this.value === 'other' && !otherDetails) {
                createOtherDetailsField();
            }

            if (this.value !== 'other' && otherDetails) {
                otherDetails.parentNode.remove();
            }

            clearFieldError(this);
            validateProductSelection();
        });

        productSelect.addEventListener('blur', validateProductSelection);
    }

    const urgencySelect = document.getElementById('urgency');
    if (urgencySelect) {
        urgencySelect.addEventListener('change', function () {
            clearFieldError(this);
            validateUrgency();
        });
        urgencySelect.addEventListener('blur', validateUrgency);
    }

    // === START: ADDED STATE/CITY REAL-TIME VALIDATION ===
    const stateInput = document.getElementById('state');
    if (stateInput) {
        stateInput.classList.add('form-input');
        stateInput.addEventListener('blur', validateState);
        stateInput.addEventListener('input', function () {
            // Regex to remove non-letter and non-space characters
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });
    }

    const cityInput = document.getElementById('city');
    if (cityInput) {
        cityInput.classList.add('form-input');
        cityInput.addEventListener('blur', validateCity);
        cityInput.addEventListener('input', function () {
            // Regex to remove non-letter and non-space characters
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
            if (this.value.length > 0) {
                clearFieldError(this);
            }
        });
    }
    // === END: ADDED STATE/CITY REAL-TIME VALIDATION ===


    const productSelectElement = document.getElementById('product');
    if (productSelectElement) {
        enhanceAnimatedDropdown(productSelectElement);
    }

    const urgencySelectElement = document.getElementById('urgency');
    if (urgencySelectElement) {
        enhanceAnimatedDropdown(urgencySelectElement);
    }

    // State/City ke enhanced dropdown calls yahan se hata diye gaye hain
}

// Enhanced dropdown function
function enhanceAnimatedDropdown(selectEl) {
    // === START: NEW CODE ===
    // Check if this select is already wrapped
    // Agar pehle se styled hai, to purani style hata do
    if (selectEl.parentElement.classList.contains('cdrop')) {
        const wrapper = selectEl.parentElement;
        const grandParent = wrapper.parentElement;
        // Original <select> ko wapas bahar nikaalo
        grandParent.insertBefore(selectEl, wrapper);
        // Purana custom wrapper (styling) delete karo
        grandParent.removeChild(wrapper);
        // Helper class hata do
        selectEl.classList.remove('visually-hidden-select');
    }
    // === END: NEW CODE ===

    // Inject styles once
    if (!document.getElementById('animated-dropdown-styles')) {
        const style = document.createElement('style');
        style.id = 'animated-dropdown-styles';
        style.textContent = `
            .cdrop { position: relative; }
            .cdrop-toggle { width: 100%; padding: 12px 15px; border: 1px solid #ddd; border-radius: 5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:space-between; font-size: 16px; transition: border-color 0.3s, box-shadow 0.3s; }
            .cdrop-toggle:focus { outline: none; border-color:#3498db; box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2); }
            .cdrop-toggle.error { border-color: #dc3545 !important; box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important; }
            .cdrop-arrow { margin-left: 8px; transition: transform .2s ease; font-size: 12px; color: #666; }
            .cdrop.open .cdrop-arrow { transform: rotate(180deg); }
            .cdrop-menu { position:absolute; left:0; right:0; top: calc(100% + 5px); background:#fff; border:1px solid #ddd; border-radius:5px; box-shadow:0 5px 15px rgba(0,0,0,0.1); max-height:200px; overflow:auto; padding:5px; opacity:0; pointer-events:none; transform: translateY(-10px); transition: opacity 0.2s ease, transform 0.2s ease; z-index: 1000; }
            .cdrop.open .cdrop-menu { opacity:1; pointer-events:auto; transform: translateY(0); }
            .cdrop-item { padding:10px 12px; border-radius:3px; cursor:pointer; font-size: 14px; transition: background-color 0.2s; }
            .cdrop-item:hover, .cdrop-item.selected { background:#f8f9fa; }
            .cdrop-group { padding:8px 12px; font-weight:600; color:#495057; font-size:14px; background:#e9ecef; margin: 2px 0; border-radius: 3px; }
            .visually-hidden-select { position:absolute !important; opacity:0 !important; pointer-events:none !important; width:0 !important; height:0 !important; }
        `;
        document.head.appendChild(style);
    }

    // Wrap select
    const wrapper = document.createElement('div');
    wrapper.className = 'cdrop';
    selectEl.parentElement.insertBefore(wrapper, selectEl);
    wrapper.appendChild(selectEl);
    selectEl.classList.add('visually-hidden-select');

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'cdrop-toggle';
    
    // === START: UPDATED getLabel FUNCTION ===
    const getLabel = () => {
        const opt = selectEl.options[selectEl.selectedIndex];
        
        if (opt && opt.value !== '') {
            return opt.text;
        }
        
        if (selectEl.id === 'product') {
            return 'Select a product category';
        }
        if (selectEl.id === 'urgency') {
            return 'Select urgency level';
        }
        // State/City text inputs hain, to yeh code unke liye nahi chalega,
        // lekin future ke liye safe hai.
        if (selectEl.id === 'state') {
            return 'Select State';
        }
        if (selectEl.id === 'city') {
            return 'Select State First';
        }
        
        return 'Select...';
    };
    // === END: UPDATED getLabel FUNCTION ===

    toggle.innerHTML = `<span class="cdrop-label">${getLabel()}</span><span class="cdrop-arrow">▼</span>`;
    wrapper.appendChild(toggle);

    const menu = document.createElement('div');
    menu.className = 'cdrop-menu';
    wrapper.appendChild(menu);

    // Build menu from select options
    Array.from(selectEl.children).forEach(child => {
        if (child.tagName === 'OPTGROUP') {
            const header = document.createElement('div');
            header.className = 'cdrop-group';
            header.textContent = child.label;
            menu.appendChild(header);
            Array.from(child.children).forEach(opt => addItem(opt));
        } else if (child.tagName === 'OPTION') {
            addItem(child);
        }
    });

    function addItem(optionEl) {
        const disabled = optionEl.disabled || optionEl.value === '';
        if (disabled) return;
        
        const item = document.createElement('div');
        item.className = 'cdrop-item';
        if (optionEl.selected) {
            item.classList.add('selected');
        }
        item.setAttribute('role', 'option');
        item.textContent = optionEl.text;
        item.addEventListener('click', () => {
            selectEl.value = optionEl.value;
            toggle.querySelector('.cdrop-label').textContent = optionEl.text;
            wrapper.classList.remove('open');
            
            menu.querySelectorAll('.cdrop-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            
            selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        });
        menu.appendChild(item);
    }

    // Toggle behavior
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });

    // Close on outside click / escape
    if (!document.body.dataset.cdropListeners) {
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.cdrop.open').forEach(openWrapper => {
                if (!openWrapper.contains(e.target)) {
                    openWrapper.classList.remove('open');
                }
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.cdrop.open').forEach(w => w.classList.remove('open'));
            }
        });
        document.body.dataset.cdropListeners = 'true';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize form validation
    initializeFormValidation();

    // Initialize product filtering with smooth scrolling only
    initializeProductFilter();

    // Set active navigation
    setActiveNavLink();

    console.log('INFINITY TECHNO SOLUTION website loaded successfully!');
});
