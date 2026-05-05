class Web3App {
    constructor() {
        this.currentUser = null;
        this.verificationCode = null;
        this.connectedWallet = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Registration form
        document.getElementById('regForm').addEventListener('submit', (e) => this.handleRegistration(e));
        
        // Login form
        document.getElementById('signInForm').addEventListener('submit', (e) => this.handleLogin(e));
        
        // Email verification
        document.getElementById('verificationForm').addEventListener('submit', (e) => this.handleEmailVerification(e));
        document.getElementById('resendCode').addEventListener('submit', (e) => this.resendVerificationCode(e));
        
        // Navigation links
        document.getElementById('loginLink').addEventListener('click', (e) => this.showLoginForm(e));
        document.getElementById('registerLink').addEventListener('click', (e) => this.showRegistrationForm(e));
        
        // Dashboard
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.getElementById('metamaskBtn').addEventListener('click', () => this.connectMetaMask());
        document.getElementById('coinbaseBtn').addEventListener('click', () => this.connectCoinbase());
        document.getElementById('disconnectWallet').addEventListener('click', () => this.disconnectWallet());
        
        // Password toggle buttons
        document.querySelectorAll('.password-toggle').forEach(button => {
            button.addEventListener('click', (e) => this.togglePassword(e));
        });
        
        // Real-time validation
        this.setupFormValidation();
    }

    setupFormValidation() {
        // Registration form validation
        document.getElementById('username').addEventListener('blur', (e) => this.validateUsername(e.target));
        document.getElementById('email').addEventListener('blur', (e) => this.validateEmail(e.target));
        document.getElementById('password').addEventListener('blur', (e) => this.validatePassword(e.target));
        document.getElementById('confirmPassword').addEventListener('blur', (e) => this.validateConfirmPassword(e.target));
        
        // Login form validation
        document.getElementById('loginEmail').addEventListener('blur', (e) => this.validateEmail(e.target, 'loginEmailError'));
        document.getElementById('loginPassword').addEventListener('blur', (e) => this.validatePassword(e.target, 'loginPasswordError'));
    }

    validateUsername(input) {
        const errorElement = document.getElementById('usernameError');
        const value = input.value.trim();
        
        if (value.length < 3) {
            this.showError(input, errorElement, 'Username must be at least 3 characters');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            this.showError(input, errorElement, 'Username can only contain letters, numbers, and underscores');
            return false;
        }
        
        this.clearError(input, errorElement);
        return true;
    }

    validateEmail(input, errorId = 'emailError') {
        const errorElement = document.getElementById(errorId);
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(value)) {
            this.showError(input, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        this.clearError(input, errorElement);
        return true;
    }

    validatePassword(input, errorId = 'passwordError') {
        const errorElement = document.getElementById(errorId);
        const value = input.value;
        
        if (value.length < 8) {
            this.showError(input, errorElement, 'Password must be at least 8 characters');
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            this.showError(input, errorElement, 'Password must contain uppercase, lowercase, and number');
            return false;
        }
        
        this.clearError(input, errorElement);
        return true;
    }

    validateConfirmPassword(input) {
        const errorElement = document.getElementById('confirmPasswordError');
        const password = document.getElementById('password').value;
        const confirmPassword = input.value;
        
        if (password !== confirmPassword) {
            this.showError(input, errorElement, 'Passwords do not match');
            return false;
        }
        
        this.clearError(input, errorElement);
        return true;
    }

    showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    async handleRegistration(e) {
        e.preventDefault();
        
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        // Validate all fields
        const isUsernameValid = this.validateUsername(username);
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);
        const isConfirmPasswordValid = this.validateConfirmPassword(confirmPassword);
        
        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }
        
        // Simulate registration
        this.showLoadingButton(e.target.querySelector('.btn-primary'));
        
        setTimeout(() => {
            // Store user data (in real app, this would be sent to backend)
            this.currentUser = {
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value,
                emailVerified: false
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            // Generate verification code
            this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Verification code:', this.verificationCode); // For demo purposes
            
            this.hideLoadingButton(e.target.querySelector('.btn-primary'));
            this.showEmailVerification();
        }, 1500);
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        
        // Validate fields
        const isEmailValid = this.validateEmail(email, 'loginEmailError');
        const isPasswordValid = this.validatePassword(password, 'loginPasswordError');
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        this.showLoadingButton(e.target.querySelector('.btn-primary'));
        
        setTimeout(() => {
            // Simulate login (in real app, this would verify with backend)
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const user = storedUsers.find(u => u.email === email.value.trim() && u.password === password.value);
            
            if (user) {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.hideLoadingButton(e.target.querySelector('.btn-primary'));
                this.showDashboard();
            } else {
                this.hideLoadingButton(e.target.querySelector('.btn-primary'));
                this.showError(email, document.getElementById('loginEmailError'), 'Invalid email or password');
            }
        }, 1500);
    }

    async handleEmailVerification(e) {
        e.preventDefault();
        
        const codeInput = document.getElementById('verificationCode');
        const errorElement = document.getElementById('verificationError');
        
        if (codeInput.value !== this.verificationCode) {
            this.showError(codeInput, errorElement, 'Invalid verification code');
            return;
        }
        
        this.showLoadingButton(e.target.querySelector('.btn-primary'));
        
        setTimeout(() => {
            this.currentUser.emailVerified = true;
            
            // Store user in users array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(this.currentUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            this.hideLoadingButton(e.target.querySelector('.btn-primary'));
            this.showDashboard();
        }, 1000);
    }

    resendVerificationCode(e) {
        e.preventDefault();
        
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('New verification code:', this.verificationCode); // For demo purposes
        
        alert(`New verification code sent: ${this.verificationCode}`);
    }

    showRegistrationForm(e) {
        e.preventDefault();
        this.hideAllForms();
        document.getElementById('registrationForm').classList.remove('hidden');
    }

    showLoginForm(e) {
        e.preventDefault();
        this.hideAllForms();
        document.getElementById('loginForm').classList.remove('hidden');
    }

    showEmailVerification() {
        this.hideAllForms();
        document.getElementById('emailVerification').classList.remove('hidden');
    }

    showDashboard() {
        this.hideAllForms();
        document.getElementById('dashboard').classList.remove('hidden');
        
        // Update dashboard with user info
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('emailStatus').textContent = this.currentUser.emailVerified ? 'Verified' : 'Not Verified';
    }

    hideAllForms() {
        document.getElementById('registrationForm').classList.add('hidden');
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('emailVerification').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }

    logout() {
        this.currentUser = null;
        this.connectedWallet = null;
        localStorage.removeItem('currentUser');
        this.hideAllForms();
        document.getElementById('registrationForm').classList.remove('hidden');
    }

    async connectMetaMask() {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed. Please install MetaMask to continue.');
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                this.connectedWallet = {
                    type: 'MetaMask',
                    address: accounts[0]
                };
                this.updateWalletUI();
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    }

    async connectCoinbase() {
        if (typeof window.ethereum === 'undefined') {
            alert('Coinbase Wallet is not installed. Please install Coinbase Wallet to continue.');
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                this.connectedWallet = {
                    type: 'Coinbase Wallet',
                    address: accounts[0]
                };
                this.updateWalletUI();
            }
        } catch (error) {
            console.error('Error connecting to Coinbase Wallet:', error);
            alert('Failed to connect to Coinbase Wallet. Please try again.');
        }
    }

    disconnectWallet() {
        this.connectedWallet = null;
        this.updateWalletUI();
    }

    updateWalletUI() {
        const walletInfo = document.getElementById('walletInfo');
        const walletAddress = document.getElementById('walletAddress');
        const walletStatus = document.getElementById('walletStatus');

        if (this.connectedWallet) {
            walletInfo.classList.remove('hidden');
            walletAddress.textContent = this.formatAddress(this.connectedWallet.address);
            walletStatus.textContent = `Connected (${this.connectedWallet.type})`;
            walletStatus.style.color = '#27ae60';
        } else {
            walletInfo.classList.add('hidden');
            walletStatus.textContent = 'Not Connected';
            walletStatus.style.color = '#e74c3c';
        }
    }

    formatAddress(address) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    showLoadingButton(button) {
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading"></span> Processing...';
        button.disabled = true;
        button.dataset.originalText = originalText;
    }

    hideLoadingButton(button) {
        button.textContent = button.dataset.originalText || 'Submit';
        button.disabled = false;
        delete button.dataset.originalText;
    }

    togglePassword(e) {
        const button = e.currentTarget;
        const targetId = button.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    checkExistingSession() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showDashboard();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Web3App();
});

// Add Ethereum provider detection
window.addEventListener('load', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum provider detected');
    } else {
        console.log('No Ethereum provider detected');
    }
});
