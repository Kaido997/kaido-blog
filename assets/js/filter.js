(function () {
  function init() {
    var bar = document.querySelector('.filter-bar');
    var grid = document.getElementById('post-list');
    if (!bar || !grid) return;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll('.category-button'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.post-item'));
    var noResults = document.getElementById('no-results');

    function apply(filter) {
      var visible = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
        var show = filter === 'all' || tags.indexOf(filter) !== -1;
        if (show) { card.removeAttribute('hidden'); visible++; }
        else { card.setAttribute('hidden', ''); }
      });
      buttons.forEach(function (b) {
        b.classList.toggle('selected', b.getAttribute('data-filter') === filter);
      });
      if (noResults) {
        if (visible === 0) noResults.removeAttribute('hidden');
        else noResults.setAttribute('hidden', '');
      }
    }

    function filterFromHash() {
      var m = (location.hash || '').match(/tag=([^&]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        apply(f);
        if (f === 'all') {
          history.replaceState(null, '', location.pathname + location.search);
        } else {
          history.replaceState(null, '', '#tag=' + encodeURIComponent(f));
        }
      });
    });

    var initial = filterFromHash();
    var known = initial && buttons.some(function (b) { return b.getAttribute('data-filter') === initial; });
    apply(known ? initial : 'all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
