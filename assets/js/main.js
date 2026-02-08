$(function () {
    'use strict';
    featured();
    pagination(false);
    themeToggle();
    tagSummary();
    pdfPreviews();
});

function themeToggle() {
    'use strict';
    var toggleButtons = document.querySelectorAll('.gh-theme-toggle');
    if (!toggleButtons.length) return;

    function getEffectiveTheme() {
        if (document.documentElement.classList.contains('theme-dark')) return 'dark';
        if (document.documentElement.classList.contains('theme-light')) return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateToggles() {
        var theme = getEffectiveTheme();
        toggleButtons.forEach(function (btn) {
            btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.querySelector('.gh-theme-icon-dark').style.display = theme === 'light' ? 'block' : 'none';
            btn.querySelector('.gh-theme-icon-light').style.display = theme === 'dark' ? 'block' : 'none';
        });
    }

    toggleButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var current = getEffectiveTheme();
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.classList.remove('theme-dark', 'theme-light');
            document.documentElement.classList.add('theme-' + next);
            localStorage.setItem('ghost-dawn-theme', next);
            updateToggles();
        });
    });

    updateToggles();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!localStorage.getItem('ghost-dawn-theme')) {
            updateToggles();
        }
    });
}

function tagSummary() {
    'use strict';
    var dataEl = document.querySelector('.tag-summary-data');
    if (!dataEl) return;

    var posts;
    try {
        posts = JSON.parse(dataEl.textContent);
    } catch (e) {
        return;
    }

    var navCounts = document.querySelectorAll('[data-tag-nav]');

    var counts = {};
    posts.forEach(function (post) {
        post.t.forEach(function (tag) {
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });

    navCounts.forEach(function (link) {
        var tag = link.getAttribute('data-tag-nav');
        var count = counts[tag] || 0;
        var countEl = link.querySelector('.tag-summary-nav-count');
        if (countEl) countEl.textContent = count;
        if (count === 0) link.closest('.tag-summary-nav-item').classList.add('is-zero');
    });
}

function pdfPreviews() {
    'use strict';
    var fileCards = document.querySelectorAll('.kg-file-card');
    if (!fileCards.length) return;

    fileCards.forEach(function (card) {
        var link = card.querySelector('.kg-file-card-container');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href || !href.toLowerCase().endsWith('.pdf')) return;

        var title = card.querySelector('.kg-file-card-title');
        var titleText = title ? title.textContent : 'PDF Document';

        var preview = document.createElement('div');
        preview.className = 'pdf-preview-wrapper';
        preview.innerHTML = '<iframe src="' + href + '" class="pdf-preview-iframe" title="' + titleText + '"></iframe>';

        card.classList.add('has-pdf-preview');
        if (!card.classList.contains('kg-width-wide') && !card.classList.contains('kg-width-full')) {
            card.classList.add('kg-width-wide');
        }
        card.appendChild(preview);
    });
}

function featured() {
    'use strict';
    $('.featured-feed').owlCarousel({
        dots: false,
        margin: 30,
        nav: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" class="icon"><path d="M20.547 22.107L14.44 16l6.107-6.12L18.667 8l-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" class="icon"><path d="M11.453 22.107L17.56 16l-6.107-6.12L13.333 8l8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}
