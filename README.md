# todo-nodejs-

1. 환경설정

- MariaDB 버전 : 10.4.20 * xampp로 설치 
- node 버전 : 14.17.5
- npm 버전 : 6.14.14
- 개발툴 : vscode

package.json start에    "start": "node ./bin/www"

2. 실행방법

1). git clone으로 repository를 받는다.<br>
2). 명령프롬프트창에서 다운로드 받은 폴더의 todolist로 이동한다.<br>
ex - cd c:\xampp\htdocs\todo-nodejs-\todolist

3). npm install로 package.json의 라이브러리들을 다운받는다.<br>
4). npm start로 서버 실행한다.
5). root/todo/의 .env.example 파일을 .env로 이름을 바꾸고<br>
DB_USER={사용자이름}<br>
DB_PW={사용자비밀번호}<br>
DB_HOST=127.0.0.1<br>
DB_NAME={DB그룹의이름}<br>
DB_DEV={개발용DB이름}<br>
DB_TEST={테스트용DB이름}<br>
로컬 환경에 맞게 사용자이름 및 사용자비밀번호를 입력한다.
* 테스트 할때는 DB_NAME = todos, DB_DEV = todos_dev, DB_TEST = todos_test로 설정

6). 명령창에서 npx sequelize db:create로 DB 생성
7). 명령창에서 npx sequelize db:migrate로 TABLE 생성
8). npm start로 서버 실행 후 localhost:3000 으로 접속 후 기능 
