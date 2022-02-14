---
title: Using AWS Lambda For Automatic Video Data Transcriptions
slug: aws-transcribe-lambda
description: A step-by-step guide on how to create an AWS Lambda function that triggers AWS Transcribe whenever new items are uploaded to an S3 bucket.
series: introduction-to-aws-and-lambda
# repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

published: true
img: /article/hello.png
alt: THIS IS THE ALT
tags:
  - AWS
  - Python

---

## Introduction
This is part 2 of 3 in a series on AWS, lambda, and resource management. Previously, we learned how to use AWS Transcribe for speech-to-text conversion of videos we upload to an S3 bucket. In this part, we are going to automate this conversion step by using AWS Lambda.

[Lambda](https://aws.amazon.com/lambda/) is an AWS service that allows to run code in response to event triggers without the need to manage the underlying compute infrastructure. This can be useful for various contexts. For instance, so far we manually executed a handler function to transcribe video files in an S3 bucket. Lambda now allows us to call this function based on any event we can communicate to the function, such as whenever a video file is being uploaded to the bucket.

In order to achieve this, we will **i) create two S3 buckets** used as input source and output bucket for AWS Transcribe, **ii) create an IAM role for the lambda function** that allows it to interact with S3 and AWS Transcribe, **iii) create the lambda function** and attach the role, **iv) define the event trigger**, **v) test our setup** by uploading a video to our S3 bucket and checking for a transcript. A final **vi) clean up** step makes sure that we get rid of all resources used for this demo.


## Prerequisites

To conduct the steps outlined above we need an AWS account with sufficient privileges to create lambda funtions and IAM roles. Using our personal account these privileges are given by default.

## Steps

Some of the steps used in this article are identical with those from the <nuxt-link to="/articles/aws-transcribe">first part</nuxt-link> of this series. In these cases detailed explanations are being omitted.

1. **Create Two S3 buckets**

We start by creating two S3 buckets. The first one will be used for as the input bucket containing video data and trigger for the lambda function. The second bucket stores the transcripts that are being returned as JSON files from AWS Transcribe.

```py
S3_NAME_INPUT = 'demo-s3-input-video'
S3_NAME_OUTPUT = 'demo-s3-output-transcript'

import boto3
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)

s3_client.create_bucket(
    ACL='private',
    Bucket=S3_NAME_INPUT,
    CreateBucketConfiguration={
        'LocationConstraint': AWS_DEFAULT_REGION
    }
)

s3_client.create_bucket(
    ACL='private',
    Bucket=S3_NAME_OUTPUT,
    CreateBucketConfiguration={
        'LocationConstraint': AWS_DEFAULT_REGION
    }
)
```


2. **Create An IAM Role For The Lambda Function**

