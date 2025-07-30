const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login credentials:', { username, password });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 로그인 페이지로 이동
    await page.goto('https://pt.daelim.ac.kr/ssoLogin.jsp');

    // 아이디와 비밀번호 입력
    await page.waitForSelector('#id');
    await page.type('#id', username);
    await page.type('#pw', password);

    // 로그인 버튼 클릭
    // await page.click('input[type="submit"]');

    // 로그인 후 페이지가 완전히 로드될 때까지 기다림
    // await page.waitForNavigation({ waitUntil: 'load' });

    console.log('로그인 후 페이지가 로드됨');

    // 로그인 후 페이지 스크린샷 찍기
    await page.screenshot({ path: 'login-page.png' });  // 스크린샷을 찍어서 'login-page.png'로 저장

    // 로그인 성공 후 응답
    res.status(200).json({
      success: true,
      message: '로그인 성공!'
    });

    await browser.close();
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    res.status(500).json({ success: false, message: '로그인 실패 또는 오류 발생' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
