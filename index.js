#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const qrcode = require('qrcode-terminal');
const request = require('request');


clear();

const prompt = inquirer.createPromptModule();

let lmap = new Map()

lmap.set("english",{
    name: chalk.bold.green("             Alpaca Bi Resume"),
    work: `${chalk.white("Frone-end Engineer at")} ${chalk
        .hex("#FF0000")
        .bold("Vtron")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("AlpacaBi"),
    github: chalk.gray("https://github.com/") + chalk.green("AlpacaBi"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("AlpacaBi"),
    web: chalk.cyan("https://alpaca.run"),
    npx: chalk.red("npx") + " " + chalk.white("anmol"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("    WebSite:"),
    labelCard: chalk.white.bold("       Card:"),

    questionsMessage: "What you want to do?",
    question1:`-Send me an ${chalk.blue.bold("Email")}?`,
    answer1:"\nDone, see you soon at inbox.\n",
    question2:`-Contact me through ${chalk.green.bold("WeChat")}?`,
    answer2:"Scan the wechat qrcode to add my WeChat!!",
    question3:`-${chalk.yellow.bold("Banana dance!!!")}`,
    answer3:"\nbanana!!!!\n",
    question4:"-Just quit.",
    answer4:"\nBye!!!!\n",

    alpacaAIMessage:`-Chat with ${chalk.hex("#f90").bold("Alpaca AI")}(sorry, only support Chinese)`
})

lmap.set("chinese",{
    name: chalk.bold.green("            Alpaca Bi个人简历"),
    work: `${chalk.white("在")}${chalk.hex("#FF0000").bold("Vtron")}${chalk.white("担任前端工程师")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("AlpacaBi"),
    github: chalk.gray("https://github.com/") + chalk.green("AlpacaBi"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("AlpacaBi"),
    web: chalk.cyan("https://alpaca.run"),
    npx: chalk.red("npx") + " " + chalk.white("alpacabi"),

    labelWork: chalk.white.bold("       工作:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("   个人网址:"),
    labelCard: chalk.white.bold("       Card:"),

    questionsMessage: "你想做什么?",
    question1:`-给我发${chalk.blue.bold("邮件")}`,
    answer1:"\n如果我看邮件了，我会尽快回复你\n",
    question2:`-加我${chalk.green.bold("微信")}好友`,
    answer2:"扫码加我微信!!",
    question3:`-${chalk.yellow.bold("看香蕉君跳舞")}`,
    answer3:"\n气氛逐渐蕉♂灼♂\n",
    question4:"-退出",
    answer4:"\n走好不送\n",

    alpacaAIMessage:`-和${chalk.hex("#f90").bold("Alpaca AI")}聊天`
})

const questions1 = [
    {
        type: "list",
        name: "language",
        message: `选择你的语言? ${chalk.green.bold("/")} Select your language?`,
        choices: [
            {
                name: `中文`,
                value: "chinese"
            },
            {
                name: `English`,
                value: "english"
            }
        ]
    }
];


prompt(questions1).then(answer => {

    let language = answer.language

    const data = lmap.get(answer.language)

    const info = boxen(
        [
            `${data.name}`,
            ``,
            `${data.labelWork}  ${data.work}`,
            ``,
            //`${data.labelTwitter}  ${data.twitter}`,
            `${data.labelGitHub}  ${data.github}`,
            // `${data.labelLinkedIn}  ${data.linkedin}`,
            `${data.labelWeb}  ${data.web}`,
            ``,
            ``
        ].join("\n"),
        {
            margin: 1,
            float: 'center',
            padding: 1,
            borderStyle: "single",
            borderColor: "green"
        }
    );

    console.log(info);


    const alpacaAI = [
        {
            type: 'input',
            message: '你:',
            name: 'phone',
            validate: function(val) {
                if(val == "exit"){
                    console.log(`\n${chalk.hex("#f90").bold("Alpaca AI")}已退出`);
                    return true
                }else{
                    request.post({
                        url:'https://alpaca.run/apis/ai/text', 
                        form:{
                            "textType": "npx",
                            "text": val
                        }
                    }, function(error, response) {
                        let resText = JSON.parse(response.body).message
                        console.log(`\n${chalk.hex("#f90").bold("Alpaca AI")}: ${resText}\n`);
                        return false
                    })

                }
                
            }
        }
    ];

    

    const questions2 = [
        {
            type: "list",
            name: "action",
            message: lmap.get(language).questionsMessage,
            choices: [
                {
                    name: lmap.get(language).alpacaAIMessage,
                    value: () => {
                        setTimeout(()=>{
                            console.log(`${new Date().toLocaleString( )} 已成功连入Alpaca AI服务器,输入${chalk.red.bold("exit")}即可退出`);
                            setTimeout(()=>{
                                console.log(`${chalk.hex("#f90").bold("Alpaca AI")}: 你好啊，我是Alpaca AI,一个人工智能，你可以打字和我聊天！！！！`);
                                setTimeout(()=>{
                                    console.log(`${chalk.hex("#f90").bold("Alpaca AI")}: 我带有脏话检测功能，所以请文明发言哦！！！！\n\n`);
                                    prompt(alpacaAI).then(() => {
                                        setTimeout(()=>{
                                            clear()
                                            console.log("\n\n\n")
                                            console.log(info);
                                            prompt(questions2).then(answer => answer.action());
                                        },1500)
                                    })
                                },1000)
                            },1000)
                        },1000)
                        
                        
                    }
                },
                {
                    name: lmap.get(language).question1,
                    value: () => {
                        open("mailto:biguokang@outlook.com");
                        console.log(lmap.get(language).answer1);
                        setTimeout(()=>{
                            console.log("\n\n\n")
                            console.log(info);
                            prompt(questions2).then(answer => answer.action());
                        },1500)
                    }
                },
                {
                    name: lmap.get(language).question2,
                    value: () => {
                        console.log(lmap.get(language).answer2)
                        const url = 'https://u.wechat.com/MI8g1d4fSdEntqOdCrp-DU8';
                        qrcode.generate(url,{small:true});
                        setTimeout(()=>{
                            console.log("\n\n\n")
                            console.log(info);
                            prompt(questions2).then(answer => answer.action());
                        },1500)
                    }
                },
                {
                    name: lmap.get(language).question3,
                    value: () => {
                        console.log(lmap.get(language).answer3);
                        open("https://cdn.alpaca.run/js/banana.html")
                        setTimeout(()=>{
                            console.log("\n\n\n")
                            console.log(info);
                            prompt(questions2).then(answer => answer.action());
                        },1500)
                    }
                },
                {
                    name: lmap.get(language).question4,
                    value: () => {
                        console.log(lmap.get(language).answer4);
                        open("https://cdn.alpaca.run/default/ph.jpg")
                    }
                }
            ]
        }
    ];


    prompt(questions2).then(answer => answer.action());

});


