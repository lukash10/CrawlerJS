const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', 
                     //by default puppeteer runs Chromium buddled with puppeteer 
    args:['--start-maximized',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--no-first-run',
    '--no-sandbox',
    ],

  });

  const pages = await browser.pages();
  const page = pages[0];

  const browserWSEndpoint = await browser.wsEndpoint()
  console.log("browserWSEndpoint----- :> ", browserWSEndpoint);


  await page.goto('https://web.foccolojas.com.br', {waitUntil: 'networkidle2'});

  await page.screenshot ({ path: "login.png" });


  //await page.type('#vIPN_USU_LOGIN', 'lucas.thierry@FOCCOLOJAS', {delay: 5});
  //const iframeHandle = await page.frames().find(frame => frame.name() === 'EPLOGIN');

  // // Obter a referência ao iframe
  const iframeHandle = await page.frames().find(frame => frame.name() === 'EPLOGIN');

    // Obter a referência aos campos de entrada dentro do iframe
  const input1Handle = await iframeHandle.$('#vIPN_USU_LOGIN');
  const input2Handle = await iframeHandle.$('#vIPN_USU_SENHA');

  // Preencher os campos de entrada
  await input1Handle.type('llucas.thierry@FOCCOLOJAS', { delay: 100 });
  await input2Handle.type('foccolojas123456', { delay: 100 });

  // Obter a referência ao botão dentro do iframe
  const buttonHandle = await iframeHandle.$('#BTNLOGIN');

  // Clicar no botão
  await buttonHandle.click();


  // // Obter a referência ao elemento dentro do iframe
  // const elementHandle = await iframeHandle.$('#vIPN_USU_LOGIN');

  // // Digitar um dado no elemento
  // await elementHandle.type('lucas.thierry@FOCCOLOJAS');


  await page.waitForNavigation();

  await page.goto('https://web.foccolojas.com.br/foccolojas/hiljcontratos');

  await page.screenshot ({ path: "image.png" });

  //browser.close();
  //return browserWSEndpoint;
})();
