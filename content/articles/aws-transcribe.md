---
title: Transcribing video data with AWS Transcribe
slug: aws-transcribe
description: A brief introduction to the AWS ecosystem and boto3.
series: introduction-to-aws-and-lambda
# repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

published: true
img: hello.png
alt: THIS IS THE ALT
tags:
  - terraform
  - AWS

---

## Introduction
This is part 1 of 3 in this series about the AWS ecosystem, lambda, and resource management. In this article we have a look at the AWS service suite and how interact with it through the console UI. Our practical goal is to use AWS speech-to-text service <a href='https://aws.amazon.com/transcribe/'>AWS Transcribe</a> to create transcriptions of video data that has been uploaded to an S3 bucket, AWS web-accessible file storage service. To achieve this, we first use the AWS Management Console, before interacting with the service suite programmatically using the AWS SDK, `boto3`.

To reach our goal we need to **i) create an S3 bucket**, **ii) upload a video file to the bucket**, **iii) create a transcription job**, and finally **iv) checkout the transcript**. Let's get started.


## Prerequisites

In order to use its services, we need to have an AWS account that we can set up [here](https://aws.amazon.com). Every account comes with a free tier that covers the use of all resources we need to reach our goal.

If you don't have [Jupyter Notebook](https://jupyter.org/) installed yet or access to [Google colab](https://colab.research.google.com). You may install either one, as it will be easier to follow along.


## Manual transcription

To reach our goal we need to **i) create an S3 bucket**, **ii) upload a video file to the bucket**, **iii) create a transcription job**, and finally **iv) checkout the transcript**. Let's get started.


1. **Create S3 bucket**

    > Amazon S3 is object storage built to store and retrieve any amount of data from anywhere. It’s a simple storage service that offers industry leading durability, availability, performance, security, and virtually unlimited scalability at very low costs.
    > -- <cite>[AWS S3 FAQs](https://aws.amazon.com/s3/faqs/)</cite>

    In order to create an S3 bucket, we log into the AWS Management Console and select **S3** in the **Service** menu. Here, we click on **Create bucket**.

    <dynamic-image filename='AWSS3.png' article-slug='aws-transcribe' alt='S3 Management Console'></dynamic-image>

    <small>The S3 Management Console menue where we can create a bucket for our video files.</small>

    For our training purposes we simply call this bucket *'demo-s3-input-video'* and select the region in which the bucket will be created. We can proceed by making adjustments in the rest of the configuration but for our testing purposes the default settings are fine.

2. **Upload video file to bucket**

    Uploading the video file works intuitively. We click on the bucket and then on **Upload**. However, we need to consider the data formats that can be processed by AWS Transcribe for the next step.

    > mp3 | mp4 | wav | flac | ogg | amr | webm
    > -- <cite>List of supported formats as taken from the [AWS Transcribe Docs](https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html), last checked: 05-06-2021</cite>


3. **Create transcription job**

    Now, we head over to AWS Transcribe, where we click **Create job**.
    After providing the name for our job, e.g *'demo-transcription-job'*, and language, we now select the video file uploaded earlier to the newly created S3 bucket under **Input Data**. For now, under **Output Data**, we keep the selection as *Service-managed S3 bucket* and click on **Next**.
    This page allows for advanced settings, such as speaker distinction but also to add a vocabulary lists. In general, the quality of the transcript accuracy improves the more details we can provide about the audio.

4. **Check out transcript**

    Once we created the transcription job, the service starts and it may take a couple of seconds/minutes depending on the length of the video before the job is complete.
    We can verify the transcript by clicking on the job and checking the **Transcript preview** section and also download the full transcript as a JSON file.

    This file holds the full transcript but additionally provides timestamps and confidence for each identified token.


AWS Transcribe appears to be a suitable service for speech-to-text conversion. However, if we require more than a one-off solution, we would want to interact with the AWS services programatically.


## AWS SDK – `boto3`

0. **Setup**

    [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) is AWS SDK for Python which provides us with access to S3 and Transcribe.

    We install boto3 using `pip install boto3`.

    Boto3 requires the authentication credentials 'aws_access_key_id' and 'aws_secret_access_key', to access resources through our account. We can create through the AWS IAM service. In the AWS Management Console we select *IAM* in the **Service Menu**. We click on *Users* > *Add user* and select *Programmatic access*. For our purposes we can add the user to Admins by selecting the field, which will provide full access to all available resources.

    *In production systems we would want to restrict its access to only those resources we need. For details, refer to the [official docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console).*

    Once we created the user, we get the necessary credentials, which we can store in a config file. Create/Open the config file using vim via `vi ~/.aws/credentials` and add the following lines

    ```ini
    [default]
    aws_access_key_id = <your-aws-access-key-id>
    aws_secret_access_key = <your-aws-secret-access-key>
    ```

    Now that we are set up, start a [Jupyter Notebook](https://jupyter.org/), [Google Colab](https://colab.research.google.com) or a Python Shell.

1. **Create a S3 bucket**

    First, let's get the S3 client, which allows us to interact with S3.

    ```py
    # get s3 client
    import boto3
    s3_client = boto3.client(
        "s3",
        region_name='<your-region-name, e.g.us-east-1>'
    )

    # if above causes errors we can provide the credentials directly, like
    s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
    )

    ```

    In the [docs](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#client) we can get a good overview of available methods. Boto3 is quite comfortable to work with as the available resources and methods and its behavior are fairly consistent across services.

    We can check the currently available

    ```py
    def print_bucket_list(s3_client) -> None:
        buckets = s3_client.list_buckets()
        for i, bucket in enumerate(buckets.get('Buckets')):
            print(f"{i}: {str(bucket.get('CreationDate').date())} | {bucket.get('Name')}")

    print_bucket_list(s3_client)

    ```





## Conclusion and Outlook



In the following parts of this series, we will

- automate the transcription using AWS Lambda (<NuxtLink to="/about">part 2</NuxtLink>)
- set up and manage our infrastructure using `Terraform` (<NuxtLink to="/about">part 3</NuxtLink>)

While the transcription serves as a common use case, the learnings hopefully extend to a broad range of similar challenges.


That’s it for part 1 and I hope it has been helpful.


<!--
## References

`[1]`: https://github.com/serverless/examples/tree/master/aws-python

`[3]`: https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove/ -->
