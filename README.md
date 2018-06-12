# BlockChain with TypeScript
# TypeScript 알아가기..
<https://www.youtube.com/watch?v=7wAhwv2Rbxw&list=PL7jH19IHhOLNM5mePXxbpnPefi6PiiNCX>

- 준비물
  - node.js
  - npm
  - editor - vscode ( TypeScript, vscode 둘다 Microsoft에서 만듬)
- 셋팅
  - typescript 모듈 설치 (global)
  ```sh
  npm install -g typescript
  ```
  - type-blockchain 프로젝트 생성
  ```sh
  md type-blockchain
  cd type-blockchain
  npm init
  ```
  - TypeScript 환경설정 파일 생성 - tsconfig.json
  ```javascript
  // tsconfig.json
  {
    // 컴파일 옵션 설정
    "compilerOptions": {
      // node.js를 평범하게 사용하고 다양한걸 import / export 할 수 있게 만드는것
      "module": "commonjs",
      // 어떤 버전의 JavaScript로 컴파일 되고 싶은지 정함 (es5 | ES2015)
      "target": "ES2015",
      // sourcemap 처리를 할지말지
      "sourceMap": true
    },
    // 컴파일 대상에 포함시킬 파일/폴더
    "include": ["index.ts"],
    // 컴파일 대상에서 제외시킬 파일/폴더 ( node_modules는 디폴트로 제외 )
    "exclude": ["node_modules"]
  }
  ```


- 시작하기
  - index.ts 파일 생성 (TypeScript 확장자는 ts)
  ```typescript
  console.log('hello')
  ```
  - 터미널에서 tsc 후 index.js (index.js.map) 파일 생성 확인
  ```sh
  tsc
  ```
  >**`tsc`**<br>
  ts파일을 컴파일 해서 js파일과 js.map 파일을 생성

  - npm scripts에 매크로 형태로 등록해두기
    - npm start 하면 tsc 명령어 실행 후 node.index.js 명령어를 실행한다
    - node.js 는 TypeScript를 해석못하니까 JavaScript 코드로 컴파일이 필요함
  ```javascript
  // package.json
  "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  },
  ```
  - npm start 실행
    - console.log에 hello 확인
    - index.js 파일 내용 확인

- tsc 자동화
  - **`tsc-watch`** 모듈 설치 (dev에만 설치)
  ```sh
  npm install tsc-watch --save-dev
  ```
  - npm scripts 변경
    - (샘플) dist폴더의 index.js 실행
  ```javascript
  // package.json
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\" "
  },
  ```
  - source폴더와 distribution폴더 분리
    - src 폴더 생성 -> 컴파일 하려는 `ts`파일 -> **`outDir`** 항목
    - dist 폴더 생성 -> 컴파일 완료된 `js`파일 -> **`include`** 항목
  ```javascript
  // tsconfig.json
  {
    "compilerOptions": {
      "module": "commonjs",
      "target": "ES2015",
      "sourceMap": true,
      "outDir": "dist"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }
  ```
  - npm start
  ```sh
  npm start
  ```

- TypeScript 기본
  - sample code - typescript
  ```typescript
  const name = 'lupin', age = 24, gender = 'male';
  const sayHi = (name: string, age: number, gender?: string): string => {
    return `Hello ${name}, my age is ${age}, my gender is ${gender}`;
  }
  console.log(sayHi(name, age, gender));

  export {};
  ```
  - compiled code - javascript
  ```javascript
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const name = "lupin", age = 24, gender = "male";
  const sayHi = (name, age, gender) => {
      return `Hello ${name}, my age is ${age}, my gender is ${gender}`;
  };
  console.log(sayHi(name, age, gender));
  ```

  - 함수의 파라미터 옆에 형식을 지정, 파라미터 제일 마지막은 리턴타입을 지정
  - 파라미터 변수 뒤에 **`?`** 는 optional (= not null = nullable)
    - 변수를 생략했을때 해당 변수 값은 **`undefined`**


- interface 와 class
  - interface를 생성해서 형식을 지정하고 object로 주고 받을 수 있음 - Java의 POJO 같은거?
  - 아래의 typescript 소스와 위의 sample typescript 소스의 js 결과는 같음 
  - compiled code 는 동일함 (돌려보면 정말 같음)
  - interface는 typescript에서만 쓰이는 문법이기때문
  ```typescript
  interface Human {
    name: string;
    age: number;
    gender: string;
  }
  const person = {
      name: 'lupin', age: 24, gender: 'male'
  }
  const sayHi = (person: Human): string => {
      return `Hello ${person.name}, my age is ${person.age}, my gender is ${person.gender}`;
  }
  console.log(sayHi(person));

  export {};
  ```
  - interface는 js로 컴파일 되면 없어짐. js에서도 쓰고 싶다면? --> **`class`**
  - property(속성)과 권한(permission)이 필요함
  - 단, public private는 typescript에서 구분을 위해 사용. js에서는 무시됨
  - constructor(생성자) 는 method 클래스 생성할때마다 호출됨
  - interface 대신 class 쓰면 js코드에서도 class로 적용됨
    - sample code (class) - typescript
    ```typescript
    class Human {
      public name: string;
      public age: number;
      public gender: string;
      constructor(name: string, age:number, gender: string) {
          this.name = name;
          this.age = age;
          this.gender = gender;
      }
    }
    const person = new Human("lupin", 24, "male");
    const sayHi = (person: Human): string => {
        return `Hello ${person.name}, my age is ${person.age}, my gender is ${person.gender}`;
    }
    console.log(sayHi(person));

    export {};
    ```
    - compiled code - javascript
    ```javascript
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Human {
        constructor(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
    }
    const person = new Human("lupin", 24, "male");
    const sayHi = (person) => {
        return `Hello ${person.name}, my age is ${person.age}, my gender is ${person.gender}`;
    };
    console.log(sayHi(person));
    ```