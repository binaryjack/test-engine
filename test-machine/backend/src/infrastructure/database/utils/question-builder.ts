import { QuestionInput, QuestionSchema } from '@/domain/question/question.schema'

/**
 * QuestionBuilder implementation for QuestionInput
 * Pattern: Fluent Interface / Builder
 */
export class QuestionBuilder {
  private data: Partial<QuestionInput> = {
    subtopic: '',
    explanation: '',
    references: [],
    options: []
  };

    
public inherits(builder: QuestionBuilder) {
    this.data = { ...this.data, ...builder.data }
    return this;
}
    
  public setTechnologyId(id: string): this {
    this.data.technologyId = id;
    return this;
  }

  public setLevel(level: string): this {
    this.data.level = level;
    return this;
  }

  public setTopic(topic: string): this {
    this.data.topic = topic;
    return this;
  }

  public setSubtopic(subtopic: string): this {
    this.data.subtopic = subtopic;
    return this;
  }

  public setType(type: QuestionInput['type']): this {
    this.data.type = type;
    return this;
  }

  public setPrompt(prompt: string): this {
    this.data.prompt = prompt;
    return this;
  }

  public setOptions(options?: string[]): this {
    this.data.options = options ? [...options] : [];
    return this;
  }

  public setAnswer(answer: string): this {
    this.data.answer = answer;
    return this;
  }

  public setDifficulty(difficulty: number): this {
    this.data.difficulty = difficulty;
    return this;
  }

  public setEstimatedTime(seconds: number): this {
    this.data.estimatedTime = seconds;
    return this;
  }

  public setExplanation(explanation: string): this {
    this.data.explanation = explanation;
    return this;
  }

  public setReferences(references: string[]): this {
    this.data.references = references;
    return this;
  }

  /**
   * Finalizes the object and validates against Zod Schema
   * @throws {ZodError} If constraints are not met
   */
  public build(): QuestionInput {
    return QuestionSchema.omit({ technologyId: true }).parse(this.data) as QuestionInput;
  }
}