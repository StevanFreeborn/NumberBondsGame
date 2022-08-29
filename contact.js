import { toggleNavMenu } from './shared.js';

window.onload = () => {
    document.getElementById('nav-toggle')
        .addEventListener('click', () => {
            toggleNavMenu();
        });
}