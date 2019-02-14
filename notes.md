Goede bronnen: mdn

# Hoofdstuk 1 Values, Types, and Operators

## Chapter 3

## Chapter 4

## Chapter 5

## Chapter 6

## Chapter 8

## Chapter 9

## Chapter 10

## Chapter 11


# Hoofdstuk 2 Program Structure

## Chapter 3

## Chapter 4

## Chapter 5

## Chapter 6

## Chapter 8

## Chapter 9

## Chapter 10

## Chapter 11


# Hoofdstuk 3 Functions


## Defining a function

Functions kunnen parameters bevatten, bijvoorbeeld function parameter(x) {} <- dit is de body. in dit geval is x de parameter. Deze kun je dan aanroepen met parameter(5); Functions kunnen meerdere parameters bevatten, maar ook geen.

## Bindings and scopes

Je heb global en local bindings. 
Binding = een variable binden met data.

* global kun je overal gebruiken: var a = a;
* local alleen binnen een bepaalde plek function() { var a =a; }

Elke binding heeft een scope. Dit is de plek van het programma waar de binding zichtbaar is.

## Chapter 3

## Chapter 4

## Chapter 5

## Chapter 6

## Chapter 8

## Chapter 9

## Chapter 10

## Chapter 11


# Hoofdstuk 4 Data Structures: Objects and Arrays


## Further arrayology

* .push voegt een laatste element toe aan een string
* .pop haalt de laatste element weg van een string
* .shift haalt de eerste element van een string weg
* .unshift voegt een eerste element toe van een string

console.log([1, 2, 3, 2, 1].indexOf(2)); dit telt het aantal stappen waar 2 staat
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); dit telt het aantal stappen waar de laatste 2 staat
// → 3


console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]

slice pakt elementen binnen bepaalde indexen. de eerste index is inclusief, de laatste is exclusief
wanneer er geen tweede index wordt gegeven, zal pakt slice alle elementen na de gegeven index

met concat kan je twee arrays aan elkaar lijmen

function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]

bij return wordt er a, b gereturned
daarna wordt er array.slice(3) dus d, e eraan vastgeplakt -> dit wordt dus a, b, d, e

als je concat een value meegeeft wat geen array is, dan zal het toegevoegd worden aan de array alsof het een 1 element array was

## Strings and their properties

a string’s indexOf can search for a string containing more than one character, whereas the corresponding array method looks only for a single element.

console.log("one two three".indexOf("ee"));
// → 11

The trim method removes whitespace (spaces, newlines, tabs, and similar characters) from the start and end of a string.

console.log("  okay \n ".trim());
// → okay

The zeroPad function from the previous chapter also exists as a method. It is called padStart and takes the desired length and padding character as arguments.

console.log(String(6).padStart(3, "0"));
// → 006

met .split en .join kan je elementen uit een string uit elkaar halen. 

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping

met .repeat kan je een string herhalen

console.log("LA".repeat(3));
// → LALALA


## Rest parameters

je kan Math.max gebruiken om het hoogste getal te vinden. het kan handig zijn om function(...numbers) te gebruiken zodat je een oneindig getal aan getallen mee kunt geven.

function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9

You can use a similar three-dot notation to call a function with an array of arguments.

let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

ook kan je getallen toevoegen in de console.log om het hoogste getal te krijgen: console.log(max(9, ...numbers, 2));

## The Math object

random getal 1t/m 9:

console.log(Math.floor(Math.random() * 10));
// → 2

There are also the functions 
* Math.ceil (for “ceiling”, which rounds up to a whole number)
* Math.round (to the nearest whole number)
* Math.abs, which takes the absolute value of a number, meaning it negates negative values but leaves positive ones as they are.

## Destructuring



# Hoofdstuk 5 Higher-Order Functions


## Abstracting repetition

let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]

hier wordt een function value op de plek zelf gecreeërd.


## Higher-order functions

function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true

hier zie je dat een functie een andere functie maakt en dus overschrijdt.


We can even write functions that provide new types of control flow.

function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even

There is a built-in array method, forEach, that provides something like a for/of loop as a higher-order function.

["A", "B"].forEach(l => console.log(l));
// → A
// → B

## Filtering arrays

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]

hier worden elementen uit een array gefiltert waarbij de test niet wordt doorgevoerd.

## Transforming with map

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]

## Summarizing with reduce

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

elk element uit de array wordt hier gepakt om deze vervolgens in element te zetten. current zal op 0 beginnen, maar wordt steeds groter omdat de elementen van de array er steeds bij opgeteld worden door combine. eerst staat er dus (0,1) hierna komt er (1,2) te staan, hierna (3,3) en als laatst (6,4) hier komt dus 10 uit.

als de array minimaal één element heeft, hoef je geen start argument te geven. Het pakt gewoon het eerste element en begint bij de tweede te reducen:

console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10

## Composability

let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// → 1188

## Recognizing text

The countBy function expects a collection (anything that we can loop over with for/of) and a function that computes a group name for a given element. It returns an array of objects, each of which names a group and tells you the number of elements that were found in that group.

