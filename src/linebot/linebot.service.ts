import { Injectable } from '@nestjs/common';
import { Client, FlexBubble, FlexMessage, PostbackEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import * as fs from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { LinebotConfigService } from './linebot.config.service';
import { richMenu } from './linebot.data';
import { Food } from '../food/food.model';
import { chooseFoodCategory, throwIdFromCategory, throwNameFromCategory } from '../food/food.dto';

@Injectable()
export class LinebotService {
  constructor(
    private readonly linebotConfigService: LinebotConfigService,
    private readonly configService: ConfigService,
  ) {}

  postBackHandler(event: PostbackEvent) {
    switch (event.postback.data) {
      case 'choose':
        const foods = ['meat', 'fish', 'soup'];
        this.chooseFoodCategory(event.replyToken, foods);
        break;
      case 'meat':
        const meat = ['chicken', 'pork', 'beef', 'minced'];
        this.chooseFoodCategory(event.replyToken, meat);
        break;
      case 'fish':
        const fish = ['salmon', 'pike', 'mackerel', 'yellowtail'];
        this.chooseFoodCategory(event.replyToken, fish);
        break;
      case 'soup':
        const soup = ['miso', 'ton', 'vegetable', 'vermicelli'];
        this.chooseFoodCategory(event.replyToken, soup);
        break;
      case event.postback.data as chooseFoodCategory:
        const id = throwIdFromCategory(event.postback.data);
        this.chooseFood(event.replyToken, id);
        break;
      default:
        break;
    }
  }

  chooseFoodCategory(replyToken: string, foods: string[]): Promise<MessageAPIResponseBase> {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    return client.replyMessage(replyToken, [
      {
        type: 'text',
        text: '食べ物のカテゴリーを選択してね',
      },
      this.createChoiceMessage(foods),
    ]);
  }

  async chooseFood(replyToken: string, id: string): Promise<MessageAPIResponseBase> {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    const items = await this.apiRequest(id);
    return client.replyMessage(replyToken, [
      {
        type: 'text',
        text: '食べ物を選択してね',
      },
      this.createFoodMessage(items),
    ]);
  }

  async apiRequest(id: string) {
    const res = await fetch(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&formatVersion=2&categoryId=${id}&applicationId=${this.configService.get<string>(
        'RAKUTEN_ID',
      )}`,
    );
    return (await res.json()) as Food[];
  }

  async setRichMenu(): Promise<void> {
    const client = new Client(this.linebotConfigService.createLinebotOptions());
    const richMenuId = await client.createRichMenu(richMenu);
    await client.setRichMenuImage(richMenuId, fs.createReadStream(join(process.cwd(), 'src/linebot/richmenu.png')));
    await client.setDefaultRichMenu(richMenuId);
    await client.createRichMenu(richMenu);
  }

  createFoodMessage(items: Food[]): FlexMessage {
    const flexMessage: FlexMessage = {
      type: 'flex',
      altText: '食べ物の一覧',
      contents: {
        type: 'carousel',
        contents: items.map((item) => this.createFoodBubble(item)),
      },
    };
    return flexMessage;
  }

  createChoiceMessage(choice: string[]): FlexMessage {
    const flexMessage: FlexMessage = {
      type: 'flex',
      altText: 'カテゴリーの選択肢',
      contents: this.createChoiceBubble(choice),
    };
    return flexMessage;
  }

  createFoodBubble(item: Food): FlexBubble {
    const flexBubble: FlexBubble = {
      type: 'bubble',
      size: 'kilo',
      hero: {
        type: 'image',
        url: item.image_url,
        size: 'full',
        margin: 'none',
        position: 'relative',
        flex: 1,
        backgroundColor: '#000000',
        aspectMode: 'cover',
        aspectRatio: '1.4:1',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: item.recipe_title,
            size: 'md',
            wrap: true,
            maxLines: 3,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '食べたい！',
              data: `${item}`,
              displayText: `${item.recipe_title} を追加しました`,
            },
            style: 'primary',
            color: '#EFBA52',
          },
        ],
      },
    };
    return flexBubble;
  }

  createChoiceBubble(items: string[]): FlexBubble {
    const flexBubble: FlexBubble = {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: items.map((item) => {
          return {
            type: 'button',
            action: {
              type: 'postback',
              label: throwNameFromCategory(item),
              data: item,
            },
            margin: 'xxl',
            style: 'primary',
            color: '#EFBA52',
          };
        }),
      },
    };
    return flexBubble;
  }
}
