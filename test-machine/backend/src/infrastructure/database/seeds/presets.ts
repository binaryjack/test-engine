import { QuestionBuilder } from '../utils/question-builder'

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
