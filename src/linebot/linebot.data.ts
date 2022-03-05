import { RichMenu } from '@line/bot-sdk';

export const richMenu: RichMenu = {
  size: {
    width: 1200,
    height: 405,
  },
  selected: true,
  name: 'リッチメニュー',
  chatBarText: 'メニュー一覧',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 600,
        height: 405,
      },
      action: {
        type: 'uri',
        uri: 'https://liff.line.me/1656947920-BZXEZp8D',
      },
    },
    {
      bounds: {
        x: 600,
        y: 0,
        width: 600,
        height: 405,
      },
      action: {
        type: 'postback',
        data: 'choose',
      },
    },
  ],
};
