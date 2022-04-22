import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { BookCommentService } from '../book-comment.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  constructor(private bookCommentService: BookCommentService) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any): any {
    this.logger.log('Chat initialized!');
  }

  @SubscribeMessage('chatToServer')
  async handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    await this.bookCommentService.create({
      user: message.sender,
      bookId: message.room,
      comment: message.message,
    });
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    const messages = await this.bookCommentService.findAllBookComment(room);
    client.emit('joinedRoom', room, messages);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
