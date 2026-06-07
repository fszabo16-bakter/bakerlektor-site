/* ============================================================
   BAKER LEKTOR — weboldal interakciók
   ============================================================ */
(function () {
  'use strict';

  /* ---- Fejléc árnyék görgetésnél ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobil menü ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- GYIK lenyíló ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* ---- Megjelenési animáció ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Letöltés előtti jogi elfogadás ---- */
  var acceptTerms = document.getElementById('acceptTerms');
  var acceptPrivacy = document.getElementById('acceptPrivacy');
  var downloadButton = document.getElementById('downloadButton');
  function refreshDownloadConsent() {
    if (!acceptTerms || !acceptPrivacy || !downloadButton) {
      return;
    }
    var accepted = acceptTerms.checked && acceptPrivacy.checked;
    downloadButton.classList.toggle('is-disabled', !accepted);
    downloadButton.setAttribute('aria-disabled', accepted ? 'false' : 'true');
  }
  if (acceptTerms && acceptPrivacy && downloadButton) {
    acceptTerms.addEventListener('change', refreshDownloadConsent);
    acceptPrivacy.addEventListener('change', refreshDownloadConsent);
    downloadButton.addEventListener('click', function (event) {
      if (downloadButton.getAttribute('aria-disabled') === 'true') {
        event.preventDefault();
      }
    });
    refreshDownloadConsent();
  }

  /* ---- Hero reklámvideó újrajátszás ---- */
  var heroVideo = document.getElementById('heroVideo');
  var heroVideoReplay = document.getElementById('heroVideoReplay');
  if (heroVideo && heroVideoReplay) {
    var heroVideoCard = heroVideo.closest('.hero-video-card');
    var initialPlayTried = false;
    function tryInitialHeroPlay() {
      if (initialPlayTried || heroVideo.ended) {
        return;
      }
      initialPlayTried = true;
      if (heroVideoCard) {
        heroVideoCard.classList.remove('is-ended');
      }
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    }

    if (heroVideo.readyState >= 2) {
      setTimeout(tryInitialHeroPlay, 80);
    } else {
      heroVideo.addEventListener('loadeddata', tryInitialHeroPlay, { once: true });
    }

    heroVideo.addEventListener('ended', function () {
      heroVideo.pause();
      if (heroVideoCard) {
        heroVideoCard.classList.add('is-ended');
      }
    });

    heroVideo.addEventListener('play', function () {
      if (heroVideoCard) {
        heroVideoCard.classList.remove('is-ended');
      }
    });

    heroVideoReplay.addEventListener('click', function () {
      if (heroVideoCard) {
        heroVideoCard.classList.remove('is-ended');
      }
      heroVideo.currentTime = 0;
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    });
  }

})();
