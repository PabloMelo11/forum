import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'
import { CommentOnQuestionCreatedEvent } from '../events/comment-on-question-created'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewQuestionComment = !id

    if (isNewQuestionComment) {
      questionComment.addDomainEvent(
        new CommentOnQuestionCreatedEvent(questionComment),
      )
    }

    return questionComment
  }
}
