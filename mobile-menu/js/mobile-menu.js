function initializeMobileMenu(breakPoint, menuSelector, menuParentSelector, isInsertInStart) {
    menuSelector = menuSelector || false;
    menuParentSelector = menuParentSelector || false;
    breakPoint = breakPoint || 768;
    isInsertInStart = isInsertInStart || false;
    let touchstartX;
    let touchendX;
    let mobileMenu = document.querySelector(".js-mobile-menu");
    let menu = document.querySelector(menuSelector);
    let menuParent = document.querySelector(menuParentSelector);
    document.body.addEventListener("mouseup", function (e) {
        if (!e.target.classList.contains("js-mobile-menu") && !e.target.classList.contains("js-mobile-menu-toggle") && !e.target.parentElement.classList.contains("js-mobile-menu") && !e.target.parentElement.classList.contains("js-mobile-menu-toggle")) {
            closeMobileMenu();
        }
    });
    document.querySelector(".js-mobile-menu").addEventListener("touchstart", function (e) {
        touchstartX = e.changedTouches[0].screenX;
    });
    document.querySelector(".js-mobile-menu").addEventListener("touchend", function (e) {
        touchendX = e.changedTouches[0].screenX;
        if (touchstartX > touchendX && Math.abs(touchstartX - touchendX) > 50) {
            closeMobileMenu();
        }
    });

    function relocateMenu() {
        let windowWidth = window.innerWidth;
        if (windowWidth <= breakPoint && !mobileMenu.querySelector(menuSelector)) {
            let relocatedMenu = menuParent.removeChild(menu);
            if (isInsertInStart) {
                mobileMenu.insertBefore(relocatedMenu, mobileMenu.firstChild);
            }
            else {
                mobileMenu.appendChild(relocatedMenu);
            }
        }
        else if (windowWidth > breakPoint && mobileMenu.querySelector(menuSelector)) {
            let relocatedMenu = mobileMenu.removeChild(menu);
            menuParent.appendChild(relocatedMenu);
        }
    }

    function closeMobileMenu() {
        document.getElementById("js-mobile-menu-toggle").checked = false;
    }
    document.addEventListener("DOMContentLoaded", function () {
        if (menuSelector && menuParentSelector) {
            relocateMenu();
            window.addEventListener("resize", relocateMenu);
        }
    });
}