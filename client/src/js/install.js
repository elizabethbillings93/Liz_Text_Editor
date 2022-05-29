const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.beforePrompt=event;
    butInstall.classList.toggle('hidden',false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptWindow= window.beforePrompt;
    if(!promptWindow){
        return;
    }
    promptWindow.prompt();
    window.beforePrompt=null;
    butInstall.classList.toggle('hidden',true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.beforePrompt=null;
});
