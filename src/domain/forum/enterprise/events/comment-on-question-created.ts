import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../entities/question-comment'

export class CommentOnQuestionCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public commentQuestion: QuestionComment

  constructor(commentQuestion: QuestionComment) {
    this.ocurredAt = new Date()
    this.commentQuestion = commentQuestion
  }

  getAggregateId(): UniqueEntityId {
    return this.commentQuestion.id
  }
}
