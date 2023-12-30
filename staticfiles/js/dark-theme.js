function setTheme(theme) {
    // 儲存顯示模式
    localStorage.setItem('theme', theme);

    // 切換顯示模式
    // 如果為淺色模式，就將 dark-theme.css disabled 設定為 true
    // 如果為深色模式，則將 dark-theme.css disabled 設定為 false
    document.getElementById('darkTheme').disabled = (theme != 'dark');
}

window.addEventListener('load', (event) => {
    let preferredTheme = localStorage.getItem('theme');
    let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (preferredTheme == null) {
        preferredTheme = darkQuery.matches ? 'dark' : 'light';
    }

    // 監聽作業系統是否切換顯示模式
    darkQuery.addListener(function (e) {
        setTheme(e.matches ? 'dark' : 'light');
    });

    // 設定顯示模式
    setTheme(preferredTheme);

    let themeSwitchreseter = document.getElementById('themeSwitch');

    // 根據 localStorage 中的 theme 設置 themeSwitch 的 checked 狀態
    themeSwitchreseter.checked = (preferredTheme === 'light');

    // 監聽 switch 開關的變化
    document.getElementById('themeSwitch').addEventListener('change', function() {
        if (!this.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

    });
});
