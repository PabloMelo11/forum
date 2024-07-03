import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { CommentOnQuestionCreatedEvent } from '@/domain/forum/enterprise/events/comment-on-question-created'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnCommentQuestion implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionCommentNotification.bind(this),
      CommentOnQuestionCreatedEvent.name,
    )
  }

  private async sendQuestionCommentNotification({
    commentQuestion,
  }: CommentOnQuestionCreatedEvent) {
    const question = await this.questionsRepository.findById(
      commentQuestion.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: commentQuestion.content.substring(0, 40).concat('...'),
      })
    }
  }
}
