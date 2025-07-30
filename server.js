const express = require('express');
const cors = require('cors');  // CORS를 허용하기 위해 사용

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // JSON 데이터를 받을 수 있도록 설정

// 로그인 요청을 처리하는 API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 받은 아이디와 비밀번호를 콘솔에 출력
    console.log('Received login credentials:', { username, password });

    // 응답으로 성공 메시지와 함께 받은 아이디와 비밀번호를 반환
    res.status(200).json({
      success: true,
      message: '로그인 시도 성공!',
      credentials: { username, password }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '서버 오류 발생' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
