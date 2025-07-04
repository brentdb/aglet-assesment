document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.portfolio-track');
    const nextBtn = document.querySelector('.button-next');
    const prevBtn = document.querySelector('.button-previous');
    const progressBar = document.querySelector('.portfolio-progress-bar');
    const scrollByCount = 3;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let currentlyPlaying = null;

    if (!track) return;

    // HAND VIDEO HOVER / TAP INTERACTION
    document.querySelectorAll('.portfolio-showcase-video').forEach(video => {
        const container = video.closest('.case-project');
        const content = container.querySelector('.case-content');

        // CHECK IF ON MOBILE USE CLICK EVENT ELSE IF DESKTOP USE HOVER EVENT
        if (isTouch) {
            video.addEventListener('click', () => {
                if (video.paused) {
                    if (currentlyPlaying && currentlyPlaying !== video) {
                        currentlyPlaying.pause();
                        currentlyPlaying.classList.add('has-overlay');
                        toggleButtons(currentlyPlaying, true);
                        restoreContent(currentlyPlaying);
                    }

                    video.play();
                    video.classList.remove('has-overlay');
                    hideContent(video);
                    toggleButtons(video, false);
                    currentlyPlaying = video;
                } else {
                    video.pause();
                    video.classList.add('has-overlay');
                    showContent(video);
                    toggleButtons(video, true);
                    currentlyPlaying = null;
                }
            });
        } else {
            video.addEventListener('mouseenter', () => {
                if (currentlyPlaying && currentlyPlaying !== video) {
                    currentlyPlaying.pause();
                    currentlyPlaying.classList.add('has-overlay');
                    toggleButtons(currentlyPlaying, true);
                    restoreContent(currentlyPlaying);
                }

                video.play();
                video.classList.remove('has-overlay');
                hideContent(video);
                toggleButtons(video, false);
                currentlyPlaying = video;
            });

            video.addEventListener('mouseleave', () => {
                video.pause();
                video.classList.add('has-overlay');
                showContent(video);
                toggleButtons(video, true);
                currentlyPlaying = null;
            });
        }
    });

    // HANDLE PLAY / PAUSE BUTTONS
    document.querySelectorAll('.case-project').forEach(project => {
        const video = project.querySelector('.portfolio-showcase-video');
        const playButton = project.querySelector('.play-button');
        const content = project.querySelector('.case-content');

        if (!video || !playButton || !content) return;

        // ADD PAUSE BUTTON WHEN PLAY BUTTON CLICKED
        const pauseButton = document.createElement('button');
        pauseButton.className = 'pause-button';
        pauseButton.innerHTML = '<i class="fa fa-pause"></i>';
        pauseButton.style.display = 'none';
        playButton.insertAdjacentElement('afterend', pauseButton);

        const heading = content.querySelector('h2');
        const paragraph = content.querySelector('p');

        playButton.innerHTML = '<i class="fa fa-play"></i>';

        // IF PLAY IS CLICKED, TOGGLE PAUSE BUTTON AND ADD OVERLAY ON PREVIOUS PLAYED VIDEO
        playButton.addEventListener('click', () => {
            if (currentlyPlaying && currentlyPlaying !== video) {
                currentlyPlaying.pause();
                currentlyPlaying.classList.add('has-overlay');
                toggleButtons(currentlyPlaying, true);
                restoreContent(currentlyPlaying);
            }

            video.classList.remove('has-overlay');
            video.play();
            toggleButtons(video, false);
            hideContent(video);
            currentlyPlaying = video;
        });

        // IF PAUSED ADD OVERLAY BACK AND SHOW VIDEO CONTENT
        pauseButton.addEventListener('click', () => {
            video.pause();
            video.classList.add('has-overlay');
            toggleButtons(video, true);
            showContent(video);
            currentlyPlaying = null;
        });

        // IF VIDEO ENDED ADD OVERLAY BACK AND SHOW VIDEO CONTENT
        video.addEventListener('ended', () => {
            video.classList.add('has-overlay');
            toggleButtons(video, true);
            restoreContent(video);
            currentlyPlaying = null;
        });
    });

    // SCROLLING LOGIC
    function getScrollAmount() {
        const item = track.querySelector('.case-project');
        return item ? item.offsetWidth * scrollByCount : 0;
    }

    // UPDATE SCROLL BAR
    function updateProgress() {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const percent = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        progressBar.style.width = percent + '%';
    }

    // NEXT PREVIOUS BUTTON FUNCTIONS
    nextBtn?.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    // UPDATE SCROLL BAR PROGRESS
    track.addEventListener('scroll', updateProgress);
    updateProgress();

    // TRACK MOUSE WHEEL SCROLL
    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        track.scrollBy({
            left: getScrollAmount() * direction,
            behavior: 'smooth'
        });
    }, { passive: false });

    // HELPER FUNCTIONS
    // CHECK MOBILE PORTRAIT WITH
    function isMobileOrTabletPortrait() {
        return window.innerWidth <= 966;
    }

    // HIDE VIDEO CONTENT ON MOBILE 
    function hideContent(video) {
        if (!isMobileOrTabletPortrait()) return;

        const project = video.closest('.case-project');
        const content = project?.querySelector('.case-content');
        if (!content) return;
        const h2 = content.querySelector('h2');
        const p = content.querySelector('p');
        if (h2) h2.style.display = 'none';
        if (p) p.style.display = 'none';
    }

    // SHOW CONTENT WHEN ANOTHER VIDEO IS CLICKED
    function showContent(video) {
        if (!isMobileOrTabletPortrait()) return;

        const project = video.closest('.case-project');
        const content = project?.querySelector('.case-content');
        if (!content) return;
        const h2 = content.querySelector('h2');
        const p = content.querySelector('p');
        if (h2) h2.style.display = '';
        if (p) p.style.display = '';
    }

    function restoreContent(video) {
        showContent(video);
    }

    // TOGGLE PLAY PAUSE BUTTON
    function toggleButtons(video, showPlay) {
        const project = video.closest('.case-project');
        const playBtn = project?.querySelector('.play-button');
        const pauseBtn = project?.querySelector('.pause-button');
        if (playBtn) playBtn.style.display = showPlay ? '' : 'none';
        if (pauseBtn) pauseBtn.style.display = showPlay ? 'none' : '';
    }
});

// MOBILE MENU TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-toggle');
  const icon = menuButton.querySelector('i');

  menuButton.addEventListener('click', () => {
    const isOpen = icon.classList.contains('fa-xmark') || icon.classList.contains('fa-times');

    // IF OPEN CHANGE FONTAWESOME ICON TO X ELSE BARS ICON
    if (isOpen) {
      icon.classList.remove('fa-xmark', 'fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark'); 
    }
  });
});
