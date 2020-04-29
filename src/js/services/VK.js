import bridge from "@vkontakte/vk-bridge";

const APP_ID = 7436508;
const API_VERSION = '5.92';

export const initApp = () => {
    // Sends event to client
    bridge.send('VKWebAppInit');

    // Subscribes to event, sended by client
    bridge.subscribe(e => console.log(e));
}