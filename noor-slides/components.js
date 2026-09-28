/* =====================================================================
   Noor components — compact custom tags (<noor-*>), rendered into the
   markup that uses tw-config.js classes.
   Customizable: ТОЛЬКО текст (содержимое/атрибуты-строки) и иконка.
   Никаких пропсов цвета/размера/варианта — варианты это отдельные теги.
   Pure light-DOM hydration on DOMContentLoaded (no framework, no build).
   ===================================================================== */
(function () {
  var esc = function (s) {
    return s == null ? '' : String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  // table row: каждый дочерний <noor-cell> становится ячейкой — любое число колонок.
  // Классы (например ширину w-[…px]), заданные прямо на <noor-cell>, переносим на итоговую ячейку.
  function rowBuild(kind, isHead) {
    return function (a, slot, el) {
      return Array.prototype.map.call(el.children, function (c) {
        var extra = c.getAttribute('class') || '';
        return '<div class="tbl-cell ' + (isHead ? 'head' : 'body') + ' ' + kind + (extra ? ' ' + extra : '') + '">' + c.innerHTML + '</div>';
      }).join('');
    };
  }

  var C = {
    // ---- Слайд-шелл ----
    // Заголовок обычного контентного слайда: Header 1 (Sora SemiBold 100px), чёрный, left:50 top:30.
    'noor-header': { klass: 'absolute left-[50px] top-[30px] w-[1820px] font-sora font-semibold text-header-1 text-neutral-0',
      build: function (a, slot) { return slot; } },
    // Футер короткий: "N · label" — как в большинстве реальных слайдов (slide-png).
    'noor-footer': { klass: 'footer absolute left-[50px] top-[1010px] text-neutral-60',
      build: function (a, slot) {
        var label = slot ? ' <span class="font-onest text-label-6">· ' + slot + '</span>' : '';
        return '<span class="ft-n font-sora text-footer-n">' + a('n') + '</span>' + label;
      } },
    // Футер с источниками: номер + длинное предложение-цитата (компонент "Footer" 101:4001).
    'noor-footer-sources': { klass: 'footer absolute left-[50px] top-[1010px] w-[1820px]',
      build: function (a, slot) {
        return '<span class="ft-n font-sora text-footer-n text-neutral-60">' + a('n') + '</span>'
             + '<span class="ft-txt font-onest text-label-6 text-neutral-50">' + slot + '</span>';
      } },

    // ---- Обложки (cover / divider) ----
    // Логотип-леттеринг "noor" + подпись "finance" — верхний левый угол обложек на градиенте/тёмном фоне.
    'noor-brandmark': { klass: 'absolute left-[50px] top-[50px] flex flex-col items-start',
      build: function () {
        return '<img src="logo.svg" alt="noor" class="h-[41px] w-auto">'
             + '<span class="font-onest font-medium text-[15px] text-terracota-40 mt-[3px]">finance</span>';
      } },
    // Компактный круглый знак (полумесяц) — верхний правый угол тёмных обложек/разделителей.
    'noor-mark': { klass: 'absolute',
      build: function () { return '<img src="icon-mark.svg" alt="noor" class="w-full h-full">'; } },
    // Обложка 1: крупный заголовок по центру-низу на градиенте + декоративный вихрь + дата справа сверху.
    'noor-cover-title': { klass: 'absolute left-[50px] bottom-[190px] w-[900px] font-sora font-bold text-display-2 text-neutral-100',
      build: function (a, slot) { return slot; } },
    // Обложка 2: заголовок справа + тег-пилюля под ним (правая раскладка на градиенте).
    'noor-cover-title-r': { klass: 'absolute left-[1080px] top-[785px] w-[790px] flex flex-col gap-[24px] items-start font-sora font-bold text-header-1 text-neutral-100',
      build: function (a, slot) { return slot; } },
    'noor-cover-tag': { klass: 'inline-flex items-center justify-center border-2 border-terracota-40 rounded-[100px] px-[40px] pt-[24px] pb-[32px] font-onest text-[50px] text-terracota-40',
      build: function (a, slot) { return slot; } },
    'noor-cover-date': { klass: 'absolute top-[50px] font-onest text-[24px] text-white/50',
      build: function (a, slot) { return slot; } },
    // Разделитель: заголовок Display 1 внизу слева на градиенте.
    'noor-divider-title': { klass: 'absolute left-[50px] bottom-[190px] w-[1400px] font-sora font-bold text-display-1 text-neutral-100',
      build: function (a, slot) { return slot; } },
    // Тёмная обложка (навигационный/закрывающий вариант): размытые градиентные пятна на #090E18 + крупный заголовок внизу слева.
    'noor-cover-dark-title': { klass: 'absolute left-[50px] bottom-[100px] w-[1400px] font-sora font-bold text-display-2 text-neutral-100',
      build: function (a, slot) { return slot; } },

    // ---- Текст-блоки ----
    'noor-title-tag': { klass: 'tb-tag',
      build: function (a, slot) {
        return '<div class="chip font-onest font-semibold text-body-2 text-terracota-40">' + a('badge') + '</div>'
             + '<div class="flex flex-col gap-[8px] items-start w-full">'
             + '<div class="font-onest font-semibold text-header-4 text-neutral-0">' + a('title') + '</div>'
             + '<div class="font-onest text-body-4 text-neutral-40">' + slot + '</div></div>';
      } },
    'noor-title-tag2': { klass: 'tb-tag2',
      build: function (a, slot) {
        return '<div class="chip font-onest font-medium text-body-3 text-terracota-40">' + a('n') + '</div>'
             + '<div class="font-onest font-semibold text-body-2 text-terracota-40">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-0">' + slot + '</div>';
      } },
    'noor-title-tag3': { klass: 'tb-tag3',
      build: function (a, slot) {
        return '<div class="chip font-onest font-bold text-label-2 text-neutral-100">' + a('badge') + '</div>'
             + '<div class="font-onest font-medium text-body-1 text-neutral-0">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-0">' + slot + '</div>';
      } },
    'noor-number': { klass: 'tb-number',
      build: function (a, slot) {
        return '<div class="font-onest font-medium text-header-2 text-terracota-40">' + a('n') + '</div>'
             + '<div class="font-onest text-body-3 text-neutral-0">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-60">' + slot + '</div>';
      } },
    'noor-icon-text': { klass: 'tb-icon',
      build: function (a, slot) {
        return '<div class="row">'
             + '<span class="icon-100"><img src="icons/' + a('icon') + '.svg" alt="' + a('icon') + '"></span>'
             + '<div class="flex flex-col gap-[8px] items-start">'
             + '<div class="font-onest font-bold text-header-5 text-terracota-40">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-40">' + a('sub') + '</div></div></div>'
             + '<div class="font-onest text-label-1 text-neutral-0 w-full">' + slot + '</div>';
      } },
    'noor-icon-text-lg': { klass: 'tb-icon2',
      build: function (a, slot) {
        return '<div class="row">'
             + '<span class="icon-100"><img src="icons/' + a('icon') + '.svg" alt="' + a('icon') + '"></span>'
             + '<div class="font-onest font-semibold text-header-4 text-neutral-0">' + a('title') + '</div></div>'
             + '<div class="font-onest text-label-1 text-neutral-0 w-full">' + slot + '</div>';
      } },
    'noor-text1': { klass: 'tb1',
      build: function (a, slot) {
        return '<div class="font-onest font-semibold text-body-2 text-neutral-0">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-0">' + slot + '</div>';
      } },

    // ---- Заполненные плашки (fill) ----
    'noor-fill-sky': { klass: 'fill-block bg-sky-90 text-neutral-0',
      build: function (a, slot) {
        return '<div class="font-onest font-semibold text-body-2">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 opacity-60">' + slot + '</div>';
      } },
    'noor-fill-grey': { klass: 'fill-block bg-neutral-95 text-neutral-0',
      build: function (a, slot) {
        return '<div class="font-onest font-semibold text-body-2">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 opacity-60">' + slot + '</div>';
      } },
    'noor-fill-red': { klass: 'fill-block bg-terracota-40 text-neutral-100',
      build: function (a, slot) {
        return '<div class="font-onest font-semibold text-body-2">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 opacity-60">' + slot + '</div>';
      } },
    'noor-fill2-grey': { klass: 'fill-block2 bg-neutral-92 text-neutral-0',
      build: function (a, slot) {
        return '<div class="font-onest font-medium text-body-1">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1 text-neutral-40">' + slot + '</div>';
      } },
    'noor-fill2-red': { klass: 'fill-block2 bg-terracota-40 text-neutral-100',
      build: function (a, slot) {
        return '<div class="font-onest font-medium text-body-1">' + a('title') + '</div>'
             + '<div class="font-onest text-label-1">' + slot + '</div>';
      } },
    'noor-conclusion': { klass: 'conclusion text-neutral-100',
      build: function (a, slot) {
        return '<div class="font-onest text-label-1 flex-1">' + slot + '</div>';
      } },

    // ---- Пилюли (варианты = отдельные теги) ----
    'noor-pill-l': { klass: 'pill-l-filled bg-sky-40',
      build: function (a, slot) { return '<span class="font-onest font-bold text-label-2 text-neutral-100">' + slot + '</span>'; } },
    'noor-pill-l-stroke': { klass: 'pill-l-stroke',
      build: function (a, slot) { return '<span class="font-onest font-bold text-label-2 text-neutral-60">' + slot + '</span>'; } },
    'noor-pill-l-stroke-red': { klass: 'pill-l-stroke border-terracota-40',
      build: function (a, slot) { return '<span class="font-onest font-bold text-label-2 text-terracota-40">' + slot + '</span>'; } },
    'noor-pill-m': { klass: 'pill-m-filled bg-sky-40',
      build: function (a, slot) { return '<span class="font-onest text-label-1 text-neutral-100">' + slot + '</span>'; } },

    // ---- Иконка+текст (компактный, в один ряд) ----
    'noor-icon-text-s': { klass: 'inline-flex items-center gap-[24px]',
      build: function (a, slot) {
        return '<span class="icon-32"><img src="icons/' + a('icon') + '.svg" alt="' + a('icon') + '"></span>'
             + '<span class="font-onest text-body-1 text-neutral-0">' + slot + '</span>';
      } },

    // ---- Таблица (варианты = отдельные теги) ----
    'noor-row-head':  { klass: 'tbl-row', build: rowBuild('font-onest text-label-5 text-neutral-50', true) },
    'noor-row':       { klass: 'tbl-row', build: rowBuild('font-onest text-label-1 text-neutral-0', false) },
    'noor-row-bold':  { klass: 'tbl-row', build: rowBuild('font-onest font-bold text-label-2 text-neutral-0', false) },
    'noor-row-dark':  { klass: 'tbl-row bg-neutral-0 rounded-[16px]', build: rowBuild('font-onest font-bold text-label-2 text-neutral-100', false) },
  };

  function depth(el) { var d = 0; while (el.parentElement) { d++; el = el.parentElement; } return d; }

  function hydrate(root) {
    var els = Array.prototype.slice.call((root || document).querySelectorAll(Object.keys(C).join(',')));
    els.sort(function (x, y) { return depth(y) - depth(x); }); // deepest first → parents see rendered children
    els.forEach(function (el) {
      var def = C[el.tagName.toLowerCase()];
      if (!def || el.__noor) return;
      el.__noor = 1;
      var slot = el.innerHTML.trim();
      var attr = function (n) { return esc(el.getAttribute(n) || ''); };
      if (def.klass) def.klass.split(' ').forEach(function (c) { el.classList.add(c); });
      el.innerHTML = def.build(attr, slot, el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { hydrate(); });
  else hydrate();
  window.NOOR = { hydrate: hydrate };   // для динамически добавленных слайдов
})();
