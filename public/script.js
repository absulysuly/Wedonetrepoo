// Smooth scrolling function
function scrollToMatcher() {
    document.getElementById('matcher').scrollIntoView({
        behavior: 'smooth'
    });
}

// AI Talent Matching Function
async function findTalent() {
    const description = document.getElementById('projectDescription').value.trim();
    
    if (!description) {
        alert('Please describe your project first!');
        return;
    }

    // Show loading state
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const submitButton = document.querySelector('.submit-button');
    
    loading.style.display = 'block';
    results.style.display = 'none';
    submitButton.disabled = true;
    submitButton.textContent = 'Finding...';

    try {
        // Call the AI API for talent matching
        const response = await fetch('/api/match-talent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectDescription: description
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get AI recommendations');
        }

        const data = await response.json();
        displayTalentResults(data.talents || []);
        
    } catch (error) {
        console.error('Error:', error);
        displayErrorMessage('Sorry, we encountered an error while finding talent. Please try again.');
    } finally {
        // Hide loading state
        loading.style.display = 'none';
        submitButton.disabled = false;
        submitButton.textContent = 'Find Talent';
    }
}

// Display talent results
function displayTalentResults(talents) {
    const results = document.getElementById('results');
    const talentList = document.getElementById('talentList');
    
    if (talents.length === 0) {
        talentList.innerHTML = '<p>No matching professionals found. Please try a different description.</p>';
    } else {
        talentList.innerHTML = talents.map(talent => `
            <div class="talent-card">
                <div class="talent-name">${talent.name}</div>
                <div class="talent-skills">Skills: ${talent.skills}</div>
                <div class="talent-description">${talent.description}</div>
                <div class="talent-rating">⭐ ${talent.rating}/5 | $${talent.hourlyRate}/hour</div>
            </div>
        `).join('');
    }
    
    results.style.display = 'block';
}

// Display error message
function displayErrorMessage(message) {
    const results = document.getElementById('results');
    const talentList = document.getElementById('talentList');
    
    talentList.innerHTML = `<p style="color: #ef4444;">${message}</p>`;
    results.style.display = 'block';
}

// Language selector functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language');
    
    languageSelector.addEventListener('change', function(e) {
        const selectedLang = e.target.value;
        
        // Basic language switching (you can expand this)
        const translations = {
            'en': {
                'hero-title': 'Freelance Talent',
                'hero-subtitle': 'Connect with skilled professionals<br>across Iraq for any project.',
                'cta-button': 'Get Started',
                'section-title': 'Tell Us What You Need',
                'form-title': 'Describe Your Project',
                'form-subtitle': 'Let our AI find the right professional<br>for you.'
            },
            'ar': {
                'hero-title': 'المواهب المستقلة',
                'hero-subtitle': 'تواصل مع محترفين مهرة<br>في جميع أنحاء العراق لأي مشروع',
                'cta-button': 'ابدأ الآن',
                'section-title': 'أخبرنا بما تحتاجه',
                'form-title': 'وصف مشروعك',
                'form-subtitle': 'دع الذكاء الاصطناعي يجد المحترف المناسب<br>لك'
            }
        };
        
        // Apply translations (basic implementation)
        if (translations[selectedLang]) {
            const elements = {
                'hero-title': document.querySelector('.hero-title'),
                'hero-subtitle': document.querySelector('.hero-subtitle'),
                'cta-button': document.querySelector('.cta-button'),
                'section-title': document.querySelector('.section-title'),
                'form-title': document.querySelector('.project-form h3'),
                'form-subtitle': document.querySelector('.form-subtitle')
            };
            
            Object.keys(elements).forEach(key => {
                if (elements[key] && translations[selectedLang][key]) {
                    elements[key].innerHTML = translations[selectedLang][key];
                }
            });
            
            // Adjust text direction for Arabic
            if (selectedLang === 'ar') {
                document.body.style.direction = 'rtl';
            } else {
                document.body.style.direction = 'ltr';
            }
        }
    });
});

// Enhanced textarea functionality
document.getElementById('projectDescription').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        findTalent();
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate feature cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});