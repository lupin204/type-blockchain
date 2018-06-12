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
//# sourceMappingURL=index.js.map