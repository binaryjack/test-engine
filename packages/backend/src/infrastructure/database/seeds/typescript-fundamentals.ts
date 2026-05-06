import { QuestionBuilder } from "../utils/question-builder";
import { basicTypes, declarationFiles, enums, generics, interfaces, tsReact, tsconfig, typeAlgebra, typeNarrowing, utilityTypes } from "./presets";


export const typescriptFundamentalsQuestions = [
  // Basic Types
  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Primitives')
    .setPrompt('Which TypeScript type describes a value that can never occur?')
    .setOptions(['0, ```ts\nunknown\n```', '1, ```ts\nvoid\n```', '2, ```ts\nnever\n```', '3, ```ts\nundefined\n```'])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nnever\n``` represents values that never occur — e.g., the return type of a function that always throws or has an infinite loop.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type'])
    .build(),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('unknown vs any')
    .setPrompt('What is the key difference between ```ts\nany\n``` and ```ts\nunknown\n```?')
    .setOptions([
      '0, ```ts\nunknown\n``` is the same as ```ts\nany\n``` but marks deprecated APIs',
      '1, ```ts\nany\n``` disables type checking; ```ts\nunknown\n``` is type-safe — you must narrow it before using it',
      '2, ```ts\nunknown\n``` can only hold primitive values; ```ts\nany\n``` can hold anything',
      '3, They are identical — ```ts\nunknown\n``` is just an alias for ```ts\nany\n```'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nunknown\n``` is the type-safe counterpart to ```ts\nany\n```. You can assign anything to ```ts\nunknown\n```, but you cannot use it without narrowing.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown'])
    .build(),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Type assertions')
    .setPrompt('When should you use a type assertion (```ts\nvalue as Type\n```)?')
    .setOptions([
      '0, Whenever TypeScript infers the wrong type',
      "1, When you have more information than TypeScript about a value's type and the assertion is safe",
      "2, As a replacement for proper typing — it's faster than writing interfaces",
      '3, To convert between incompatible types (e.g., ```ts\nstring\n``` to ```ts\nnumber\n```)'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Type assertions tell TypeScript "trust me, I know what this is." Use them sparingly and only when you are certain.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions'])
    .build(),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Literal types')
    .setPrompt('What does the following declaration do?\n```ts\nconst direction = "north" as const\n```')
    .setOptions([
      '0, Casts the string to a constant number',
      '1, Narrows the type from ```ts\nstring\n``` to the literal type ```ts\n"north"\n```',
      '2, Makes the variable immutable at runtime',
      '3, Prevents TypeScript from widening the type to ```ts\nstring\n```'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nas const\n``` tells TypeScript to infer the most specific literal type rather than widening.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types'])
    .build(),

  // Interfaces
  new QuestionBuilder()
    .inherits(interfaces)
    .setSubtopic('Interface vs Type alias')
    .setPrompt('What can ```ts\ninterface\n``` do that a ```ts\ntype\n``` alias cannot?')
    .setOptions([
      '0, Describe union types',
      '1, Use generics',
      '2, Declaration merging — multiple ```ts\ninterface\n``` declarations with the same name are merged',
      '3, Extend other types'
    ])
    .setAnswer('2')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Declaration merging allows multiple ```ts\ninterface Foo { ... }\n``` declarations to automatically merge into one.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces'])
    .build(),

  new QuestionBuilder()
    .inherits(interfaces)
    .setSubtopic('Extending')
    .setPrompt('Consider the following interfaces:\n```ts\ninterface A { x: number }\ninterface B extends A { y: string }\n```\nWhat properties does ```ts\nB\n``` have?')
    .setOptions([
      '0, Only ```ts\ny: string\n```',
      '1, ```ts\nx: number\n``` and ```ts\ny: string\n```',
      '2, A union of ```ts\nx\n``` or ```ts\ny\n```',
      '3, TypeScript error — interfaces cannot extend interfaces'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\ninterface B extends A\n``` means ```ts\nB\n``` inherits all properties from ```ts\nA\n``` and adds its own.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types'])
    .build(),

  // Generics
  new QuestionBuilder()
    .inherits(generics)
    .setSubtopic('Basic generics')
    .setPrompt('What does this function signature mean?\n```ts\nfunction identity<T>(value: T): T\n```')
    .setOptions([
      '0, The function takes and returns ```ts\nany\n``` type, but loses type information',
      '1, The function is generic — it takes a value of type ```ts\nT\n``` and returns the same type ```ts\nT\n```, preserving type information',
      '2, ```ts\nT\n``` must be an object type — primitives are not allowed',
      '3, The function can only be called with explicitly provided type arguments'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Generics are type parameters. TypeScript infers ```ts\nT\n``` from the argument, preserving type safety.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/generics.html'])
    .build(),

  new QuestionBuilder()
    .inherits(generics)
    .setSubtopic('Constraints')
    .setPrompt('What does the following generic constraint mean?\n```ts\n<T extends { length: number }>\n```')
    .setOptions([
      '0, ```ts\nT\n``` must be a ```ts\nstring\n``` or ```ts\narray\n```',
      '1, ```ts\nT\n``` can be any type that has a ```ts\nlength\n``` property of type ```ts\nnumber\n```',
      '2, ```ts\nT\n``` cannot exceed a length of a number',
      '3, ```ts\nT\n``` extends the ```ts\nNumber\n``` class'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Generic constraints (```ts\nextends\n```) restrict what types ```ts\nT\n``` can be.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints'])
    .build(),

  // Utility Types
  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Partial and Required')
    .setPrompt('What does ```ts\nPartial<User>\n``` produce if ```ts\nUser\n``` is defined as follows?\n```ts\ntype User = { name: string; age: number }\n```')
    .setOptions([
      '0, ```ts\n{ name?: string; age?: number }\n```',
      '1, ```ts\n{ name: string | undefined; age: number | undefined }\n```',
      '2, ```ts\n{ name: string; age?: number }\n```',
      '3, Removes optional properties, leaving only required ones'
    ])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nPartial<T>\n``` makes all properties of ```ts\nT\n``` optional.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype'])
    .build(),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Partial')
    .setPrompt('What does ```ts\nPartial<T>\n``` do to a type ```ts\nT\n```?')
    .setOptions([
      '0, Makes all properties required',
      '1, Makes all properties optional',
      '2, Removes index signatures',
      '3, Converts properties to readonly'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nPartial<T>\n``` constructs a type with all properties of ```ts\nT\n``` set to optional.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype'])
    .build(),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Pick and Omit')
    .setPrompt('Given the following type:\n```ts\ntype User = { id: number; name: string; password: string }\n```\nHow do you create a type with only ```ts\nid\n``` and ```ts\nname\n```?')
    .setOptions([
      '0, ```ts\nPick<User, "id" | "name">\n```',
      '1, ```ts\nOmit<User, "id" | "name">\n```',
      '2, ```ts\nExtract<User, "id" | "name">\n```',
      '3, ```ts\nSelect<User, "id" | "name">\n```'
    ])
    .setAnswer('0')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nPick<T, Keys>\n``` constructs a type with only the specified keys.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys'])
    .build(),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Record')
    .setPrompt('What does ```ts\nRecord<string, number>\n``` describe?')
    .setOptions([
      '0, A tuple of ```ts\n[string, number]\n```',
      '1, An object type where all keys are ```ts\nstring\n```s and all values are ```ts\nnumber\n```s',
      '2, A ```ts\nMap\n``` with ```ts\nstring\n``` keys and ```ts\nnumber\n``` values',
      '3, An array of string-number pairs'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nRecord<K, V>\n``` is equivalent to ```ts\n{ [key in K]: V }\n```.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type'])
    .build(),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Readonly')
    .setPrompt('What does ```ts\nReadonly<T>\n``` do?')
    .setOptions([
      '0, Freezes the object at runtime',
      '1, Makes all properties read-only at the type level — TypeScript will error on assignment',
      '2, Removes all methods from the type, leaving only data properties',
      '3, Makes all properties optional'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nReadonly<T>\n``` adds the readonly modifier to all properties.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype'])
    .build(),

  // Type Algebra
  new QuestionBuilder()
    .inherits(typeAlgebra)
    .setSubtopic('Union types')
    .setPrompt('What is a union type in TypeScript?')
    .setOptions([
      '0, A type that must satisfy all members simultaneously',
      '1, A type that can be one of several types — the value is any one of them',
      '2, A set of types that are combined via inheritance',
      '3, A type that represents the intersection of two objects'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('A union type (```ts\nA | B\n```) means the value is either ```ts\nA\n``` or ```ts\nB\n```.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types'])
    .build(),

  new QuestionBuilder()
    .inherits(typeAlgebra)
    .setSubtopic('Intersection types')
    .setPrompt('What does ```ts\ntype AB = A & B\n``` mean when ```ts\nA\n``` and ```ts\nB\n``` are defined as:\n```ts\ntype A = { x: number }\ntype B = { y: string }\n```')
    .setOptions([
      '0, A value that is either ```ts\n{ x: number }\n``` or ```ts\n{ y: string }\n```',
      '1, A value that has both ```ts\nx: number\n``` AND ```ts\ny: string\n``` — must satisfy both shapes',
      '2, An error — TypeScript does not support ```ts\n&\n``` on object types',
      '3, A value that can have ```ts\nx\n``` or ```ts\ny\n``` but not both'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Intersection types (```ts\nA & B\n```) combine multiple types — the result must satisfy all of them.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types'])
    .build(),

  // Type Narrowing
  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('typeof narrowing')
    .setPrompt('Inside the following block, what is the type of ```ts\nvalue\n```?\n```ts\nif (typeof value === "string") { ... }\n```')
    .setOptions([
      '0, ```ts\nstring | undefined\n```',
      '1, ```ts\nstring\n```',
      '2, ```ts\nunknown\n```',
      '3, The original type of ```ts\nvalue\n```'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation("TypeScript's control flow analysis narrows types based on conditions.")
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards'])
    .build(),

  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('User-defined type guards')
    .setPrompt('What is a user-defined type guard in TypeScript?')
    .setOptions([
      '0, A runtime validation library integration',
      '1, A function that returns ```ts\nvalue is Type\n``` — TypeScript uses the return as a type narrowing signal',
      '2, A class with a protected constructor',
      '3, A generic constraint that checks the type at compile time'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('A user-defined type guard has a return type of the form ```ts\nparamName is Type\n```.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates'])
    .build(),

  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('keyof')
    .setPrompt('What does the ```ts\nkeyof\n``` operator produce for a type ```ts\nT\n```?')
    .setOptions(['0, A runtime list of keys', '1, A union type of the property names of ```ts\nT\n```', '2, The type of values in ```ts\nT\n```', '3, An error'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nkeyof T\n``` produces a union of the keys of ```ts\nT\n```.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/keyof-types.html'])
    .build(),

  // TS + React
  new QuestionBuilder()
    .inherits(tsReact)
    .setSubtopic('useState with types')
    .setPrompt('How do you type ```ts\nuseState\n``` when the initial value is ```ts\nnull\n``` but will later be a ```ts\nUser\n``` object?')
    .setOptions([
      '0, ```tsx\nconst [user, setUser] = useState(null)\n```',
      '1, ```tsx\nconst [user, setUser] = useState<User | null>(null)\n```',
      '2, ```tsx\nconst [user, setUser] = useState<User>(null)\n```',
      '3, ```tsx\nconst [user, setUser] = useState<User>({})\n```'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Provide the generic type argument explicitly when TypeScript cannot infer from the initial value.')
    .setReferences(['https://react.dev/learn/typescript#typing-usestate'])
    .build(),

  // tsconfig
  new QuestionBuilder()
    .inherits(tsconfig)
    .setSubtopic('Strict mode')
    .setPrompt('What does ```ts\n"strict": true\n``` in ```ts\ntsconfig.json\n``` enable?')
    .setOptions([
      '0, Only strict null checks',
      '1, A bundle of strict checks: ```ts\nstrictNullChecks\n```, ```ts\nnoImplicitAny\n```, ```ts\nstrictFunctionTypes\n```, and more',
      '2, Runtime type checking',
      '3, Prevents the use of ```ts\nany\n``` type'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('"strict" is a shorthand for enabling a group of strict type checking options.')
    .setReferences(['https://www.typescriptlang.org/tsconfig/#strict'])
    .build(),

  // Declaration Files
  new QuestionBuilder()
    .inherits(declarationFiles)
    .setSubtopic('DefinitelyTyped')
    .setPrompt('What is ```ts\n@types/*\n``` and when do you need it?')
    .setOptions([
      "0, TypeScript's built-in type definitions for the web platform",
      "1, Community-maintained type definitions (DefinitelyTyped) for JavaScript libraries that don't ship their own types",
      '2, Custom type definition files generated during build',
      '3, ESLint type checking plugins'
    ])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Community-maintained type definitions (DefinitelyTyped) for JavaScript libraries.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types'])
    .build(),

  // Enums
  new QuestionBuilder()
    .inherits(enums)
    .setSubtopic('const enum vs enum')
    .setPrompt('What is the difference between ```ts\nenum\n``` and ```ts\nconst enum\n``` in TypeScript?')
    .setOptions([
      '0, ```ts\nconst enum\n``` has constant default values; ```ts\nenum\n``` values are dynamic',
      '1, ```ts\nconst enum\n``` is inlined at compile time; ```ts\nenum\n``` generates a JavaScript object at runtime',
      '2, ```ts\nenum\n``` can be used in conditional types; ```ts\nconst enum\n``` cannot',
      '3, They are identical'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Regular ```ts\nenum\n```s compile to a JavaScript object. ```ts\nconst enum\n```s are completely erased and their values are inlined.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/enums.html#const-enums'])
    .build(),
];
