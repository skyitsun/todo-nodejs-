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

6). 명령창에서 npx sequelize db:create로 DB 생성<br>
7). 명령창에서 npx sequelize db:migrate로 TABLE 생성<br>
8). npm start로 서버 실행 후 localhost:3000 으로 접속 후 기능 <br>

3. 기능들

3-1. Todo 입력
![image](https://user-images.githubusercontent.com/59412658/128730191-f9553b52-83d0-4132-9ddf-1805165e1de4.png)

3-1-1. input에 Todo 입력후 등록을 누르면 데이터 저장. 참조하고 싶은 Todo가 있다면 체크박스에 체크 후 등록

3-2. Todo 수정

3-2-1. 수정글씨를 클릭할 경우
![image](https://user-images.githubusercontent.com/59412658/128730476-ac1bfa20-c537-4cea-a631-ac39f19d412c.png)

3-2-2. input 에 수정하고 싶은 Todo의 title이 자동입력. 그리고 등록버튼이 수정으로 변경.
3-2-3. 참조하고 싶은 Todo가 있다면 체크박스에 체크 후 수정

3-3. Todo 삭제

3-3-1. 삭제글씨 클릭할 경우 삭제
* 단, 삭제할 Todo를 참조하는 다른 Todo가 있을 경우 이미지와 같이 alert창이 뜨며 삭제불가. 참조 해제 후 삭제 가능
![image](https://user-images.githubusercontent.com/59412658/128731247-ba64517d-d7cd-4c77-aa78-41b61d604518.png)

3-4. Todo 상태 변화

3-4-1. 미완료 or 완료 버튼 클릭할 경우 상태변화
* 단, 참조중인 Todo가 미완료 상태일 경우 이미지와 같이 alert 창이 뜨며 상태변화 불가. 참조한 Todo의 상태가 완료 일때만 완료로 상태변화 가능
![image](https://user-images.githubusercontent.com/59412658/128731646-e6461625-38d8-458f-b005-c18ddf4e985c.png)

3-5. Todo 검색

3-5-1. select의 option을 컬럼명으로 할 경우 데이터 탈취당했을때 컬럼명이 밝혀지므로 숫자로 value를 지정한 다음 BackEnd 부분에서 switch로 분류
3-5-2. 수정일 및 등록일 검색을 할 경우 BackEnd 부분에서 strtotime을 이용해 하루의 데이터를 검색
ex) 한국에서 2021-08-10을 검색할 경우 DB에는 UTC 기준으로 저장이 되니 변환하여 2021-08-09 09:00:00 부터 2021-08-12 09:00:00 까지 검색되게 작업
