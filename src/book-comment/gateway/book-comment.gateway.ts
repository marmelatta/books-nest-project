import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class BookCommentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  //@WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    //this.wss.emit('msgToclient', text)
    //client.emit('msgToclient', text);
    return { event: 'msgToClient', data: text };
  }
}
