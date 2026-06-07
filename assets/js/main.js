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
  var downloadModal = document.getElementById('downloadModal');
  var modalAcceptTerms = document.getElementById('modalAcceptTerms');
  var modalAcceptPrivacy = document.getElementById('modalAcceptPrivacy');
  var downloadConfirmButton = document.getElementById('downloadConfirmButton');
  var downloadStatus = document.getElementById('downloadStatus');
  var downloadConsentKey = 'bakerlektorDownloadConsentAccepted';

  function storageAvailable() {
    try {
      var testKey = '__baker_storage_test__';
      window.sessionStorage.setItem(testKey, '1');
      window.sessionStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  var canUseStorage = storageAvailable();

  function hasDownloadConsent() {
    return canUseStorage && window.sessionStorage.getItem(downloadConsentKey) === 'true';
  }

  function setDownloadConsent() {
    if (canUseStorage) {
      window.sessionStorage.setItem(downloadConsentKey, 'true');
    }
  }

  function getInstallerUrl() {
    if (!downloadButton) {
      return '';
    }
    return (downloadButton.getAttribute('data-download-url') || downloadButton.getAttribute('href') || '').trim();
  }

  function isRealInstallerUrl(url) {
    return Boolean(url && url !== '#' && url !== 'BAKER_INSTALLER_DOWNLOAD_URL');
  }

  function setDownloadStatus(message) {
    if (downloadStatus) {
      downloadStatus.textContent = message || '';
    }
  }

  function syncVisibleConsent(accepted) {
    if (acceptTerms) {
      acceptTerms.checked = accepted;
    }
    if (acceptPrivacy) {
      acceptPrivacy.checked = accepted;
    }
  }

  function modalAccepted() {
    return Boolean(modalAcceptTerms && modalAcceptPrivacy && modalAcceptTerms.checked && modalAcceptPrivacy.checked);
  }

  function refreshModalConsent() {
    if (!downloadConfirmButton) {
      return;
    }
    var accepted = modalAccepted();
    downloadConfirmButton.classList.toggle('is-disabled', !accepted);
    downloadConfirmButton.setAttribute('aria-disabled', accepted ? 'false' : 'true');
  }

  function openDownloadModal() {
    if (!downloadModal) {
      return;
    }
    setDownloadStatus('');
    if (modalAcceptTerms && acceptTerms) {
      modalAcceptTerms.checked = acceptTerms.checked;
    }
    if (modalAcceptPrivacy && acceptPrivacy) {
      modalAcceptPrivacy.checked = acceptPrivacy.checked;
    }
    refreshModalConsent();
    downloadModal.classList.add('is-open');
    downloadModal.setAttribute('aria-hidden', 'false');
    if (modalAcceptTerms && !modalAcceptTerms.checked) {
      modalAcceptTerms.focus();
    } else if (modalAcceptPrivacy && !modalAcceptPrivacy.checked) {
      modalAcceptPrivacy.focus();
    } else if (downloadConfirmButton) {
      downloadConfirmButton.focus();
    }
  }

  function closeDownloadModal() {
    if (!downloadModal) {
      return;
    }
    downloadModal.classList.remove('is-open');
    downloadModal.setAttribute('aria-hidden', 'true');
    if (downloadButton) {
      downloadButton.focus();
    }
  }

  function startInstallerDownload() {
    var installerUrl = getInstallerUrl();
    if (!isRealInstallerUrl(installerUrl)) {
      setDownloadStatus('A telepítő linkje még nincs beállítva.');
      return false;
    }
    closeDownloadModal();
    var link = document.createElement('a');
    link.href = installerUrl;
    link.setAttribute('download', '');
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      link.remove();
    }, 0);
    return true;
  }

  if (downloadButton) {
    if (hasDownloadConsent()) {
      syncVisibleConsent(true);
    }

    downloadButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (hasDownloadConsent() && isRealInstallerUrl(getInstallerUrl())) {
        startInstallerDownload();
        return;
      }
      openDownloadModal();
    });
  }

  if (modalAcceptTerms && modalAcceptPrivacy) {
    modalAcceptTerms.addEventListener('change', refreshModalConsent);
    modalAcceptPrivacy.addEventListener('change', refreshModalConsent);
    refreshModalConsent();
  }

  if (downloadConfirmButton) {
    downloadConfirmButton.addEventListener('click', function () {
      if (!modalAccepted()) {
        setDownloadStatus('A letöltéshez mindkét feltételt el kell fogadni.');
        return;
      }
      if (!isRealInstallerUrl(getInstallerUrl())) {
        setDownloadStatus('A telepítő linkje még nincs beállítva.');
        return;
      }
      setDownloadConsent();
      syncVisibleConsent(true);
      startInstallerDownload();
    });
  }

  if (downloadModal) {
    downloadModal.querySelectorAll('[data-download-modal-close]').forEach(function (control) {
      control.addEventListener('click', closeDownloadModal);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && downloadModal.classList.contains('is-open')) {
        closeDownloadModal();
      }
    });
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