It uses another array method—findIndex. This method is somewhat like indexOf, but instead of looking for a specific value, it finds the first value for which the given function returns true. Like indexOf, it returns -1 when no such element is found.



# Hoofdstuk 6 The Secret Life of Objects

## Encapsulation

Object-oriented programming betekend dat je bepaalde onderdelen in kleinere onderdelen verdeeld zodat ieder stukje zijn eigen ding kan doen.
Zo kan bepaalde code lokaal worden opgeslagen zodat een ander persoon deze code niet per se hoeft te snappen. Alleen de code eromheen hoeft aangepast te worden.
De verschillende onderdelen van een programma interacteren met elkaar via interfaces. 

Properties that are part of the interface are called public. The others, which outside code should not be touching, are called private.

It is also common to put an underscore (_) character at the start of property names to indicate that those properties are private.

## Methods

Methods are nothing more than properties that hold function values. This is a simple method:

let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'

## Prototypes

console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

Functions derive from Function.prototype, and arrays derive from Array.prototype.

console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true

Met object.create kan je een speciefiek prototype maken voor een bepaald object. Zie de volgende code.

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'

The “proto” rabbit acts as a container for the properties that are shared by all rabbits. An individual rabbit object, like the killer rabbit, contains properties that apply only to itself—in this case its type—and derives shared properties from its prototype.

## Classes

A class defines the shape of a type of object—what methods and properties it has. Such an object is called an instance of the class.

If you put the keyword new in front of a function call, the function is treated as a constructor. This means that an object with the right prototype is automatically created, bound to this in the function, and returned at the end of the function.

## Class notation

So JavaScript classes are constructor functions with a prototype property. That is how they work, and until 2015, that was how you had to write them. These days, we have a less awkward notation.

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

## Overriding derived properties

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

## Maps

let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true

Hier map je ages aan een naam.^

As such, using plain objects as maps is dangerous. There are several possible ways to avoid this problem. First, it is possible to create objects with no prototype. If you pass null to Object.create, the resulting object will not derive from Object.prototype and can safely be used as a map.

console.log("toString" in Object.create(null));
// → false

Nu kan je map gebruiken omdat er geen prototype meer in zit.

Object property names must be strings. If you need a map whose keys can’t easily be converted to strings—such as objects—you cannot use an object as your map.
Hiervoor kan je een class gebruiken genaamd Map. Het stored een mapping waardoor je elke type key kan gebruiken.

De methodes .set en .get kan je gebruiken als je een Map class gebruikt. Zo kan je snel zoeken door een groot aantal values.

## Polymorphism

Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// → a black rabbit

## Symbols

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55

Symbols kunnen maar één keer gebruikt worden. Als je deze nog een keer gebruikt zie je dat er false komt te staan.


# Hoofdstuk 8 Bugs and Errors

## Language

Als je iets verkeerd codeert kan er NaN uitkomen of een undefined value. 
De bron van deze problemen zijn soms moeilijk om te vinden.
Het proces om fouten te vinden, wordt debugging genoemd.

## Strict Mode

Je kan Javascript stricer maken door strict mode aan te zetten. Dit kan je doen door "use strict" bovenaan de file te zetten, of bovenaan een function body.

function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined

Normally, when you forget to put let in front of your binding, as with counter in the example, JavaScript quietly creates a global binding and uses that. In strict mode, an error is reported instead. 

Another change in strict mode is that the this binding holds the value undefined in functions that are not called as methods:

function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand


"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined

Strict mode does a few more things. It disallows giving a function multiple parameters with the same name and removes certain problematic language features entirely (such as the with statement, which is so wrong it is not further discussed in this book).

In short, putting "use strict" at the top of your program rarely hurts and might help you spot a problem.

## Types

Veel fouten kunnen ontstaan doordat je verward raakt welke soort values er in een functie gaan. Dit kan je ophelderen door een comment te plaatsen vóór de functie: 

// (VillageState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
  // ...
}

## Testing

Automated testing is the process of writing a program that tests another program.

Writing tests is a bit more work than testing manually, but once you’ve done it, you gain a kind of superpower: it takes you only a few seconds to verify that your program still behaves properly in all the situations you wrote tests for. When you break something, you’ll immediately notice, rather than randomly running into it at some later time.

Er wordt gebruik gemaakt van console.logs om zo iets te vertellen zoals FAILED.

## Debugging

Als je code iets geks oplevert en geen error geeft, ga dan vooral niet random je code veranderen tot het werkt. Denk eerst na en kom met een theorie waarom iets misschien niet werkt. Je kan console.logs toevoegen op regels code om meer informatie te krijgen wat er in het programma gebeurd. 

## Exceptions

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}

Door try te gebruiken met catch kan je erachter komen of je code goed werkt. Als er in de try block iets vreemds gebeurd, dan wordt de catch blok uitgevoerd. Hier kan je dan een message intypen als er iets fout gaat.
Als alles goed verloopt zal het programma verder lopen onder de try/catch statement.

## Cleaning up after exceptions

A finally block says “no matter what happens, run this code after trying to run the code in the try block.”

```function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}```

## Selective catching





















