const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const supportUser = '@your_support';
const fakeDepositAddress = 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

function mainMenu() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🎰 電子遊戲', 'slot_games'),
      Markup.button.callback('⚽ 體育專區', 'sports_games')
    ],
    [
      Markup.button.callback('🎲 彩票專區', 'lottery_games'),
      Markup.button.callback('🐟 捕魚專區', 'fish_games')
    ],
    [
      Markup.button.callback('👤 會員中心', 'member_center'),
      Markup.button.callback('💳 充值教學', 'deposit_help')
    ],
    [
      Markup.button.callback('📢 公告中心', 'announcements'),
      Markup.button.url('📞 在線客服', `https://t.me/${supportUser.replace('@', '')}`)
    ]
  ]);
}

bot.start(async (ctx) => {
  const name = ctx.from.first_name || '玩家';
  await ctx.reply(
`🎉 歡迎來到【娛樂城展示中心】

👤 玩家：${name}
🆔 UID：${ctx.from.id}

⚠️ 本機器人為展示版，不提供真實下注與金流功能。`,
    mainMenu()
  );
});

bot.action('slot_games', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`🎰【電子遊戲大廳】

1. PG 電子
2. JILI 電子
3. CQ9 電子
4. FC 電子

📌 僅供展示`,
    Markup.inlineKeyboard([[Markup.button.callback('🔙 返回主選單', 'go_home')]])
  );
});

bot.action('sports_games', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`⚽【體育專區展示】

- 足球
- 籃球
- 棒球
- 電競

📌 僅供展示，不可下注`,
    Markup.inlineKeyboard([[Markup.button.callback('🔙 返回主選單', 'go_home')]])
  );
});

bot.action('lottery_games', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`🎲【彩票專區展示】

- 六合彩
- 時時彩
- PK10
- 快3

📌 僅供展示`,
    Markup.inlineKeyboard([[Markup.button.callback('🔙 返回主選單', 'go_home')]])
  );
});

bot.action('fish_games', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`🐟【捕魚專區展示】

- 新手場
- 進階場
- VIP 場

📌 僅供展示`,
    Markup.inlineKeyboard([[Markup.button.callback('🔙 返回主選單', 'go_home')]])
  );
});

bot.action('member_center', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`👤【會員中心】

UID：${ctx.from.id}
暱稱：${ctx.from.first_name || '玩家'}
等級：VIP1（展示）
積分：88888（展示）`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🎁 每日簽到', 'daily_checkin')],
      [Markup.button.callback('🔙 返回主選單', 'go_home')]
    ])
  );
});

bot.action('daily_checkin', async (ctx) => {
  await ctx.answerCbQuery('簽到成功！');
  await ctx.reply('🎁 簽到成功，獲得 1888 展示積分');
});

bot.action('deposit_help', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`💳【充值教學（展示版）】

USDT-TRC20 展示地址：
\`${fakeDepositAddress}\`

⚠️ 本地址僅供展示，請勿實際轉帳。`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('📞 聯繫客服', `https://t.me/${supportUser.replace('@', '')}`)],
        [Markup.button.callback('🔙 返回主選單', 'go_home')]
      ])
    }
  );
});

bot.action('announcements', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText(
`📢【公告中心】

1. 平台展示版已開啟
2. 支援 Render 部署
3. 僅供測試展示`,
    Markup.inlineKeyboard([[Markup.button.callback('🔙 返回主選單', 'go_home')]])
  );
});

bot.action('go_home', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText('🏠【主選單】', mainMenu());
});

bot.on('text', async (ctx) => {
  await ctx.reply('請點選下方功能選單操作 👇', mainMenu());
});

bot.launch();
console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
