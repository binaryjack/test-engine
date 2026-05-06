import { QuestionBuilder } from '../utils/question-builder';

/**
 * Base presets for different levels and types.
 * Using MCQ as the default type as it is the most common.
 */

export const MCQ_FUNDAMENTALS = new QuestionBuilder()
  .setLevel('FUNDAMENTALS')
  .setType('mcq');

export const MCQ_MID = new QuestionBuilder()
  .setLevel('MID')
  .setType('mcq');

export const MCQ_SENIOR = new QuestionBuilder()
  .setLevel('SENIOR')
  .setType('mcq');

export const MCQ_ADVANCED = new QuestionBuilder()
  .setLevel('ADVANCED')
  .setType('mcq');

export const CODING_MID = new QuestionBuilder()
  .setLevel('MID')
  .setType('coding');

export const CODING_SENIOR = new QuestionBuilder()
  .setLevel('SENIOR')
  .setType('coding');


  // --- Topic Presets ---
export const hooks = new QuestionBuilder().inherits(MCQ_MID).setTopic('Hooks');
export const useStatePreset = new QuestionBuilder().inherits(hooks).setSubtopic('useState');
export const useEffectPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useEffect');
export const useMemoPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useMemo');
export const useCallbackPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useCallback');
export const useRefPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useRef');
export const useContextPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useContext');
export const useReducerPreset = new QuestionBuilder().inherits(hooks).setSubtopic('useReducer');

export const patterns = new QuestionBuilder().inherits(MCQ_MID).setTopic('Component Patterns');
export const events = new QuestionBuilder().inherits(MCQ_MID).setTopic('Events');
export const forms = new QuestionBuilder().inherits(MCQ_MID).setTopic('Forms');
export const rendering = new QuestionBuilder().inherits(MCQ_MID).setTopic('Rendering');
export const props = new QuestionBuilder().inherits(MCQ_MID).setTopic('Props');
export const performance = new QuestionBuilder().inherits(MCQ_MID).setTopic('Performance');
export const stateManagement = new QuestionBuilder().inherits(MCQ_MID).setTopic('State Management');
export const customHooks = new QuestionBuilder().inherits(MCQ_MID).setTopic('Custom Hooks');
export const errorHandling = new QuestionBuilder().inherits(MCQ_MID).setTopic('Error Handling');
export const portals = new QuestionBuilder().inherits(MCQ_MID).setTopic('Portals');
export const suspense = new QuestionBuilder().inherits(MCQ_MID).setTopic('Suspense');
export const react19 = new QuestionBuilder().inherits(MCQ_MID).setTopic('React 19');
export const testing = new QuestionBuilder().inherits(MCQ_MID).setTopic('Testing');
export const a11y = new QuestionBuilder().inherits(MCQ_MID).setTopic('Accessibility');
export const typescript = new QuestionBuilder().inherits(MCQ_MID).setTopic('TypeScript');
export const internals = new QuestionBuilder().inherits(MCQ_MID).setTopic('Internals');
export const tooling = new QuestionBuilder().inherits(MCQ_MID).setTopic('Tooling');
export const jsx = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('JSX');
export const components = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Components');
export const state = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('State');
export const lists = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Lists');
export const fragments = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Fragments');
export const conditionalRendering = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Conditional rendering');
export const concurrent = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Concurrent Features');
export const advancedHooks = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Advanced Hooks');
export const architecture = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Architecture');
export const ssr = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('SSR');
export const security = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Security');
export const i18n = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('i18n');
export const dataFetching = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Data Fetching');
export const devops = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('DevOps');
export const webAPIs = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Web APIs');
export const optimisticUI = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Optimistic UI');
export const prefetching = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Prefetching');
export const streamingSSR = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Streaming SSR');
export const observability = new QuestionBuilder().inherits(MCQ_SENIOR).setTopic('Observability');

export const advancedGenerics = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Generics');
export const advancedUtilityTypes = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Utility Types');
export const advancedNarrowing = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Type Narrowing');
export const advancedTypes = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Advanced Types');
export const advancedTsReact = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('TypeScript + React');
export const declarationFiles = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Declaration Files');
export const advancedEnums = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Enums');
export const decorators = new QuestionBuilder().inherits(MCQ_ADVANCED).setTopic('Decorators');

export const basicTypes = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Basic Types');
export const interfaces = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Interfaces');
export const generics = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Generics');
export const utilityTypes = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Utility Types');
export const typeAlgebra = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Type Algebra');
export const typeNarrowing = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Type Narrowing');
export const tsReact = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('TypeScript + React');
export const tsconfig = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('tsconfig');
export const enums = new QuestionBuilder().inherits(MCQ_FUNDAMENTALS).setTopic('Enums');