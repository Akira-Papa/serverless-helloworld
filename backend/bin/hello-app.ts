#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HelloStack } from '../lib/hello-stack';

const app = new cdk.App();
new HelloStack(app, 'HelloStack', {
  env: {
    region: 'ap-northeast-1'
  }
});
