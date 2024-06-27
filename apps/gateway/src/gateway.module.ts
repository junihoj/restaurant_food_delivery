import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver:ApolloGatewayDriver,
      gateway:{
        supergraphSdl: new IntrospectAndCompose({
          subgraphs:[],
        })
      }
    })
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
