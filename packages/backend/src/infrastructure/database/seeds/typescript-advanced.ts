import { QuestionBuilder } from "../utils/question-builder";
import { advancedEnums, advancedGenerics, advancedNarrowing, advancedTsReact, advancedTypes, advancedUtilityTypes, declarationFiles, decorators } from "./presets";


export const typescriptAdvancedQuestions = [
  // Generics
  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('Conditional generics')
    .setPrompt('What does this type produce?\n```ts\ntype IsArray<T> = T extends any[] ? true : false\n```')
    .setOptions([
      '0, Always returns ```ts\nboolean\n```',
      '1, Returns ```ts\ntrue\n``` if ```ts\nT\n``` is an array type, ```ts\nfalse\n``` otherwise',
      '2, Returns the element type of the array',
      '3, TypeScript error — conditional types require ```ts\nkeyof\n```'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Conditional types use the ```ts\nT extends U ? X : Y\n``` syntax — a ternary for types.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('Infer keyword')
    .setPrompt('What does ```ts\ninfer\n``` do in a conditional type like the following?\n```ts\ntype UnpackPromise<T> = T extends Promise<infer U> ? U : T\n```')
    .setOptions([
      '0, Forces TypeScript to infer the type at runtime',
      '1, Extracts a type from within a conditional type pattern — ```ts\nU\n``` is inferred from the structure of ```ts\nT\n```',
      '2, Makes the generic parameter optional',
      '3, Declares a new type variable scoped to the ```ts\ntrue\n``` branch'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('```ts\ninfer U\n``` captures the resolved type of a ```ts\nPromise\n``` within the conditional pattern.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedGenerics)
    .setSubtopic('infer')
    .setPrompt('In conditional types, what does the ```ts\ninfer\n``` keyword allow you to do?')
    .setOptions([
      '0, Infer a type inside the ```ts\ntrue\n``` branch from a pattern',
      '1, Infer runtime values',
      '2, Infer generic parameter names',
      '3, Infer module paths'
    ])
    .setAnswer('0')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('```ts\ninfer\n``` lets you capture a type from inside another type in a conditional type for reuse in the ```ts\ntrue\n``` branch.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types'])
    .build(),

  // Utility Types
  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('ReturnType and Parameters')
    .setPrompt('What does ```ts\nReturnType<typeof fetch>\n``` give you?')
    .setOptions([
      '0, The type of the ```ts\nfetch\n``` function itself',
      '1, The return type of the ```ts\nfetch\n``` function — ```ts\nPromise<Response>\n```',
      '2, The parameter types of ```ts\nfetch\n```',
      '3, The resolved value type — ```ts\nResponse\n```'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nReturnType<T>\n``` extracts the return type of a function type.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('Exclude and Extract')
    .setPrompt('Given ```ts\ntype Status = "active" | "inactive" | "pending"\n```, what is ```ts\nExclude<Status, "inactive" | "pending">\n```?')
    .setOptions(['0, ```ts\n"inactive" | "pending"\n```', '1, ```ts\n"active"\n```', '2, ```ts\nStatus\n```', '3, ```ts\nnever\n```'])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```ts\nExclude<T, U>\n``` removes from ```ts\nT\n``` all types assignable to ```ts\nU\n```')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedUtilityTypes)
    .setSubtopic('NonNullable')
    .setPrompt('What does ```ts\nNonNullable<string | null | undefined>\n``` produce?')
    .setOptions(['0, ```ts\nstring | null\n```', '1, ```ts\nstring\n```', '2, ```ts\nstring | undefined\n```', '3, ```ts\nnever\n```'])
    .setAnswer('1')
    .setDifficulty(2)
    .setEstimatedTime(30)
    .setExplanation('```ts\nNonNullable<T>\n``` removes ```ts\nnull\n``` and ```ts\nundefined\n``` from a union type.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype'])
    .build(),

  // Type Narrowing
  new QuestionBuilder()
    .inherits(advancedNarrowing)
    .setSubtopic('Discriminated unions')
    .setPrompt('What makes a union a "discriminated union" that TypeScript can narrow efficiently?')
    .setOptions([
      '0, Each member has at least one unique property name',
      '1, Each member has a shared literal-typed discriminant property',
      '2, The union has at most two members',
      '3, All members must be class instances'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('A discriminated union has a shared property with literal values.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedNarrowing)
    .setSubtopic('User-defined type guards')
    .setPrompt('What is the form of a user-defined type guard function in TypeScript?')
    .setOptions([
      '0, ```ts\nfunction isUser(x): boolean\n```',
      '1, ```ts\nfunction isUser(x: unknown): x is User\n```',
      '2, ```ts\nfunction isUser<T>(x: T): T is User\n```',
      '3, ```ts\nfunction isUser(x): x is User\n```'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('A user-defined type guard has a return type of the form ```ts\nparamName is Type\n```')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates'])
    .build(),

  // Advanced Types
  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Mapped types')
    .setPrompt('What does this mapped type produce?\n```ts\ntype Optional<T> = { [K in keyof T]?: T[K] }\n```')
    .setOptions([
      '0, A type where all properties are required',
      '1, A type where all properties of ```ts\nT\n``` are made optional — equivalent to ```ts\nPartial<T>\n```',
      '2, A type where all property values are union with ```ts\nundefined\n```',
      '3, A type that only includes properties with optional values'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Adding ```ts\n?\n``` makes each property optional. This is how ```ts\nPartial<T>\n``` is implemented.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/mapped-types.html'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Template literal types')
    .setPrompt('What does the following template literal type match?\n```ts\ntype EventName = `on${string}`\n```')
    .setOptions([
      '0, Only the string "on"',
      '1, Any string that starts with "on"',
      '2, Any string that contains "on"',
      '3, Only capitalized event names like "onClick"'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('Template literal types compose string literal types.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Conditional types distributive')
    .setPrompt('What is "distributive" behavior in conditional types? Given the following type:\n```ts\ntype ToArray<T> = T extends any ? T[] : never\n```\nWhat is ```ts\nToArray<string | number>\n```?')
    .setOptions(['0, ```ts\n(string | number)[]\n```', '1, ```ts\nstring[] | number[]\n```', '2, ```ts\nnever\n```', '3, TypeScript error'])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('When a conditional type receives a union, TypeScript distributes it.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTypes)
    .setSubtopic('Recursive types')
    .setPrompt('How would you type a deeply nested JSON value in TypeScript?')
    .setOptions([
      '0, ```ts\ntype JSON = string | number | boolean | null | object\n```',
      '1, ```ts\ntype JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }\n```',
      '2, ```ts\ntype JSON = Record<string, unknown>\n```',
      '3, Recursive types are not supported in TypeScript'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('TypeScript supports recursive type aliases since TS 3.7.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonly-modifier'])
    .build(),

  // TS + React
  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('FC type')
    .setPrompt('Should you use ```tsx\nReact.FC<Props>\n``` to type function components in modern React TypeScript?')
    .setOptions([
      '0, Yes — it is the official recommended way',
      '1, No — it is increasingly discouraged; prefer directly typing props and return type',
      '2, Only for class components',
      '3, Only when the component accepts ```ts\nchildren\n```'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('```tsx\nReact.FC\n``` adds implicit ```ts\nchildren\n``` prop (before React 18).')
    .setReferences(['https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Discriminated union state')
    .setPrompt('How should you type an async data loading state in TypeScript for maximum type safety?')
    .setOptions([
      '0, ```tsx\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);\n```',
      '1, ```tsx\ntype State = | { status: "idle" } | { status: "loading" } | { status: "success"; data: User } | { status: "error"; error: Error };\nconst [state, setState] = useState<State>({ status: "idle" });\n```',
      '2, ```tsx\nconst [state, setState] = useState<{ data?: User; loading: boolean; error?: Error }>({ loading: false });\n```',
      '3, ```ts\ninterface AsyncState<T> { data: T | null; loading: boolean; error: string | null }\n```'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('The discriminated union approach makes invalid states impossible.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Event handlers')
    .setPrompt('What is the correct type for a React ```ts\nonKeyDown\n``` handler prop?')
    .setOptions([
      '0, ```ts\nReact.KeyDownHandler\n```',
      '1, ```tsx\nReact.KeyboardEventHandler<HTMLInputElement>\n```',
      '2, ```ts\n(e: KeyboardEvent) => void\n```',
      '3, ```ts\nEventHandler<KeyboardEvent>\n```'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('React provides typed event handler aliases.')
    .setReferences(['https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('useReducer typing')
    .setPrompt('What is the benefit of typing a ```ts\nuseReducer\n``` action as a discriminated union?')
    .setOptions([
      '0, It makes the reducer run faster',
      '1, TypeScript narrows the action type in each ```ts\ncase\n``` branch, so ```ts\naction.payload\n``` is typed correctly',
      '2, It enables the reducer to handle async actions',
      '3, It allows multiple reducers to handle the same action'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('TypeScript narrows the action type in each ```ts\ncase\n``` branch.')
    .setReferences(['https://react.dev/learn/typescript#typing-usereducer'])
    .build(),

  new QuestionBuilder()
    .inherits(advancedTsReact)
    .setSubtopic('Context typing')
    .setPrompt('What is the type-safe way to create a context that cannot be ```ts\nundefined\n``` at the consumer?')
    .setOptions([
      '0, ```tsx\nconst Ctx = createContext(null)\n```',
      '1, Create a custom hook that wraps ```ts\nuseContext\n``` and throws if the value is ```ts\nundefined\n```',
      '2, Use ```ts\ncreateContext<T>()\n``` with no default value',
      '3, Type the context as ```ts\nReadonly<T>\n```'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Throwing an error ensures that consumers only get the defined value.')
    .setReferences(['https://kentcdodds.com/blog/how-to-use-react-context-effectively'])
    .build(),

  // Declaration Files
  new QuestionBuilder()
    .inherits(declarationFiles)
    .setSubtopic('Module augmentation')
    .setPrompt("How do you extend an existing library's types in TypeScript without modifying the library?")
    .setOptions([
      "0, Copy the library's type file and add your properties",
      "1, Use module augmentation — ```ts\ndeclare\n``` the same module in a ```ts\n.d.ts\n``` file and add properties to the interface",
      '2, Use type casting wherever you need the additional properties',
      '3, TypeScript does not allow extending library types'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Module augmentation uses declaration merging.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation'])
    .build(),

  // Enums
  new QuestionBuilder()
    .inherits(advancedEnums)
    .setSubtopic('Union vs enum')
    .setPrompt('When should you prefer a string union type over an ```ts\nenum\n```?')
    .setOptions([
      '0, Always — ```ts\nenum\n```s are obsolete in modern TypeScript',
      '1, When you do not need runtime iteration over values and want simpler, tree-shakeable code',
      '2, When you need the reverse mapping (value to name)',
      '3, When the values are numeric'
    ])
    .setAnswer('1')
    .setDifficulty(3)
    .setEstimatedTime(60)
    .setExplanation('String union types are simpler and do not generate runtime code.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/enums.html'])
    .build(),

  // Decorators
  new QuestionBuilder()
    .inherits(decorators)
    .setSubtopic('TypeScript decorators')
    .setPrompt('TypeScript decorators are primarily used for:')
    .setOptions([
      '0, Adding runtime type information to classes and methods',
      '1, Metaprogramming — annotating or modifying classes, methods, and properties at design time',
      '2, Replacing generics for cleaner syntax',
      '3, Providing type guards for complex types'
    ])
    .setAnswer('1')
    .setDifficulty(5)
    .setEstimatedTime(90)
    .setExplanation('Decorators are a metaprogramming syntax.')
    .setReferences(['https://www.typescriptlang.org/docs/handbook/decorators.html'])
    .build()
];
