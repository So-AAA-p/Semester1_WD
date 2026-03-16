document.addEventListener('DOMContentLoaded', function() 
    {
        // -------------------------- 
        // CONTACT SECTION
        // --------------------------
        const form = document.getElementById('contact-form');
        if (form) 
            {
                form.addEventListener('submit', function(event) 
                    {
                        event.preventDefault();
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const message = document.getElementById('message').value;
                        alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
                        console.log('Contact Data:', { name, email, message });
                        form.reset();
                    });
            }

        // --------------------------
// FAMILY SECTION
// --------------------------
const slidesContainer = document.getElementById('family-slides');
const originalPanels = document.querySelectorAll('.family-panel');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const familyFrame = document.getElementById('family-frame');

const panelColors =
    [
        '#282E52', // Rukia
        '#343B61', // Hisana
        '#484F78', // Sojun
        '#343B61'  // Ginrei
    ];

// Clone first and last panels
const firstClone = originalPanels[0].cloneNode(true);
const lastClone = originalPanels[originalPanels.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

// Add clones to ends
slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, originalPanels[0]);

// Now we have: [lastClone, Rukia, Hisana, Sojun, Ginrei, firstClone]
// Start at index 1 (real Rukia)
let currentIndex = 1;
const allPanels = document.querySelectorAll('.family-panel, #first-clone, #last-clone');

function goToSlide(index, animate)
    {
        if (animate === false)
            {
                slidesContainer.style.transition = 'none';
            }
        else
            {
                slidesContainer.style.transition = 'transform 0.5s ease';
            }

        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // Update background color — map clone indices to real colors
        let colorIndex = index - 1;
        if (colorIndex < 0) colorIndex = panelColors.length - 1;
        if (colorIndex >= panelColors.length) colorIndex = 0;
        familyFrame.style.backgroundColor = panelColors[colorIndex];
        familyFrame.style.transition = 'background-color 0.5s ease';

        currentIndex = index;
    }

// Jump without animation after reaching a clone
slidesContainer.addEventListener('transitionend', function()
    {
        // If on first clone (end), jump to real first
        if (currentIndex === allPanels.length - 1)
            {
                goToSlide(1, false);
            }
        // If on last clone (start), jump to real last
        if (currentIndex === 0)
            {
                goToSlide(allPanels.length - 2, false);
            }
    });

nextBtn.addEventListener('click', function()
    {
        goToSlide(currentIndex + 1, true);
    });

prevBtn.addEventListener('click', function()
    {
        goToSlide(currentIndex - 1, true);
    });

// Start at real first panel
goToSlide(1, false);

// --------------------------
// COMBAT CAROUSEL
// --------------------------
const combatCards = document.querySelectorAll('.combat-card');
const carousel = document.getElementById('combat-carousel');
let activeCard = 0;
let isDragging = false;
let dragStartX = 0;
const snapThreshold = 80; // pixels needed to trigger a card change

function updateCarousel()
{
    combatCards.forEach(function(card, index)
        {
            card.classList.remove('active', 'prev-1', 'next-1', 'hidden');

            const total = combatCards.length;
            let diff = index - activeCard;
            if (diff < -total / 2) diff += total;
            if (diff > total / 2) diff -= total;

            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

            if (diff === 0)
                {
                    card.classList.add('active');
                    card.style.transform = `translateX(0px) scale(1.1)`;
                    card.style.opacity = 1;
                    card.style.zIndex = 5;
                }
            else if (diff === -1)
                {
                    card.classList.add('prev-1');
                    card.style.transform = `translateX(-460px) scale(0.85)`;
                    card.style.opacity = 0.75;
                    card.style.zIndex = 4;
                }
            else if (diff === 1)
                {
                    card.classList.add('next-1');
                    card.style.transform = `translateX(460px) scale(0.85)`;
                    card.style.opacity = 0.75;
                    card.style.zIndex = 4;
                }
            else
    {
        card.classList.add('hidden');
        card.style.opacity = 0;
        card.style.zIndex = 1;
        // Park off-screen on the correct side
        const parkX = diff > 0 ? 1120 : -1120;
        card.style.transform = `translateX(${parkX}px) scale(0.7)`;
    }
        });
}

carousel.addEventListener('mousedown', function(e)
    {
        isDragging = true;
        dragStartX = e.clientX;
        carousel.classList.add('dragging');
    });

document.addEventListener('mousemove', function(e)
    {
        if (!isDragging) return;

        const dragDiff = e.clientX - dragStartX;

        if (dragDiff < -snapThreshold)
            {
                // dragged left — go to next card
                activeCard = (activeCard + 1) % combatCards.length;
                dragStartX = e.clientX; // reset so each snap needs a fresh threshold
                updateCarousel();
            }
        else if (dragDiff > snapThreshold)
            {
                // dragged right — go to previous card
                activeCard = (activeCard - 1 + combatCards.length) % combatCards.length;
                dragStartX = e.clientX;
                updateCarousel();
            }
    });

document.addEventListener('mouseup', function()
    {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

updateCarousel();

// --------------------------
// DYNAMIC COPYRIGHT
// --------------------------
const yearSpan = document.getElementById('copyright-year');
if (yearSpan)
{
    yearSpan.textContent = new Date().getFullYear();
}
});