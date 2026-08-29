/**
 * Swiss Navigation Synchronization Engine
 * Handles bidirectional interactive hover & focus states between
 * the individual color square buttons, brand name, and the text navigation items.
 */
document.addEventListener('DOMContentLoaded', () => {
  const navClusters = document.querySelectorAll('.nav-cluster');

  navClusters.forEach(cluster => {
    const brandLink = cluster.querySelector('.brand-title');
    const colorBtns = cluster.querySelectorAll('.color-btn');
    const navLinks = cluster.querySelectorAll('.nav-link-item');
    const allInteractive = [...colorBtns, ...navLinks];

    function activateTarget(targetKey) {
      if (!targetKey) return;
      cluster.classList.remove('is-all-dimmed');
      cluster.classList.add('is-highlighting');

      colorBtns.forEach(btn => {
        if (btn.getAttribute('data-target') === targetKey) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });

      navLinks.forEach(link => {
        if (link.getAttribute('data-target') === targetKey) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    function dimAllButtons() {
      cluster.classList.remove('is-highlighting');
      cluster.classList.add('is-all-dimmed');
      colorBtns.forEach(btn => btn.classList.remove('is-active'));
      navLinks.forEach(link => link.classList.remove('is-active'));
    }

    function resetTarget() {
      cluster.classList.remove('is-highlighting');
      cluster.classList.remove('is-all-dimmed');
      colorBtns.forEach(btn => btn.classList.remove('is-active'));
      navLinks.forEach(link => link.classList.remove('is-active'));
    }

    if (brandLink) {
      brandLink.addEventListener('mouseenter', dimAllButtons);
      brandLink.addEventListener('mouseleave', resetTarget);
      brandLink.addEventListener('focus', dimAllButtons);
      brandLink.addEventListener('blur', resetTarget);
    }

    allInteractive.forEach(el => {
      const targetKey = el.getAttribute('data-target');

      el.addEventListener('mouseenter', () => activateTarget(targetKey));
      el.addEventListener('mouseleave', resetTarget);

      el.addEventListener('focus', () => activateTarget(targetKey));
      el.addEventListener('blur', resetTarget);
    });

    cluster.addEventListener('mouseleave', resetTarget);
  });
});