[Identity and Access Management](https://aws.amazon.com/iam/) (IAM) is the AWS service to manage access to AWS services and resources. Before we create the Lambda function, we need to make sure to create an IAM role with privileges to read from and write to all resources we are going to need. Later then we will assign this role to the function. Our Lambda function should be able to:
- read from the S3 input bucket into which video files are being uploaded
- execute various AWS Transcribe methods
- delegate write access to AWS Transcribe for the S3 output bucket
- read and write logs via AWS Cloudwatch

*Login AWS > AWS Management Console > IAM > Access Management: Roles > Create Role > Choose a use case: Lambda*
  - Permissions:
    - AmazonS3FullAccess
    - AmazonTranscribeFullAccess
    - CloudWatchLogsFullAccess
  - Name: e.g. *lambda_s3_create_transcribe_role*


3. **Create The Lambda Function**
Now we can create the lambda function itself.

*Login AWS > AWS Management Console > Lambda >Create function:*

  - provide name, e.g. "lambda_s3_put_transcribe"
  - **Tab "Code"**
    - provide name,
    - attach newly created role,
    - replace code in `lambda_function.py` with code below
    - click "Deploy"

The following handler code is the center of our Lambda function.

```py
import boto3
import os
import time
import logging
import re
from urllib.parse import unquote_plus

log = logging.getLogger(__name__)

# ref.: https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html, last checked: 04-21-2021
LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS = [
    "mp3",
    "mp4",
    "wav",
    "flac",
    "ogg",
    "amr",
    "webm",
]

S3_NAME_OUTPUT = 'demo-s3-output-transcript'
S3_BASE_URI = "s3://"
transcribe_client = boto3.client("transcribe")


def lambda_handler(event, context):
    """
    This handler, being invoked on S3 Object Create Events,
    - retrieves the filename and format of the uploaded file,
    - checks the fileformat against the listof supported formats by AWS Transcribe
    - starts transcription
    """

    S3_NAME_INPUT = event['Records'][0]['s3']['bucket']['name']

    filepath = unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )

    # AWS Transcribe requires job_name to contain no whitespace
    job_name = HelperService._sanitize_filepath(filepath)
    file_format = os.path.splitext(filepath)[1][1:].lower()

    if file_format not in LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS:
        log.debug(
            f"Transcription not possible for file: {filepath}. File format '{file_format}' not supported. "
        )
        return


    job_uri = os.path.join(S3_BASE_URI, S3_NAME_INPUT, filepath)

    # start transcribe job
    try:
        transcribe_client.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={"MediaFileUri": job_uri},
            MediaFormat=file_format,
            LanguageCode="en-US",
            OutputBucketName=S3_NAME_OUTPUT,
        )
    except Exception as e:
        log.error(e)
        raise e


class HelperService:

    @staticmethod
    def _sanitize_filepath(filepath: str) -> str:
        return re.sub(r"\W", "_", filepath.lower())


```

The `lambda_handler`-function is being executed when triggered.

    def lambda_handler(`event`, `context`)

    `S3_NAME_INPUT = event['Records'][0]['s3']['bucket']['name']`

    documentation: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html

    `filename = unquote_plus(event["Records"][0]["s3"]["object"]["key"], encoding="utf-8")`

We import logging to have access to log events, which are visible in `AWS Cloudwatch`.



4. **Define The Event Trigger**
We want our Lambda function to run whenever a file is being uploaded to the S3 input bucket. Fortunately, S3 can send out notifications to AWS Lambda for [certain events](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html) among others, *new object created events*, which is what we are going to use.


- **Tab "Function Overview"**
    - click "+ Add trigger" > S3 > Select input bucket (*demo-s3-input-video*) > Event Type: All Create Events,
    - attach newly created role


5. **Test setup**

That's it already. If we have set up the function correctly, we should now be able to trigger it by uploading a video to our input bucket. For this we can either use the Management Console or directly refer to the boto3 client.

```py
filename = '<path-to-our-video-file.mp4>'
s3_filename = path.basename(filename)
s3_client.upload_file(filename, S3_NAME_INPUT, s3_filename)
```

*intuitive > copy S3 file URI* (looks like this: `s3://squirro-testbucket/test_video.mp4`)

log -> cloud watch
*Lambda > Tab: Monitor > Cloudwatch !!!*

 Check Cloudwatch
  - Check Transcribe
  - Check Lambda
  - Check Output Bucket



6. **Cleaning Up**

Let's clean everything up before we finish. This means we will:
- empty both buckets *(same as in previous article)*
- delete the buckets *(same as in previous article)*
- delete the transcription job *(same as in previous article)*
- detach all policies from the lambda role
- delete the lambda role
- delete lambda function
- verify that everything is cleaned up



We use the <code>boto3</code>-clients to efficiently clean up all created resources. For the first three steps we use the same functions as <nuxt-link to="/articles/aws-transcribe">before</nuxt-link>.

```py
delete_bucket_content(s3_client, S3_NAME_INPUT)
delete_bucket_content(s3_client, S3_NAME_OUTPUT)
s3_client.delete_bucket(Bucket=S3_NAME_INPUT)
s3_client.delete_bucket(Bucket=S3_NAME_OUTPUT)

transcribe_client.delete_transcription_job(TranscriptionJobName=transcript_data['jobName'])
```

Boto3 also contains access to the [IAM client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/iam.html#client). First, we get the role using the name we assigned to it earlier.

```py
iam_client = boto3.client(
    "iam",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)
role_name = "lambda_s3_create_transcribe_role"
iam_client.get_role(RoleName=role_name)
```

Next, we detach all policies from the role and delete it.
```py
# detach policies from role
for policy in iam_client.list_attached_role_policies(RoleName=role_name)['AttachedPolicies']:
    policy_arn = policy['PolicyArn']
    iam_client.detach_role_policy(RoleName=role_name, PolicyArn=policy_arn)
iam_client.list_attached_role_policies(RoleName=role_name)
iam_client.delete_role(RoleName=role_name)
```


Now, we can use the [Lambda client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda.html#client) to delete the function.
```py
lambda_client = boto3.client(
    "lambda",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)
lambda_client.delete_function(FunctionName=lambda_function_name)
```

In the last step we manually verify that all resources have been deleted. Next to listing all remaining buckets and transcription jobs, we define two functions that print remaining lambda functions and iam roles respectively.

```py
def print_bucket_list(s3_client) -> None:
    buckets = s3_client.list_buckets()
    for i, bucket in enumerate(buckets.get('Buckets')):
        print(f"{i}: {str(bucket.get('CreationDate').date())} | {bucket.get('Name')}")

def print_transcription_job_list(transcribe_client) -> None:
    transcription_job_list = transcribe_client.list_transcription_jobs()
    for i, transcription_job in enumerate(transcription_job_list.get('TranscriptionJobSummaries')):
        print(f"{i}: {str(transcription_job.get('CreationTime').date())} | {transcription_job.get('TranscriptionJobName')} | {transcription_job.get('TranscriptionJobStatus')}")

def print_lambda_function_list(lambda_client) -> None:
    lambda_function_list = lambda_client.list_functions()
    for i, lambda_function in enumerate(lambda_function_list.get('Functions')):
        print(f"{i}: {str(lambda_function.get('CreationTime').date())} | {lambda_function.get('TranscriptionJobName')} | {lambda_function.get('TranscriptionJobStatus')}")

def print_iam_role_list(iam_client) -> None:
    iam_role_list = iam_client.list_roles()
    for i, iam_role in enumerate(iam_role_list.get('Roles')):
        print(f"{i}: {str(iam_role.get('CreateDate').date())} | {iam_role.get('RoleName')} | {iam_role.get('Description')}")

print_bucket_list(s3_client)
print_transcription_job_list(transcribe_client)
print_lambda_function_list(lambda_client)
print_iam_role_list(iam_client)
```
The output of calling these functions will be either empty or print only those functions that predate our experiment.

This final validation steps demonstrates the convenience which `boto3` provides in accessing a wide variety of services. Altough the interaction with AWS services divergerces on lower levels, the service clients share many high-level similarities like the `list_*`-method which makes it easy to dive into any new service.


## Conclusion and Outlook

In this article, we successfully deployed an AWS Lambda function that automatically transcribes video data on upload to an S3 bucket. That’s it for part 2; I hope it has been helpful.

For a simple MVP this manual deployment of resources is sufficient. However, in many cases we may want to extend on this infrastructure. For instance, we may
- start integrating some complementary services, additional lambda functions, EC2 instances, etc. some of which may not even relate to AWS
- make iterative code changes, from the configuration to the lambda handler function itself
- deploy our resources across different environments, e.g. development, staging, production

This can quickly cause complexity that is difficult to handle manually. In the last part of this series, we will therefore use **Terraform** to efficiently set up and manage all our resources (<NuxtLink to="/articles/aws-transcribe-terraform">part 3</NuxtLink>).




<!--
## References

`[1]`: https://github.com/serverless/examples/tree/master/aws-python

`[3]`: https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove/ -->
