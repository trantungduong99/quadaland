import Pusher from 'pusher-js';
export const PUSHER = (token, username) => {
  Pusher.logToConsole = true;

  const pusher = new Pusher('31228d6611e35745a3c9', {
    cluster: 'ap1',
    authEndpoint: 'http://123.19.51.38:2999/api/v1/pusher/auth',
    auth: {
      headers: {Authorization: `Bearer ${token}`},
    },
  });
  const channel = pusher.subscribe(`private-user-${username}`);
  channel.bind('property-approved', (data) => {
    console.log(data);
  });
};
