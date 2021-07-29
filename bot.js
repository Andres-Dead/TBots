const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('1908133193:AAHY-Ek9TW3Z8k1iRgJXEyp8yWrR2loBN0g');

 bot.use((ctx, next)=>{
     if(ctx.updateSubTypes[0]=="text"){
         bot.telegram.sendMessage(-515998974,ctx.from.username +" "+ctx.from.first_name+" "+ctx.from.last_name+ " said: "+ ctx.message.text);
     } else  {
         bot.telegram.sendMessage(-515998974,ctx.from.username +" "+ctx.from.first_name+" "+ctx.from.last_name+  " sent: "+ ctx.updateSubTypes[0]);
     }
next();
});

//  start command  /start
bot.start((ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    ctx.reply("Hello traveler...");
    setTimeout(() => {
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        ctx.reply("¡I've heard about you! You are Midias the invencible ¿right?"); 
    }, 1000);
    setTimeout(() => {
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        ctx.reply("¿No? let me try again, you are "+ctx.from.first_name+" "+ctx.from.last_name+" ¿Right?"); 
    }, 2000);
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    setTimeout(() => {
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        ctx.reply("¡I knew it! take a second to appreciate the view, before you go."); 
    }, 3000);
    setTimeout(() => {
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        ctx.reply("¿How can I help you "+ctx.from.first_name+" "+ctx.from.last_name+"?");
        
    }, 3500);
    setTimeout(() => {
        bot.telegram.sendMessage(ctx.chat.id, "CHOOSE", {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: "HP", 
                            callback_data: 'hp'
                        },
                        {
                            text: "Ask",
                            callback_data: 'ask'
                        },
                        {
                            text: "Wisdom",
                            callback_data: "wisdom"
                        }
                    ],
    
                ]
            }
        });
    
    }, 3510);
});

//commands for the bot

//ASK /ask
bot.action("ask", (ctx)=>{
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    bot.telegram.sendMessage(ctx.chat.id,"¿What do you want to know?");
    setTimeout(() => {
        bot.telegram.sendMessage(ctx.chat.id, "Ask", {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: "¿Where Am I?", 
                            callback_data: 'WAI'
                        },
                        {
                            text: "¿Who are you?",
                            callback_data: 'WAY'
                        },
                        {
                            text: "¿What is all of this?",
                            callback_data: "WIAOT"
                        }
                    ],
    
                ]
            }
        });
    
    }, 1000);

});

//¿Where Am I?
bot.action("WAI", (ctx)=>{
    bot.telegram.sendMessage(ctx.chat.id,"You are here because you are searching for something, you are trying to prove that my creator (@Dead_Man01) has the capacity to create great things. Challenge him and see for yourself");
});

//¿Who are you?
bot.action("WAY", (ctx)=>{
    bot.telegram.sendMessage(ctx.chat.id, "I'm a telegram bot, I was made to guide wanderers like you in this journey. I was made in NodeJS, using Telegraf and some API's.");
});

//¿What is all of this?
bot.action("WIAOT", (ctx)=>{
    bot.telegram.sendMessage(ctx.chat.id, "This is a journey, or maybe an answer");
});

//HP /hp
bot.action("hp", (ctx)=>{
    ctx.state.health = 100;
    bot.telegram.sendMessage(ctx.chat.id,"**'Your HP is:'**");
    bot.telegram.sendMessage(ctx.chat.id,ctx.state.health);

});

//FORTUNE /fortune

bot.action("wisdom", (ctx)=>{
    axios.get('http://yerkee.com/api/fortune/wisdom')
        .then((res)=>{
            bot.telegram.sendMessage(ctx.chat.id,res.data.fortune);
        }).catch((e)=>{
            console.log(e);
        })
})

//bot hearing

bot.hears("Secret?", (ctx)=>{
    ctx.reply("Here's a secret for you, but don't say anything ¿ok?");
    setTimeout(() => {
        ctx.reply("My master and creator loves to make music and it's a great bass player, so the next time you spoke to him, tell him '¿How about that funky base line?'");
    }, 1500);
});

//bot on method (to act on a user's action)
bot.on("sticker", (ctx)=>{
    ctx.reply("???")
});

//



bot.launch();