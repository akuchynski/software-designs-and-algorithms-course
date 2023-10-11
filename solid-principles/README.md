# The SOLID Principles on the example of the [NestJS](https://github.com/nestjs/nest) framework

##### 1. Single Responsibility Principle

| Correct usage                                                                                                             | Violated usage                                                                                                                                  |
|---------------------------------------------------------------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [FileTypeValidator](https://github.com/nestjs/nest/blob/master/packages/common/pipes/file/file-type.validator.ts#L18-L36) | [ExpressAdapter](https://github.com/nestjs/nest/blob/master/packages/platform-express/adapters/express-adapter.ts#L54-L445)                 |
| [StreamableFile](https://github.com/nestjs/nest/blob/master/packages/common/file-stream/streamable-file.ts#L12-L77)       | [ListenersController](https://github.com/nestjs/nest/blob/master/packages/microservices/listeners-controller.ts#L51-L339)                   |


##### 2. Open-Closed Principle

| Correct usage                                                                                                      | Violated usage                                                                                                       |
|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| [AbstractHttpAdapter](https://github.com/nestjs/nest/blob/master/packages/core/adapters/http-adapter.ts#L99-L130)  | [ClientGrpcProxy](https://github.com/nestjs/nest/blob/master/packages/microservices/client/client-grpc.ts#L336-L343) |
| [ClientProxy](https://github.com/nestjs/nest/blob/master/packages/microservices/client/client-proxy.ts#L35-L169)   | [ClientKafka](https://github.com/nestjs/nest/blob/master/packages/microservices/client/client-kafka.ts#L305-L313)    |

##### 3. Liskov Substitution Principle

| Correct usage                                                                                                                         |
|---------------------------------------------------------------------------------------------------------------------------------------|
| [BadRequestException](https://github.com/nestjs/nest/blob/master/packages/common/exceptions/bad-request.exception.ts)                 |
| [HttpException](https://github.com/nestjs/nest/blob/master/packages/common/exceptions/http.exception.ts)                              |

##### 4. Interface Segregation Principle

| Correct usage                                                                                                                            | Violated usage                                                                                                                         |
|------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [ExceptionFilter](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/exceptions/exception-filter.interface.ts)        | [ArgumentsHost](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/features/arguments-host.interface.ts)            |
| [RpcExceptionFilter](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/exceptions/rpc-exception-filter.interface.ts) | [INestApplicationContext](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/nest-application-context.interface.ts) |
| [WsExceptionFilter](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/exceptions/ws-exception-filter.interface.ts)   | [INestApplication](https://github.com/nestjs/nest/blob/master/packages/common/interfaces/nest-application.interface.ts)                |

##### 5. Dependency Inversion Principle

| Correct usage                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ApplicationConfig](https://github.com/nestjs/nest/blob/master/packages/core/application-config.ts)                               |
