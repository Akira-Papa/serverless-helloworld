import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class HelloStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda関数の作成
    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.hello',
      code: lambda.Code.fromAsset('src'),
    });

    // API Gatewayの作成
    const api = new apigateway.RestApi(this, 'HelloApi');
    api.root.addResource('hello').addMethod('GET', new apigateway.LambdaIntegration(helloFunction));
  }
}
