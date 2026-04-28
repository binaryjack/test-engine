import { QuestionBuilder } from "../utils/question-builder"
import { MCQ_ADVANCED } from "./presets"

// --- Topic Presets ---
const advancedGenerics = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Generics');
const advancedUtilityTypes = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Utility Types');
const advancedNarrowing = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Type Narrowing');
const advancedTypes = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Advanced Types');
const advancedTsReact = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('TypeScript + React');
const declarationFiles = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Declaration Files');
const advancedEnums = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Enums');
const decorators = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Decorators');

export const typescriptAdvancedQuestions = [
  // Generics
  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('Conditional generics')
    .setPrompt('What does this type produce?\n```ts\ntype IsArray<T> = T extends any[] ? true : false\n```')
    .setOptions([
      'Always returns boolean',
      'Returns true if T is an array type, false otherwise',
      'Returns the element type of the array',
      'TypeScript error — conditional types require keyof'
    ])
    .setAnswer('Returns true if T is an array type, false otherwise')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Conditional types use the `T extends U ? X : Y` syntax — a ternary for types.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html']),

  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('Infer keyword')
    .setPrompt('What does infer do in a conditional type like the following?\n```ts\ntype UnpackPromise<T> = T extends Promise<infer U> ? U : T\n```')
    .setOptions([
      'Forces TypeScript to infer the type at runtime',
      'Extracts a type from within a conditional type pattern — U is inferred from the structure of T',
      'Makes the generic parameter optional',
      'Declares a new type variable scoped to the true branch'
    ])
    .setAnswer('Extracts a type from within a conditional type pattern — U is inferred from the structure of T')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('`infer U` captures the resolved type of a Promise within the conditional pattern.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types']),

  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('infer')
    .setPrompt('In conditional types, what does the infer keyword allow you to do?')
    .setOptions([
      'Infer a type inside the true branch from a pattern',
      'Infer runtime values',
      'Infer generic parameter names',
      'Infer module paths'
    ])
    .setAnswer('Infer a type inside the true branch from a pattern')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('infer lets you capture a type from inside another type in a conditional type for reuse in the true branch.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types']),

  // Utility Types
  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('ReturnType and Parameters')
    .setPrompt('What does ReturnType<typeof fetch> give you?')
    .setOptions([
      'The type of the fetch function itself',
      'The return type of the fetch function — `Promise<Response>`',
      'The parameter types of fetch',
      'The resolved value type — Response'
    ])
    .setAnswer('The return type of the fetch function — `Promise<Response>`')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('`ReturnType<T>` extracts the return type of a function type.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype']),

  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('Exclude and Extract')
    .setPrompt('Given type Status = "active" | "inactive" | "pending", what is Exclude<Status, "inactive" | "pending">?')
    .setOptions(['"inactive" | "pending"', '"active"', 'Status', 'never'])
    .setAnswer('"active"')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('`Exclude<T, U>` removes from T all types assignable to U.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers']),

  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('NonNullable')
    .setPrompt('What does NonNullable<string | null | undefined> produce?')
    .setOptions(['string | null', 'string', 'string | undefined', 'never'])
    .setAnswer('string')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('`NonNullable<T>` removes null and undefined from a union type.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype']),

  // Type Narrowing
  new QuestionBuilder()
    .inherits(advancedNarrowing)
    .setSubtopic('Discriminated unions')
    .setPrompt('What makes a union a "discriminated union" that TypeScript can narrow efficiently?')
    .setOptions([
      'Each member has at least one unique property name',
      'Each member has a shared literal-typed discriminant property',
      'The union has at most two members',
      'All members must be class instances'
    ])
    .setAnswer('Each member has a shared literal-typed discriminant property')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('A discriminated union has a shared property with literal values.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions']),

  new QuestionBuilder()
    .inherits(advancedNarrowing)
    .setSubtopic('User-defined type guards')
    .setPrompt('What is the form of a user-defined type guard function in TypeScript?')
    .setOptions([
      '```ts\nfunction isUser(x): boolean\n```',
      '```ts\nfunction isUser(x: unknown): x is User\n```',
      '```ts\nfunction isUser<T>(x: T): T is User\n```',
      '```ts\nfunction isUser(x): x is User\n```'
    ])
    .setAnswer('```ts\nfunction isUser(x: unknown): x is User\n```')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('A user-defined type guard has a return type of the form `paramName is Type`.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates']),

  // Advanced Types
  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Mapped types')
    .setPrompt('What does this mapped type produce?\n```ts\ntype Optional<T> = { [K in keyof T]?: T[K] }\n```')
    .setOptions([
      'A type where all properties are required',
      'A type where all properties of T are made optional — equivalent to Partial<T>',
      'A type where all property values are union with undefined',
      'A type that only includes properties with optional values'
    ])
    .setAnswer('A type where all properties of T are made optional — equivalent to Partial<T>')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Adding ? makes each property optional. This is how Partial<T> is implemented.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/mapped-types.html']),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Template literal types')
    .setPrompt('What does the following template literal type match?\n```ts\ntype EventName = `on${string}`\n```')
    .setOptions([
      'Only the string "on"',
      'Any string that starts with "on"',
      'Any string that contains "on"',
      'Only capitalized event names like "onClick"'
    ])
    .setAnswer('Any string that starts with "on"')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Template literal types compose string literal types.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html']),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Conditional types distributive')
    .setPrompt('What is "distributive" behavior in conditional types? Given the following type:\n```ts\ntype ToArray<T> = T extends any ? T[] : never\n```\nWhat is ToArray<string | number>?')
    .setOptions(['(string | number)[]', 'string[] | number[]', 'never', 'TypeScript error'])
    .setAnswer('string[] | number[]')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('When a conditional type receives a union, TypeScript distributes it.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types']),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Recursive types')
    .setPrompt('How would you type a deeply nested JSON value in TypeScript?')
    .setOptions([
      '```ts\ntype JSON = string | number | boolean | null | object\n```',
      '```ts\ntype JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }\n```',
      '```ts\ntype JSON = Record<string, unknown>\n```',
      'Recursive types are not supported in TypeScript'
    ])
    .setAnswer('```ts\ntype JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }\n```')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('TypeScript supports recursive type aliases since TS 3.7.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonly-modifier']),

  // TS + React
  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('FC type')
    .setPrompt('Should you use React.FC<Props> to type function components in modern React TypeScript?')
    .setOptions([
      'Yes — it is the official recommended way',
      'No — it is increasingly discouraged; prefer directly typing props and return type',
      'Only for class components',
      'Only when the component accepts children'
    ])
    .setAnswer('No — it is increasingly discouraged; prefer directly typing props and return type')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React.FC adds implicit children prop (before React 18).')
    .setReferences(['https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components']),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Discriminated union state')
    .setPrompt('How should you type an async data loading state in TypeScript for maximum type safety?')
    .setOptions([
      '```tsx\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);\n```',
      '```tsx\ntype State = | { status: "idle" } | { status: "loading" } | { status: "success"; data: User } | { status: "error"; error: Error };\nconst [state, setState] = useState<State>({ status: "idle" });\n```',
      '```tsx\nconst [state, setState] = useState<{ data?: User; loading: boolean; error?: Error }>({ loading: false });\n```',
      '```ts\ninterface AsyncState<T> { data: T | null; loading: boolean; error: string | null }\n```'
    ])
    .setAnswer('```tsx\ntype State = | { status: "idle" } | { status: "loading" } | { status: "success"; data: User } | { status: "error"; error: Error };\nconst [state, setState] = useState<State>({ status: "idle" });\n```')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('The discriminated union approach makes invalid states impossible.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions']),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Event handlers')
    .setPrompt('What is the correct type for a React onKeyDown handler prop?')
    .setOptions([
      'React.KeyDownHandler',
      'React.KeyboardEventHandler<HTMLInputElement>',
      '(e: KeyboardEvent) => void',
      'EventHandler<KeyboardEvent>'
    ])
    .setAnswer('React.KeyboardEventHandler<HTMLInputElement>')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React provides typed event handler aliases.')
    .setReferences(['https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/']),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('useReducer typing')
    .setPrompt('What is the benefit of typing a useReducer action as a discriminated union?')
    .setOptions([
      'It makes the reducer run faster',
      'TypeScript narrows the action type in each case branch, so action.payload is typed correctly',
      'It enables the reducer to handle async actions',
      'It allows multiple reducers to handle the same action'
    ])
    .setAnswer('TypeScript narrows the action type in each case branch, so action.payload is typed correctly')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('TypeScript narrows the action type in each case branch.')
    .setReferences(['https://react.dev/learn/typescript#typing-usereducer']),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Context typing')
    .setPrompt('What is the type-safe way to create a context that cannot be undefined at the consumer?')
    .setOptions([
      '```tsx\nconst Ctx = createContext(null)\n```',
      'Create a custom hook that wraps useContext and throws if the value is undefined',
      'Use createContext<T>() with no default value',
      'Type the context as Readonly<T>'
    ])
    .setAnswer('Create a custom hook that wraps useContext and throws if the value is undefined')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Throwing an error ensures that consumers only get the defined value.')
    .setReferences(['https://kentcdodds.com/blog/how-to-use-react-context-effectively']),

  // Declaration Files
  new QuestionBuilder()
    .inherits(declarationFiles)
    .setSubtopic('Module augmentation')
    .setPrompt('How do you extend an existing library\'s types in TypeScript without modifying the library?')
    .setOptions([
      'Copy the library\'s type file and add your properties',
      'Use module augmentation — declare the same module in a .d.ts file and add properties to the interface',
      'Use type casting wherever you need the additional properties',
      'TypeScript does not allow extending library types'
    ])
    .setAnswer('Use module augmentation — declare the same module in a .d.ts file and add properties to the interface')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Module augmentation uses declaration merging.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation']),

  // Enums
  new QuestionBuilder()
    .inherits(advancedEnums)
    .setSubtopic('Union vs enum')
    .setPrompt('When should you prefer a string union type over an enum?')
    .setOptions([
      'Always — enums are obsolete in modern TypeScript',
      'When you do not need runtime iteration over values and want simpler, tree-shakeable code',
      'When you need the reverse mapping (value to name)',
      'When the values are numeric'
    ])
    .setAnswer('When you do not need runtime iteration over values and want simpler, tree-shakeable code')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('String union types are simpler and do not generate runtime code.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/enums.html']),

  // Decorators
  new QuestionBuilder()
    .inherits(decorators)
    .setSubtopic('TypeScript decorators')
    .setPrompt('TypeScript decorators are primarily used for:')
    .setOptions([
      'Adding runtime type information to classes and methods',
      'Metaprogramming — annotating or modifying classes, methods, and properties at design time',
      'Replacing generics for cleaner syntax',
      'Providing type guards for complex types'
    ])
    .setAnswer('Metaprogramming — annotating or modifying classes, methods, and properties at design time')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Decorators are a metaprogramming syntax.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/decorators.html'])
];
