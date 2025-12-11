// Common functions for all pages

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to cards on scroll
    animateCardsOnScroll();
    
    // Initialize page-specific functions
    if (document.body.classList.contains('quotes-page')) {
        initQuotesPage();
    } else if (document.body.classList.contains('tips-page')) {
        initTipsPage();
    } else if (document.body.classList.contains('ai-page')) {
        initAIPage();
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Animate cards when they come into view
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.glass-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// QUOTES PAGE FUNCTIONS
function initQuotesPage() {
    // Generate random quote
    const generateBtn = document.getElementById('generate-quote-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRandomQuote);
    }
    
    // Copy quote to clipboard
    document.querySelectorAll('.copy-quote-btn').forEach(button => {
        button.addEventListener('click', copyQuoteToClipboard);
    });
    
    // Generate AI quote
    const aiQuoteBtn = document.getElementById('ai-quote-btn');
    if (aiQuoteBtn) {
        aiQuoteBtn.addEventListener('click', generateAIQuote);
    }
}

function generateRandomQuote() {
    const quotes = document.querySelectorAll('.quote-card');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Scroll to random quote
    quotes[randomIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight the quote
    quotes[randomIndex].style.boxShadow = '0 0 0 3px rgba(255, 126, 95, 0.5)';
    setTimeout(() => {
        quotes[randomIndex].style.boxShadow = '';
    }, 2000);
}

function copyQuoteToClipboard(event) {
    const quoteCard = event.target.closest('.quote-card');
    const quoteText = quoteCard.querySelector('.quote-text').textContent;
    const quoteAuthor = quoteCard.querySelector('.quote-author').textContent;
    const fullQuote = `${quoteText} - ${quoteAuthor}`;
    
    navigator.clipboard.writeText(fullQuote).then(() => {
        // Show success message
        const originalText = event.target.textContent;
        event.target.textContent = 'Copied!';
        event.target.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        
        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.style.background = '';
        }, 2000);
    });
}

function generateAIQuote() {
    const topicInput = document.getElementById('quote-topic');
    const resultBox = document.getElementById('ai-quote-result');
    
    if (!topicInput.value.trim()) {
        resultBox.innerHTML = '<span style="color: #ffcc00;">Please enter a topic first!</span>';
        return;
    }
    
    const topic = topicInput.value;
    resultBox.innerHTML = '<div class="loading">Generating inspirational quote...</div>';
    
    // Simulate AI processing delay
    setTimeout(() => {
        const aiQuotes = [
            `"The only way to do great work with ${topic} is to love what you do."`,
            `"Your ${topic} journey begins with a single step. Take it today."`,
            `"Success in ${topic} comes from consistent small efforts, not occasional giant leaps."`,
            `"Let your passion for ${topic} drive you when motivation runs low."`,
            `"The expert in ${topic} was once a beginner who never gave up."`,
            `"${topic.charAt(0).toUpperCase() + topic.slice(1)} is not just a goal, it's a way of living."`,
            `"Dream big about ${topic}, start small, and begin now."`,
            `"Your ${topic} potential is limitless when you believe in yourself."`
        ];
        
        const randomQuote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
        const authors = ["AI Inspiration", "Daily Boost AI", "Motivational AI", "Positive Mindset AI"];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        
        resultBox.innerHTML = `
            <div class="quote-text">${randomQuote}</div>
            <div class="quote-author">- ${randomAuthor}</div>
            <button class="btn btn-small copy-quote-btn" style="margin-top: 15px;">Copy This Quote</button>
        `;
        
        // Add event listener to the new copy button
        resultBox.querySelector('.copy-quote-btn').addEventListener('click', copyQuoteToClipboard);
    }, 800);
}

// TIPS PAGE FUNCTIONS
function initTipsPage() {
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', filterTips);
    });
    
    // Generate AI tip
    const aiTipBtn = document.getElementById('ai-tip-btn');
    if (aiTipBtn) {
        aiTipBtn.addEventListener('click', generateAITip);
    }
}

