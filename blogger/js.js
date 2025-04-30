document.addEventListener('DOMContentLoaded', function() {

    // --- الإعدادات العامة والمتغيرات ---
    const styleOptionsContainer = document.getElementById('style-options-container');
    const triggerButton = document.getElementById('style-options-trigger');
    const panel = document.getElementById('style-options-panel');
    const body = document.body;
    const root = document.documentElement; // للوصول لـ :root

    // --- إعدادات الألوان (باستخدام متغيرات CSS) ---
    const colorSwatchesContainer = document.getElementById('color-swatches');
    // تعريف الثيمات مع قيم متغيرات CSS لكل ثيم
    // يجب أن تتضمن كل المتغيرات التي عرفتها في :root
    const themeColorSchemes = [
        {
            name: 'default', // اسم مميز للثيم (يُستخدم في localStorage)
            displayName: 'افتراضي', // اسم للعرض في title
            previewColor: '#446FAA', // لون للمربع الصغير
            variables: { // قيم متغيرات CSS لهذا الثيم
                '--main-color': '#446FAA',
                '--sub-color': '#444444',
                '--hocolor': '#FC5400',
                '--link-color': '#3e5b7e',
                '--border-color': '#cccccc',
                '--text-color': '#555',
                '--bg-color': '#ffffff',
                '--bg-body-pattern': 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKAyB7D4CXsn2lE8KW_dAJE_vBSKF1jmjMuhOCMT6MSwoIdjGTidPRm3KVNdvt5MtTjyI8G_a8kC6Azd0nKJrjFmqV8tgdsBjL-ReGhkK52qb1U1oEYBwXfW2JPCL-eCSdeLKQbMlTUQk/s160-Ic42/cream_pixels.png")',
                '--header-bg-color': '#f8f8f8',
                '--widget-bg-color': '#ffffff',
                /* أضف باقي المتغيرات هنا بنفس الأسماء في :root */
                '--menu-bg-color': '#446FAA',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#446FAA',
                '--footer-credit-text': '#ffffff',
                 '--code-bg': '#f8f9fa',
                '--code-text': '#202124',
                '--code-border': '#dadce0',
                '--code-footer-bg': '#f1f3f4'
            }
        },
        {
            name: 'green',
            displayName: 'أخضر',
            previewColor: '#1B5E20',
            variables: {
                '--main-color': '#1B5E20',
                '--sub-color': '#333333',
                '--hocolor': '#4CAF50',
                '--link-color': '#2E7D32',
                '--border-color': '#c8e6c9',
                '--text-color': '#1B5E20',
                '--bg-color': '#e8f5e9',
                '--bg-body-pattern': 'none',
                '--header-bg-color': '#c8e6c9',
                '--widget-bg-color': '#ffffff',
                '--menu-bg-color': '#1B5E20',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#1B5E20',
                '--footer-credit-text': '#ffffff',
                 '--code-bg': '#e8f5e9',
                '--code-text': '#1B5E20',
                '--code-border': '#a5d6a7',
                '--code-footer-bg': '#c8e6c9'
            }
        },
        {
            name: 'brown',
            displayName: 'بني',
            previewColor: '#5D4037',
            variables: {
                '--main-color': '#5D4037',
                '--sub-color': '#3E2723',
                '--hocolor': '#8D6E63',
                '--link-color': '#795548',
                '--border-color': '#d7ccc8',
                '--text-color': '#3E2723',
                '--bg-color': '#efebe9',
                '--bg-body-pattern': 'none',
                '--header-bg-color': '#d7ccc8',
                '--widget-bg-color': '#ffffff',
                 '--menu-bg-color': '#5D4037',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#5D4037',
                '--footer-credit-text': '#ffffff',
                '--code-bg': '#efebe9',
                '--code-text': '#3E2723',
                '--code-border': '#bcaaa4',
                '--code-footer-bg': '#d7ccc8'
            }
        },
         {
            name: 'purple',
            displayName: 'بنفسجي',
            previewColor: '#7E57C2',
            variables: {
                '--main-color': '#7E57C2',
                '--sub-color': '#4527A0',
                '--hocolor': '#B39DDB',
                '--link-color': '#5E35B1',
                '--border-color': '#d1c4e9',
                '--text-color': '#4527A0',
                '--bg-color': '#ede7f6',
                '--bg-body-pattern': 'none',
                '--header-bg-color': '#d1c4e9',
                '--widget-bg-color': '#ffffff',
                '--menu-bg-color': '#7E57C2',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#7E57C2',
                '--footer-credit-text': '#ffffff',
                '--code-bg': '#ede7f6',
                '--code-text': '#4527A0',
                '--code-border': '#b39ddb',
                '--code-footer-bg': '#d1c4e9'
            }
        },
        {
            name: 'lightblue',
            displayName: 'أزرق سماوي',
            previewColor: '#039be5',
            variables: {
                '--main-color': '#039be5',
                '--sub-color': '#01579b',
                '--hocolor': '#4fc3f7',
                '--link-color': '#0288d1',
                '--border-color': '#b3e5fc',
                '--text-color': '#01579b',
                '--bg-color': '#e1f5fe',
                 '--bg-body-pattern': 'none',
                '--header-bg-color': '#b3e5fc',
                '--widget-bg-color': '#ffffff',
                 '--menu-bg-color': '#039be5',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#039be5',
                '--footer-credit-text': '#ffffff',
                '--code-bg': '#e1f5fe',
                '--code-text': '#01579b',
                '--code-border': '#81d4fa',
                '--code-footer-bg': '#b3e5fc'
            }
        },
        {
            name: 'darkblue',
            displayName: 'أزرق داكن',
            previewColor: '#003366',
            variables: {
                '--main-color': '#003366',
                '--sub-color': '#001a33',
                '--hocolor': '#0059b3',
                '--link-color': '#004080',
                '--border-color': '#b3cce6',
                '--text-color': '#001a33',
                '--bg-color': '#e0ebf5',
                 '--bg-body-pattern': 'none',
                '--header-bg-color': '#b3cce6',
                '--widget-bg-color': '#ffffff',
                 '--menu-bg-color': '#003366',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#003366',
                '--footer-credit-text': '#ffffff',
                '--code-bg': '#e0ebf5',
                '--code-text': '#001a33',
                '--code-border': '#99b3cc',
                '--code-footer-bg': '#b3cce6'
            }
        },
        {
            name: 'red',
            displayName: 'أحمر',
            previewColor: '#bf0d0d',
            variables: {
                '--main-color': '#bf0d0d',
                '--sub-color': '#600707',
                '--hocolor': '#e57373',
                '--link-color': '#c62828',
                '--border-color': '#ffcdd2',
                '--text-color': '#600707',
                '--bg-color': '#ffebee',
                 '--bg-body-pattern': 'none',
                '--header-bg-color': '#ffcdd2',
                '--widget-bg-color': '#ffffff',
                 '--menu-bg-color': '#bf0d0d',
                '--menu-text-color': '#ffffff',
                '--footer-credit-bg': '#bf0d0d',
                '--footer-credit-text': '#ffffff',
                 '--code-bg': '#ffebee',
                '--code-text': '#600707',
                '--code-border': '#ef9a9a',
                '--code-footer-bg': '#ffcdd2'
            }
        }
        // يمكنك إضافة المزيد من الثيمات بنفس الطريقة
    ];
    const defaultThemeName = themeColorSchemes[0].name; // الاسم المميز للثيم الافتراضي
    const themeLocalStorageKey = 'userSelectedThemeName'; // مفتاح localStorage

    // --- إعدادات الخط (كما هي) ---
    const fontTargetSelector = 'body';
    const fontTargetElement = document.querySelector(fontTargetSelector);
    const fontSelect = document.getElementById('font-family-select');
    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    const sizeDisplay = document.getElementById('current-font-size');
    const resetFontBtn = document.getElementById('reset-font-settings');
    const initialFontSize = 16;
    const fontSizeStep = 1;
    const minFontSize = 12;
    const maxFontSize = 24;
    const defaultFontFamily = "'Noto Naskh Arabic', serif";
    const availableFonts = [ { name: "الخط الافتراضي", value: defaultFontFamily }, { name: "Arial", value: "Arial, sans-serif" }, { name: "Tahoma", value: "Tahoma, sans-serif" }, { name: "Times New Roman", value: "'Times New Roman', serif" }, { name: "Droid Arabic Kufi", value: "'Droid Arabic Kufi', sans-serif" }, { name: "Cairo", value: "'Cairo', sans-serif" } ];
    const fontLocalStoragePrefix = 'userFont';

    // --- إعدادات الوضع الداكن (كما هي) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeClass = 'dark-mode';
    const darkModeLocalStorageKey = 'userDarkMode';

    // --- إعدادات الشريط الجانبي (كما هي) ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarStateBodyClass = 'sidebar-is-hidden';

    // --- إعدادات التبويبات (كما هي) ---
    const tabs = panel.querySelectorAll('.options-tabs-nav li');
    const panes = panel.querySelectorAll('.options-tabs-content .options-tab-pane');

    // --- زر إعادة التعيين الكلي (كما هو) ---
    const resetAllButton = document.getElementById('reset-all-options');

    // --- التحقق من وجود العناصر الأساسية (كما هو) ---
    if (!styleOptionsContainer || !triggerButton || !panel) { console.warn("Style Options: Container, trigger, or panel not found. Aborting."); if(styleOptionsContainer) styleOptionsContainer.style.display = 'none'; return; }
    if (!fontTargetElement) { console.warn(`Style Options: Font target element "${fontTargetSelector}" not found.`); }

    // ===================================
    // === وظائف التحكم باللوحة والتبويبات (كما هي) ===
    // ===================================
    triggerButton.addEventListener('click', () => { styleOptionsContainer.classList.toggle('open'); });
    document.addEventListener('click', (event) => { if (!styleOptionsContainer.contains(event.target) && styleOptionsContainer.classList.contains('open')) { styleOptionsContainer.classList.remove('open'); } });
    tabs.forEach(tab => { tab.addEventListener('click', () => { tabs.forEach(t => t.classList.remove('active')); panes.forEach(p => p.classList.remove('active')); tab.classList.add('active'); const targetPane = document.getElementById(tab.dataset.tab); if (targetPane) targetPane.classList.add('active'); }); });

    // ===================================
    // === وظائف التحكم بالألوان (مُعدّلة لمتغيرات CSS) ===
    // ===================================
    function applyColorScheme(schemeName, fromLoad = false) {
        const selectedScheme = themeColorSchemes.find(scheme => scheme.name === schemeName);
        if (!selectedScheme) {
            console.warn(`Color scheme "${schemeName}" not found. Applying default.`);
            applyColorScheme(defaultThemeName, fromLoad); // تطبيق الافتراضي إذا لم يتم العثور على المخطط
            return;
        }

        // تطبيق متغيرات CSS
        for (const variableName in selectedScheme.variables) {
            if (selectedScheme.variables.hasOwnProperty(variableName)) {
                root.style.setProperty(variableName, selectedScheme.variables[variableName]);
            }
        }

        // تحديث الزر النشط
        const swatches = colorSwatchesContainer.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            swatch.classList.toggle('active', swatch.dataset.schemeName === schemeName);
        });

        // الحفظ في localStorage (فقط إذا لم يكن من التحميل الأولي)
        if (!fromLoad) {
            localStorage.setItem(themeLocalStorageKey, schemeName);
        }
        // console.log('Color scheme applied:', schemeName);
    }

    // إنشاء أزرار الألوان
    if (colorSwatchesContainer && themeColorSchemes.length > 0) {
        themeColorSchemes.forEach(scheme => {
            const swatch = document.createElement('button');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = scheme.previewColor; // لون المربع الصغير
            swatch.title = scheme.displayName; // اسم العرض
            swatch.dataset.schemeName = scheme.name; // استخدام اسم الثيم كمعرّف
            swatch.addEventListener('click', () => {
                applyColorScheme(scheme.name);
            });
            colorSwatchesContainer.appendChild(swatch);
        });
    } else if (!colorSwatchesContainer) { console.warn("Style Options: Color swatches container not found."); }

    // ===================================
    // === وظائف التحكم بالخط (كما هي) ===
    // ===================================
    function updateFontSizeDisplay(size) { if (sizeDisplay) sizeDisplay.textContent = Math.round(size) + 'px'; }
    function applyFontSize(size, fromLoad = false) { if (!fontTargetElement) return; const newSize = Math.max(minFontSize, Math.min(maxFontSize, size)); fontTargetElement.style.fontSize = newSize + 'px'; updateFontSizeDisplay(newSize); if (!fromLoad) localStorage.setItem(fontLocalStoragePrefix + 'Size', newSize); }
    function applyFontFamily(family, fromLoad = false) { if (!fontTargetElement) return; fontTargetElement.style.fontFamily = family; if (fontSelect && fontSelect.value !== family) { if ([...fontSelect.options].some(option => option.value === family)) fontSelect.value = family; } if (!fromLoad) localStorage.setItem(fontLocalStoragePrefix + 'Family', family); }
    function resetFont() { if (fontTargetElement) { fontTargetElement.style.fontSize = ''; const computedStyle = window.getComputedStyle(fontTargetElement); const initialOrComputedSize = parseFloat(computedStyle.fontSize) || initialFontSize; updateFontSizeDisplay(initialOrComputedSize); applyFontFamily(defaultFontFamily); } localStorage.removeItem(fontLocalStoragePrefix + 'Size'); localStorage.removeItem(fontLocalStoragePrefix + 'Family'); }
    if (fontSelect) { fontSelect.innerHTML = ''; availableFonts.forEach(font => { const option = document.createElement('option'); option.value = font.value; option.textContent = font.name; fontSelect.appendChild(option); }); fontSelect.addEventListener('change', (event) => applyFontFamily(event.target.value)); } else { console.warn("Style Options: Font family select dropdown not found."); }
    if (increaseBtn) increaseBtn.addEventListener('click', () => { if (!fontTargetElement) return; const currentSize = parseFloat(window.getComputedStyle(fontTargetElement).fontSize); applyFontSize(currentSize + fontSizeStep); });
    if (decreaseBtn) decreaseBtn.addEventListener('click', () => { if (!fontTargetElement) return; const currentSize = parseFloat(window.getComputedStyle(fontTargetElement).fontSize); applyFontSize(currentSize - fontSizeStep); });
    if (resetFontBtn) resetFontBtn.addEventListener('click', resetFont);

    // ===================================
    // === وظائف التحكم بالوضع الداكن (كما هي) ===
    // ===================================
    function applyDarkMode(isDark, fromLoad = false) {
        body.classList.toggle(darkModeClass, isDark);
        if (darkModeToggle) { darkModeToggle.classList.toggle('active', isDark); darkModeToggle.textContent = isDark ? darkModeToggle.dataset.on : darkModeToggle.dataset.off; darkModeToggle.title = isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'; }
        if (!fromLoad) localStorage.setItem(darkModeLocalStorageKey, isDark);
    }
    if (darkModeToggle) { darkModeToggle.addEventListener('click', () => { const shouldBeDark = !body.classList.contains(darkModeClass); applyDarkMode(shouldBeDark); }); } else { console.warn("Style Options: Dark mode toggle button not found."); }

    // ===================================
    // === وظائف التحكم بالشريط الجانبي (كما هي) ===
    // ===================================
    function setSidebarVisibility(isHidden, fromLoad = false) {
        body.classList.toggle(sidebarStateBodyClass, isHidden);
        if (sidebarToggle) { sidebarToggle.classList.toggle('active', isHidden); sidebarToggle.textContent = isHidden ? sidebarToggle.dataset.on : sidebarToggle.dataset.off; sidebarToggle.title = isHidden ? 'إظهار الشريط الجانبي' : 'إخفاء الشريط الجانبي'; }
    }
    if (sidebarToggle) { sidebarToggle.addEventListener('click', () => { const shouldHide = !body.classList.contains(sidebarStateBodyClass); setSidebarVisibility(shouldHide); }); } else { console.warn("Style Options: Sidebar toggle button not found."); }

    // ===================================
    // === تحميل الإعدادات المحفوظة (مُعدّل للألوان) ===
    // ===================================
    function loadSettings() {
        // 1. تحميل الثيم اللوني
        const savedThemeName = localStorage.getItem(themeLocalStorageKey);
        // التحقق مما إذا كان الاسم المحفوظ موجودًا ضمن المخططات المتاحة
        const isValidSavedTheme = themeColorSchemes.some(scheme => scheme.name === savedThemeName);
        applyColorScheme( (savedThemeName && isValidSavedTheme) ? savedThemeName : defaultThemeName, true);

        // 2. تحميل الوضع الداكن
        const savedDarkMode = localStorage.getItem(darkModeLocalStorageKey);
        applyDarkMode(savedDarkMode === 'true', true);

        // 3. تحميل إعدادات الخط
        const savedSize = localStorage.getItem(fontLocalStoragePrefix + 'Size');
        const savedFamily = localStorage.getItem(fontLocalStoragePrefix + 'Family');
        applyFontFamily(savedFamily || defaultFontFamily, true);
        if (savedSize) { applyFontSize(parseFloat(savedSize), true); }
        else if (fontTargetElement) { const currentComputedSize = parseFloat(window.getComputedStyle(fontTargetElement).fontSize) || initialFontSize; updateFontSizeDisplay(currentComputedSize); }
        else { updateFontSizeDisplay(initialFontSize); }

        // 4. ضبط حالة زر الشريط الجانبي الأولية
        const isBodyInitiallyHidden = body.classList.contains(sidebarStateBodyClass);
        setSidebarVisibility(isBodyInitiallyHidden, true);
    }

    // ===================================
    // === وظيفة إعادة التعيين الكلي (مُعدّل للألوان) ===
    // ===================================
    function resetAll() {
        // إعادة تعيين الثيم اللوني للافتراضي
        applyColorScheme(defaultThemeName);
        localStorage.removeItem(themeLocalStorageKey);

        // إعادة تعيين الخط
        resetFont();

        // إعادة تعيين الوضع الداكن (إلى فاتح)
        applyDarkMode(false);
        localStorage.removeItem(darkModeLocalStorageKey);

        // إعادة تعيين الشريط الجانبي (إلى ظاهر)
        setSidebarVisibility(false);

        // إعادة التبويب للتبويب الأول
        tabs.forEach(t => t.classList.remove('active')); panes.forEach(p => p.classList.remove('active'));
        if (tabs.length > 0) tabs[0].classList.add('active'); if (panes.length > 0) panes[0].classList.add('active');
        styleOptionsContainer.classList.remove('open');
    }
    if (resetAllButton) { resetAllButton.addEventListener('click', resetAll); } else { console.warn("Style Options: Reset all button not found."); }

    // --- بدء تحميل الإعدادات ---
    loadSettings();

});