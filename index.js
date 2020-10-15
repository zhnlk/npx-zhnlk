#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const qrcode = require('qrcode-terminal');

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
    question3:`-${chalk.yellow.bold("banana dance!!!")}`,
    answer3:"\nbanana!!!!\n",
    question4:"-Just quit.",
    answer4:"\nBye!!!!\n"
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
    answer4:"\n走好不送\n"
})

const questions1 = [
    {
        type: "list",
        name: "language",
        message: "Select your language?",
        choices: [
            {
                name: `English`,
                value: "english"
            },
            {
                name: `中文`,
                value: "chinese"
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

    const questions2 = [
        {
            type: "list",
            name: "action",
            message: lmap.get(language).questionsMessage,
            choices: [
                {
                    name: lmap.get(language).question1,
                    value: () => {
                        open("mailto:biguokang@outlook.com");
                        console.log(lmap.get(language).answer1);
                    }
                },
                {
                    name: lmap.get(language).question2,
                    value: () => {
                        console.log(lmap.get(language).answer2)
                        const url = 'https://u.wechat.com/MI8g1d4fSdEntqOdCrp-DU8';
                        qrcode.generate(url,{small:true});
                    }
                },
                {
                    name: lmap.get(language).question3,
                    value: () => {
                        console.log(lmap.get(language).answer3);
                        open("https://cdn.alpaca.run/js/banana.html")
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


