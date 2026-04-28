import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_FUNDAMENTALS } from "./presets"

// --- Topic Presets ---
const basicTypes = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Basic Types');
const interfaces = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Interfaces');
const generics = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Generics');
const utilityTypes = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Utility Types');
const typeAlgebra = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Type Algebra');
const typeNarrowing = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Type Narrowing');
const tsReact = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('TypeScript + React');
const tsconfig = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('tsconfig');
const declarationFiles = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Declaration Files');
const enums = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Enums');

export const typescriptFundamentalsQuestions = [
  // Basic Types
  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Primitives')
    .setPrompt('Which TypeScript type describes a value that can never occur?')
    .setOptions(['unknown', 'void', 'never', 'undefined'])
    .setAnswer('never')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('`never` represents values that never occur — e.g., the return type of a function that always throws or has an infinite loop.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type']),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('unknown vs any')
    .setPrompt('What is the key difference between any and unknown?')
    .setOptions([
      'unknown is the same as any but marks deprecated APIs',
      'any disables type checking; unknown is type-safe — you must narrow it before using it',
      'unknown can only hold primitive values; any can hold anything',
      'They are identical — unknown is just an alias for any'
    ])
    .setAnswer('any disables type checking; unknown is type-safe — you must narrow it before using it')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('unknown is the type-safe counterpart to any. You can assign anything to unknown, but you cannot use it without narrowing.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown']),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Type assertions')
    .setPrompt('When should you use a type assertion (value as Type)?')
    .setOptions([
      'Whenever TypeScript infers the wrong type',
      'When you have more information than TypeScript about a value\'s type and the assertion is safe',
      'As a replacement for proper typing — it\'s faster than writing interfaces',
      'To convert between incompatible types (e.g., string to number)'
    ])
    .setAnswer('When you have more information than TypeScript about a value\'s type and the assertion is safe')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Type assertions tell TypeScript "trust me, I know what this is." Use them sparingly and only when you are certain.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions']),

  new QuestionBuilder()
    .inherits(basicTypes)
    .setSubtopic('Literal types')
    .setPrompt('What does the following declaration do?\n```ts\nconst direction = "north" as const\n```')
    .setOptions([
      'Casts the string to a constant number',
      'Narrows the type from `string` to the literal type `"north"`',
      'Makes the variable immutable at runtime',
      'Prevents TypeScript from widening the type to string'
    ])
    .setAnswer('Narrows the type from `string` to the literal type `"north"`')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('`as const` tells TypeScript to infer the most specific literal type rather than widening.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types']),

  // Interfaces
  new QuestionBuilder()
    .inherits(interfaces)
    .setSubtopic('Interface vs Type alias')
    .setPrompt('What can interface do that a type alias cannot?')
    .setOptions([
      'Describe union types',
      'Use generics',
      'Declaration merging — multiple interface declarations with the same name are merged',
      'Extend other types'
    ])
    .setAnswer('Declaration merging — multiple interface declarations with the same name are merged')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Declaration merging allows multiple `interface Foo { ... }` declarations to automatically merge into one.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces']),

  new QuestionBuilder()
    .inherits(interfaces)
    .setSubtopic('Extending')
    .setPrompt('Consider the following interfaces:\n```ts\ninterface A { x: number }\ninterface B extends A { y: string }\n```\nWhat properties does B have?')
    .setOptions([
      'Only y: string',
      'x: number and y: string',
      'A union of x or y',
      'TypeScript error — interfaces cannot extend interfaces'
    ])
    .setAnswer('x: number and y: string')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('interface B extends A means B inherits all properties from A and adds its own.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types']),

  // Generics
  new QuestionBuilder()
    .inherits(generics)
    .setSubtopic('Basic generics')
    .setPrompt('What does this function signature mean?\n```ts\nfunction identity<T>(value: T): T\n```')
    .setOptions([
      'The function takes and returns any type, but loses type information',
      'The function is generic — it takes a value of type T and returns the same type T, preserving type information',
      'T must be an object type — primitives are not allowed',
      'The function can only be called with explicitly provided type arguments'
    ])
    .setAnswer('The function is generic — it takes a value of type T and returns the same type T, preserving type information')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Generics are type parameters. TypeScript infers T from the argument, preserving type safety.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/generics.html']),

  new QuestionBuilder()
    .inherits(generics)
    .setSubtopic('Constraints')
    .setPrompt('What does the following generic constraint mean?\n```ts\n<T extends { length: number }>\n```')
    .setOptions([
      'T must be a string or array',
      'T can be any type that has a length property of type number',
      'T cannot exceed a length of a number',
      'T extends the Number class'
    ])
    .setAnswer('T can be any type that has a length property of type number')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Generic constraints (extends) restrict what types T can be.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints']),

  // Utility Types
  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Partial and Required')
    .setPrompt('What does Partial<User> produce if User is defined as follows?\n```ts\ntype User = { name: string; age: number }\n```')
    .setOptions([
      '```ts\n{ name?: string; age?: number }\n```',
      '```ts\n{ name: string | undefined; age: number | undefined }\n```',
      '```ts\n{ name: string; age?: number }\n```',
      'Removes optional properties, leaving only required ones'
    ])
    .setAnswer('```ts\n{ name?: string; age?: number }\n```')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`Partial<T>` makes all properties of T optional.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype']),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Partial')
    .setPrompt('What does Partial<T> do to a type T?')
    .setOptions([
      'Makes all properties required',
      'Makes all properties optional',
      'Removes index signatures',
      'Converts properties to readonly'
    ])
    .setAnswer('Makes all properties optional')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`Partial<T>` constructs a type with all properties of T set to optional.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype']),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Pick and Omit')
    .setPrompt('Given the following type:\n```ts\ntype User = { id: number; name: string; password: string }\n```\nHow do you create a type with only `id` and `name`?')
    .setOptions([
      '`Pick<User, "id" | "name">`',
      '`Omit<User, "id" | "name">`',
      '`Extract<User, "id" | "name">`',
      '`Select<User, "id" | "name">`'
    ])
    .setAnswer('`Pick<User, "id" | "name">`')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`Pick<T, Keys>` constructs a type with only the specified keys.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys']),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Record')
    .setPrompt('What does Record<string, number> describe?')
    .setOptions([
      'A tuple of [string, number]',
      'An object type where all keys are strings and all values are numbers',
      'A Map with string keys and number values',
      'An array of string-number pairs'
    ])
    .setAnswer('An object type where all keys are strings and all values are numbers')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`Record<K, V>` is equivalent to `{ [key in K]: V }`.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type']),

  new QuestionBuilder()
    .inherits(utilityTypes)
    .setSubtopic('Readonly')
    .setPrompt('What does Readonly<T> do?')
    .setOptions([
      'Freezes the object at runtime',
      'Makes all properties read-only at the type level — TypeScript will error on assignment',
      'Removes all methods from the type, leaving only data properties',
      'Makes all properties optional'
    ])
    .setAnswer('Makes all properties read-only at the type level — TypeScript will error on assignment')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`Readonly<T>` adds the readonly modifier to all properties.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype']),

  // Type Algebra
  new QuestionBuilder()
    .inherits(typeAlgebra)
    .setSubtopic('Union types')
    .setPrompt('What is a union type in TypeScript?')
    .setOptions([
      'A type that must satisfy all members simultaneously',
      'A type that can be one of several types — the value is any one of them',
      'A set of types that are combined via inheritance',
      'A type that represents the intersection of two objects'
    ])
    .setAnswer('A type that can be one of several types — the value is any one of them')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('A union type (A | B) means the value is either A or B.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types']),

  new QuestionBuilder()
    .inherits(typeAlgebra)
    .setSubtopic('Intersection types')
    .setPrompt('What does `type AB = A & B` mean when `A` and `B` are defined as:\n```ts\ntype A = { x: number }\ntype B = { y: string }\n```')
    .setOptions([
      'A value that is either { x: number } or { y: string }',
      'A value that has both x: number AND y: string — must satisfy both shapes',
      'An error — TypeScript does not support & on object types',
      'A value that can have x or y but not both'
    ])
    .setAnswer('A value that has both x: number AND y: string — must satisfy both shapes')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Intersection types (A & B) combine multiple types — the result must satisfy all of them.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types']),

  // Type Narrowing
  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('typeof narrowing')
    .setPrompt('Inside the following block, what is the type of `value`?\n```ts\nif (typeof value === "string") { ... }\n```')
    .setOptions([
      'string | undefined',
      'string',
      'unknown',
      'The original type of value'
    ])
    .setAnswer('string')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('TypeScript\'s control flow analysis narrows types based on conditions.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards']),

  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('User-defined type guards')
    .setPrompt('What is a user-defined type guard in TypeScript?')
    .setOptions([
      'A runtime validation library integration',
      'A function that returns `value is Type` — TypeScript uses the return as a type narrowing signal',
      'A class with a protected constructor',
      'A generic constraint that checks the type at compile time'
    ])
    .setAnswer('A function that returns `value is Type` — TypeScript uses the return as a type narrowing signal')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('A user-defined type guard has a return type of the form `paramName is Type`.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates']),

  new QuestionBuilder()
    .inherits(typeNarrowing)
    .setSubtopic('keyof')
    .setPrompt('What does the keyof operator produce for a type T?')
    .setOptions(['A runtime list of keys', 'A union type of the property names of T', 'The type of values in T', 'An error'])
    .setAnswer('A union type of the property names of T')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('`keyof T` produces a union of the keys of T.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/keyof-types.html']),

  // TS + React
  new QuestionBuilder()
    .inherits(tsReact)
    .setSubtopic('useState with types')
    .setPrompt('How do you type useState when the initial value is null but will later be a User object?')
    .setOptions([
      '```tsx\nconst [user, setUser] = useState(null)\n```',
      '```tsx\nconst [user, setUser] = useState<User | null>(null)\n```',
      '```tsx\nconst [user, setUser] = useState<User>(null)\n```',
      '```tsx\nconst [user, setUser] = useState<User>({})\n```'
    ])
    .setAnswer('```tsx\nconst [user, setUser] = useState<User | null>(null)\n```')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Provide the generic type argument explicitly when TypeScript cannot infer from the initial value.')
    .setReferences(['https://react.dev/learn/typescript#typing-usestate']),

  // tsconfig
  new QuestionBuilder()
    .inherits(tsconfig)
    .setSubtopic('Strict mode')
    .setPrompt('What does "strict": true in tsconfig.json enable?')
    .setOptions([
      'Only strict null checks',
      'A bundle of strict checks: strictNullChecks, noImplicitAny, strictFunctionTypes, and more',
      'Runtime type checking',
      'Prevents the use of any type'
    ])
    .setAnswer('A bundle of strict checks: strictNullChecks, noImplicitAny, strictFunctionTypes, and more')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('"strict" is a shorthand for enabling a group of strict type checking options.')
    .setReferences(['https://www.typescriptlang.org/tsconfig/#strict']),

  // Declaration Files
  new QuestionBuilder()
    .inherits(declarationFiles)
    .setSubtopic('DefinitelyTyped')
    .setPrompt('What is @types/* and when do you need it?')
    .setOptions([
      'TypeScript\'s built-in type definitions for the web platform',
      'Community-maintained type definitions (DefinitelyTyped) for JavaScript libraries that don\'t ship their own types',
      'Custom type definition files generated during build',
      'ESLint type checking plugins'
    ])
    .setAnswer('Community-maintained type definitions (DefinitelyTyped) for JavaScript libraries that don\'t ship their own types')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('Community-maintained type definitions (DefinitelyTyped) for JavaScript libraries.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types']),

  // Enums
  new QuestionBuilder()
    .inherits(enums)
    .setSubtopic('const enum vs enum')
    .setPrompt('What is the difference between enum and const enum in TypeScript?')
    .setOptions([
      'const enum has constant default values; enum values are dynamic',
      'const enum is inlined at compile time; enum generates a JavaScript object at runtime',
      'enum can be used in conditional types; const enum cannot',
      'They are identical'
    ])
    .setAnswer('const enum is inlined at compile time; enum generates a JavaScript object at runtime')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Regular enums compile to a JavaScript object. const enums are completely erased and their values are inlined.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/enums.html#const-enums'])
];