function filterTips(event) {
    const category = event.target.dataset.category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter tips
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function generateAITip() {
    const categorySelect = document.getElementById('tip-category');
    const resultBox = document.getElementById('ai-tip-result');
    
    const category = categorySelect.value;
    resultBox.innerHTML = '<div class="loading">Generating life tip...</div>';
    
    // Simulate AI processing delay
    setTimeout(() => {
        const tipsByCategory = {
            study: [
                "Study in 25-minute focused sessions with 5-minute breaks (Pomodoro Technique).",
                "Teach what you've learned to someone else - it reinforces your understanding.",
                "Create a dedicated study space free from distractions.",
                "Review material within 24 hours to improve retention by up to 60%.",
                "Use active recall instead of passive rereading for better memory."
            ],
            health: [
                "Drink a glass of water first thing in the morning to kickstart your metabolism.",
                "Take a 10-minute walk after meals to improve digestion and blood sugar control.",
                "Practice 5 minutes of deep breathing daily to reduce stress and improve focus.",
                "Get 7-8 hours of quality sleep - it's essential for physical and mental recovery.",
                "Incorporate strength training 2-3 times per week for bone health and metabolism."
            ],
            habits: [
                "Start your day by making your bed - it creates momentum for other tasks.",
                "Keep a gratitude journal and write 3 things you're thankful for each day.",
                "Use the '2-minute rule' - if a task takes less than 2 minutes, do it immediately.",
                "Set phone-free times during your day to improve focus and reduce anxiety.",
                "Practice the 'one-touch' rule for emails - handle each email only once when you open it."
            ],
            productivity: [
                "Plan your next day the night before to start with clarity and purpose.",
                "Batch similar tasks together to reduce context switching and improve efficiency.",
                "Use the 80/20 rule - focus on the 20% of tasks that yield 80% of results.",
                "Schedule breaks intentionally - they prevent burnout and maintain creativity.",
                "Set specific time blocks for checking email instead of constant interruptions."
            ]
        };
        
        const tips = tipsByCategory[category] || tipsByCategory.study;
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const emojis = ["💡", "🌟", "🚀", "🎯", "✨"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        resultBox.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">${randomEmoji}</div>
            <div style="font-size: 1.2rem; line-height: 1.5;">${randomTip}</div>
            <div style="margin-top: 15px; color: #a8edea;">AI-generated tip for ${category}</div>
        `;
    }, 800);
}

// AI PAGE FUNCTIONS
function initAIPage() {
    // Initialize all AI tools
    initAIQuoteGenerator();
    initAITipGenerator();
    initAISummarizer();
    initAIAskAnything();
}

function initAIQuoteGenerator() {
    const generateBtn = document.getElementById('generate-ai-quote-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAIQuoteTool);
    }
}

function generateAIQuoteTool() {
    const topicInput = document.getElementById('ai-quote-topic');
    const resultBox = document.getElementById('ai-quote-tool-result');
    
    if (!topicInput.value.trim()) {
        resultBox.innerHTML = '<span style="color: #ffcc00;">Please enter a topic first!</span>';
        return;
    }
    
    const topic = topicInput.value;
    resultBox.innerHTML = '<div class="loading">Generating AI quote about ' + topic + '...</div>';
    
    // Simulate AI processing
    setTimeout(() => {
        const aiQuotes = [
            `"The beauty of ${topic} lies not in the destination, but in the journey of discovery."`,
            `"Mastering ${topic} requires patience, persistence, and a passion for growth."`,
            `"Let ${topic} be your compass, guiding you toward your true purpose."`,
            `"In the realm of ${topic}, every setback is a setup for a greater comeback."`,
            `"${topic.charAt(0).toUpperCase() + topic.slice(1)} teaches us that our limits are often self-imposed."`,
            `"The wisdom of ${topic} reveals itself to those who approach with an open heart and mind."`,
            `"Through ${topic}, we learn that the smallest steps can lead to the greatest transformations."`,
            `"${topic.charAt(0).toUpperCase() + topic.slice(1)} is the canvas upon which we paint our potential."`
        ];
        
        const randomQuote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
        const authors = ["Daily Boost AI", "Inspiration Engine", "Mindful AI", "Wisdom Generator"];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        
        resultBox.innerHTML = `
            <div class="quote-text" style="font-size: 1.3rem;">${randomQuote}</div>
            <div class="quote-author" style="margin-top: 15px;">- ${randomAuthor}</div>
        `;
    }, 800);
}

function initAITipGenerator() {
    const generateBtn = document.getElementById('generate-ai-tip-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAITipTool);
    }
}

function generateAITipTool() {
    const categorySelect = document.getElementById('ai-tip-category');
    const resultBox = document.getElementById('ai-tip-tool-result');
    
    const category = categorySelect.value;
    resultBox.innerHTML = '<div class="loading">Generating AI life tip for ' + category + '...</div>';
    
    // Simulate AI processing
    setTimeout(() => {
        const tipsByCategory = {
            health: [
                "Try intermittent fasting by having your first meal at noon and last by 8 PM for metabolic benefits.",
                "Practice 4-7-8 breathing: inhale 4 seconds, hold 7 seconds, exhale 8 seconds to calm your nervous system.",
                "Expose your eyes to morning sunlight within 30 minutes of waking to regulate circadian rhythm.",
                "Consume fermented foods like kimchi or kefir daily to support gut health and immunity.",
                "Incorporate balance exercises into your routine to improve proprioception and prevent injuries."
            ],
            productivity: [
                "Use time-blocking with color coding for different types of tasks to visualize your day.",
                "Implement the 'Eisenhower Matrix' to prioritize tasks by urgency and importance.",
                "Try 'theme days' where each day focuses on a different area of work or life.",
                "Use a 'distraction list' to jot down intrusive thoughts and return to them later.",
                "Schedule your most challenging task during your biological peak performance time."
            ],
            relationships: [
                "Practice active listening by paraphrasing what someone said before responding.",
                "Schedule regular 'connection time' with important people without digital distractions.",
                "Express specific appreciation daily using the format 'I appreciate when you... because...'",
                "Establish relationship rituals like weekly check-ins or monthly adventure dates.",
                "Learn your loved ones' love languages and express care in ways they value most."
            ],
            mindset: [
                "Practice 'negative visualization' - imagine life without your blessings to increase gratitude.",
                "Use 'cognitive distancing' by referring to yourself in third person during challenges.",
                "Implement a 'worry period' - contain anxious thoughts to a specific 15-minute window.",
                "Adopt a 'growth mindset' by adding 'yet' to statements like 'I can't do this... yet.'",
                "Practice 'mental time travel' - imagine your future self thanking you for current efforts."
            ]
        };
        
        const tips = tipsByCategory[category] || tipsByCategory.health;
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const emojis = ["💡", "🌟", "🚀", "🎯", "✨"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        resultBox.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 15px;">${randomEmoji}</div>
            <div style="font-size: 1.2rem; line-height: 1.6; margin-bottom: 15px;">${randomTip}</div>
            <div style="color: #a8edea; font-size: 0.9rem;">AI-generated ${category} tip</div>
        `;
    }, 800);
}

function initAISummarizer() {
    const summarizeBtn = document.getElementById('summarize-btn');
    if (summarizeBtn) {
        summarizeBtn.addEventListener('click', summarizeText);
    }
}

function summarizeText() {
    const textInput = document.getElementById('text-to-summarize');
    const resultBox = document.getElementById('summarizer-result');
    
    if (!textInput.value.trim() || textInput.value.split(' ').length < 10) {
        resultBox.innerHTML = '<span style="color: #ffcc00;">Please enter at least 10 words to summarize!</span>';
        return;
    }
    
    const text = textInput.value;
    resultBox.innerHTML = '<div class="loading">Analyzing and summarizing text...</div>';
    
    // Simulate AI processing
    setTimeout(() => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const wordCount = text.split(' ').length;
        
        // Create a simple summary (in a real app, this would use NLP)
        let summary = '';
        
        if (sentences.length >= 3) {
            summary = sentences[0] + '. ' + sentences[Math.floor(sentences.length/2)] + '. ' + sentences[sentences.length-1] + '.';
        } else if (sentences.length > 0) {
            summary = sentences[0] + '.';
        }
        
        // Limit summary length
        if (summary.split(' ').length > 50) {
            const summaryWords = summary.split(' ');
            summary = summaryWords.slice(0, 50).join(' ') + '...';
        }
        
        resultBox.innerHTML = `
            <div style="margin-bottom: 15px;">
                <span style="color: #36d1dc; font-weight: bold;">Summary (${summary.split(' ').length} words):</span>
            </div>
            <div style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">${summary}</div>
            <div style="color: #a8edea; font-size: 0.9rem;">
                Original text: ${wordCount} words → Summary: ${summary.split(' ').length} words
            </div>
        `;
    }, 1200);
}

function initAIAskAnything() {
    const askBtn = document.getElementById('ask-ai-btn');
    if (askBtn) {
        askBtn.addEventListener('click', askAI);
    }
}

function askAI() {
    const questionInput = document.getElementById('ai-question');
    const resultBox = document.getElementById('ask-ai-result');
    
    if (!questionInput.value.trim()) {
        resultBox.innerHTML = '<span style="color: #ffcc00;">Please ask a question first!</span>';
        return;
    }
    
    const question = questionInput.value.toLowerCase();
    resultBox.innerHTML = '<div class="loading">Analyzing your question and generating helpful answer...</div>';
    
    // Simulate AI processing with different responses based on keywords
    setTimeout(() => {
        let answer = '';
        
        if (question.includes('motivation') || question.includes('motivated')) {
            answer = "Motivation often follows action, not the other way around. Start with a tiny, manageable step - just 2 minutes of the activity you're avoiding. Momentum builds motivation. Also, connect your task to a deeper 'why' - how does it serve your values or long-term vision? Remember, discipline beats motivation when cultivated as a habit.";
        } else if (question.includes('stress') || question.includes('anxious')) {
            answer = "When feeling stressed, try the 5-4-3-2-1 grounding technique: Notice 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste. This brings you to the present. Also, practice box breathing (4-second inhale, 4-second hold, 4-second exhale, 4-second hold). Remember that stress is a signal, not a life sentence - it's information about what needs attention.";
        } else if (question.includes('productive') || question.includes('focus')) {
            answer = "For better productivity, work with your natural energy cycles. Most people have peak focus between 9-11 AM. Schedule deep work during this time. Use the Pomodoro technique (25 minutes focus, 5 minutes break). Eliminate decision fatigue by planning tomorrow today. Remember: multitasking reduces productivity by up to 40%. Single-tasking is the real productivity superpower.";
        } else if (question.includes('happy') || question.includes('happiness')) {
            answer = "Research shows happiness comes from: 1) Strong social connections, 2) Meaningful work/activities, 3) A sense of progress, 4) Physical wellbeing, and 5) Gratitude practice. Try the 'three good things' exercise nightly: write down three things that went well and why. Happiness is less about circumstances and more about mindset and daily practices.";
        } else if (question.includes('habit') || question.includes('routine')) {
            answer = "To build lasting habits: 1) Start incredibly small (2 minutes max), 2) Stack it onto an existing habit, 3) Make it obvious with visual cues, 4) Make it attractive by pairing with something enjoyable, 5) Track progress visually. Remember: consistency beats intensity. Missing once is okay; missing twice starts a new pattern. Focus on identity change: 'I'm someone who...'";
        } else {
            // Default answer for other questions
            const defaultAnswers = [
                "Based on psychological research, the key to progress is consistent small actions compounded over time. Break your challenge into microscopic steps and celebrate each completion.",
                "Growth often happens outside comfort zones but within capacity zones. Stretch yourself gently without breaking. Remember that rest is part of progress, not opposition to it.",
                "The most successful people don't have more willpower - they design environments that make good choices inevitable and bad choices difficult. Look at your space design.",
                "Self-compassion is more effective than self-criticism for creating lasting change. Speak to yourself as you would a good friend facing the same challenge.",
                "Progress is rarely linear. Expect plateaus and occasional regression. The key is returning to practice, not perfection. Each return builds resilience."
            ];
            
            answer = defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
        }
        
        resultBox.innerHTML = `
            <div style="margin-bottom: 15px;">
                <span style="color: #36d1dc; font-weight: bold;">AI Insight:</span>
            </div>
            <div style="font-size: 1.1rem; line-height: 1.6;">${answer}</div>
            <div style="margin-top: 20px; color: #a8edea; font-size: 0.9rem;">
                Remember: This is simulated AI advice. For serious concerns, consult a professional.
            </div>
        `;
    }, 1000);
}