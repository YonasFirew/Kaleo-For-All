// Carousel functionality for Projects in Progress
class ProjectCarousel {
    constructor(container, cards) {
        this.container = container;
        this.cards = cards;
        this.currentIndex = 0;
        this.totalCards = cards.length;
        this.init();
    }

    init() {
        this.updateCarousel();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const nextButton = document.getElementById('carouselNext');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.next());
        }

        // Touch support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }

    updateCarousel() {
        this.cards.forEach((card, index) => {
            const relativeIndex = (index - this.currentIndex + this.totalCards) % this.totalCards;
            card.setAttribute('data-index', relativeIndex);
        });
    }
}

// View toggle functionality
function setupViewToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const cardView = document.getElementById('cardView');
    const listView = document.getElementById('listView');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const view = button.getAttribute('data-view');
            
            // Toggle between card and list views
            if (view === 'card') {
                if (cardView) cardView.style.display = 'block';
                if (listView) listView.style.display = 'none';
            } else if (view === 'list') {
                if (cardView) cardView.style.display = 'none';
                if (listView) listView.style.display = 'block';
            }
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-bar i');
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // Add your search logic here
        }
    };
    
    searchIcon.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Date picker functionality (simple implementation)
function setupDatePicker() {
    const datePicker = document.querySelector('.date-picker');
    
    if (datePicker) {
        datePicker.addEventListener('click', () => {
            // Simple date picker - could be enhanced with a date picker library
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
            
            const today = new Date();
            const dayName = days[today.getDay()];
            const day = today.getDate();
            const monthName = months[today.getMonth()];
            
            // Format the date
            const suffix = getDaySuffix(day);
            const dateText = `${dayName}, ${day}${suffix} ${monthName}`;
            
            datePicker.querySelector('span').textContent = dateText;
        });
    }
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Chart interaction (hover effects)
function setupChartInteractions() {
    const chart = document.getElementById('productivityChart');
    if (!chart) return;
    
    // Add hover effects to data points
    const circles = chart.querySelectorAll('circle[fill="#00B8D9"], circle[fill="#8E44AD"]');
    
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', (e) => {
            circle.setAttribute('r', '6');
            circle.style.opacity = '0.8';
        });
        
        circle.addEventListener('mouseleave', (e) => {
            circle.setAttribute('r', '4');
            circle.style.opacity = '1';
        });
    });
}

// Table row selection
function setupTableInteractions() {
    const tableRows = document.querySelectorAll('.tasks-table tbody tr');
    const selectAllCheckbox = document.getElementById('selectAll');
    
    // Select all functionality
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.tasks-table tbody input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = e.target.checked;
            });
        });
    }
    
    tableRows.forEach((row, index) => {
        row.addEventListener('click', (e) => {
            // Don't toggle if clicking directly on checkbox or action button
            if (e.target.type !== 'checkbox' && !e.target.closest('.action-btn')) {
                const checkbox = row.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        });
    });
}

// User filtering functionality
function setupUserFilters() {
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusFilter');
    const userSearch = document.getElementById('userSearch');
    
    const filterUsers = () => {
        const roleValue = roleFilter ? roleFilter.value : 'all';
        const statusValue = statusFilter ? statusFilter.value : 'all';
        const searchValue = userSearch ? userSearch.value.toLowerCase() : '';
        
        // Filter cards
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(card => {
            const cardRole = card.getAttribute('data-role');
            const cardStatus = card.getAttribute('data-status');
            const cardName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardEmail = card.querySelector('.user-email')?.textContent.toLowerCase() || '';
            
            const roleMatch = roleValue === 'all' || cardRole === roleValue;
            const statusMatch = statusValue === 'all' || cardStatus === statusValue;
            const searchMatch = searchValue === '' || cardName.includes(searchValue) || cardEmail.includes(searchValue);
            
            if (roleMatch && statusMatch && searchMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Filter table rows
        const tableRows = document.querySelectorAll('.tasks-table tbody tr');
        tableRows.forEach(row => {
            const rowRole = row.getAttribute('data-role');
            const rowStatus = row.getAttribute('data-status');
            const rowName = row.querySelector('.admin-avatar span')?.textContent.toLowerCase() || '';
            const rowEmail = row.cells[2]?.textContent.toLowerCase() || '';
            
            const roleMatch = roleValue === 'all' || rowRole === roleValue;
            const statusMatch = statusValue === 'all' || rowStatus === statusValue;
            const searchMatch = searchValue === '' || rowName.includes(searchValue) || rowEmail.includes(searchValue);
            
            if (roleMatch && statusMatch && searchMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };
    
    if (roleFilter) roleFilter.addEventListener('change', filterUsers);
    if (statusFilter) statusFilter.addEventListener('change', filterUsers);
    if (userSearch) {
        userSearch.addEventListener('input', filterUsers);
    }
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle specific navigation targets
            const target = item.getAttribute('data-target');
            if (target) {
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    // Scroll to target with offset for header
                    const headerHeight = document.querySelector('.header').offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add a highlight effect
                    targetElement.style.transition = 'box-shadow 0.3s ease';
                    targetElement.style.boxShadow = '0 4px 16px rgba(0, 184, 217, 0.3)';
                    
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 2000);
                }
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (carouselContainer && projectCards.length > 0) {
        new ProjectCarousel(carouselContainer, Array.from(projectCards));
    }
    
    // Setup other features
    setupNavigation();
    setupViewToggle();
    setupSearch();
    setupDatePicker();
    setupChartInteractions();
    setupTableInteractions();
    setupUserFilters();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    // Only navigate if carousel is in view
    const rect = carouselContainer.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
        if (e.key === 'ArrowRight') {
            const nextButton = document.getElementById('carouselNext');
            if (nextButton) nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            // Would need to add a prev button or handle differently
            // For now, we'll just use the next button
        }
    }
});

