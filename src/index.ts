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
