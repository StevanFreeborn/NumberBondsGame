export const toggleNavMenu = () => {
    const navMenu = document.getElementById('top-nav-right');
    navMenu.classList.toggle('nav-responsive');
    navMenu.classList.toggle('nav');
}