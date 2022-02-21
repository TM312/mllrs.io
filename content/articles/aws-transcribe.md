---
title: Transcribing Video Data With AWS Transcribe
slug: aws-transcribe
description: A brief introduction to the AWS ecosystem and boto3.
createdAt: 2021-06-05T00:01:00.000Z
updatedAt: 2021-06-05T00:01:00.000Z
series: intro-to-aws-and-lambda
published: true
img: /article/hello.png
alt: THIS IS THE ALT
tags:
  - AWS
  - Python

---

## Introduction
This is part 1 of 3 in a series on AWS, lambda, and infrastructure management. In this article we have a look at the AWS service suite. Our practical goal is to use AWS' speech-to-text service <a href='https://aws.amazon.com/transcribe/'>AWS Transcribe</a> to create transcriptions of video data that has been uploaded to an S3 bucket, AWS' file storage service. To achieve this, we first use the AWS Management Console before interacting with the service suite programmatically using the AWS SDK, *boto3*.

In pursuing our goal we **i) create an S3 bucket**, **ii) upload a video file to the bucket**, **iii) create a transcription job**, and finally **iv) checkout the transcript**. Let's get started.


## Prerequisites

For this excercise we need an [AWS](https://aws.amazon.com) account. Every account comes with a free tier that covers the use of all resources we need for our context. On top of that we need access to either [Jupyter Notebook](https://jupyter.org/) or access to [Google colab](https://colab.research.google.com) makes it easier to follow along.


## Manual transcription


1. **Create S3 bucket**

In order to create an S3 bucket, we log into the AWS Management Console and select **S3** in the **Service** menu. Here, we click on **Create bucket**.

<dynamic-image filename='AWSS3.png' article-slug='aws-transcribe' alt='S3 Management Console'>The **S3 Management Console** menu where we can create a bucket for our video files.</dynamic-image>

For our training purposes we simply call this bucket *'demo-s3-input-video'* and select the region in which the bucket will be created. We can proceed by making adjustments in the rest of the configuration but for our testing purposes the default settings are fine.

2. **Upload video file to bucket**

Uploading the video file works intuitively. We click on the bucket and then on **Upload**. However, we need to consider the data formats that can be processed by AWS Transcribe for the next step.

> mp3 | mp4 | wav | flac | ogg | amr | webm
> -- <cite>List of supported formats as taken from the [AWS Transcribe Docs](https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html), last checked: 05-06-2021</cite>

We also need to consider that the transcription quality strongly depends on the spoken language and articulation as well as the audio quality. For this excercise we use [a video of Obama speeches](https://www.youtube.com/embed/OFPwDe22CoY), a video from a professional English speaker with good audio quality, to provide good conditions for the transcript itself.
  

3. **Create transcription job**

Now, we head over to the AWS Transcribe service where we click **Create job**.
After providing the name for our job, e.g *'demo-transcription-job'*, and language, we select the video file uploaded earlier to the newly created S3 bucket under **Input Data**. Under **Output Data**, we keep the selection as *Service-managed S3 bucket* for now and click on **Next**.
This page allows for advanced settings, such as speaker distinction but also to add a vocabulary lists. In general, the quality of the transcript accuracy improves the more details we can provide about the audio.

4. **Check out transcript**

Once we have created the transcription job the service starts and it takes a couple of seconds/minutes depending on the length of the video before the job is complete.
We can check the transcript quality by clicking on the job and checking the **Transcript preview** section or download the full transcript as a JSON file. This file holds the full transcript but additionally provides timestamps and confidence for each identified token.

AWS Transcribe appears to be a suitable service for speech-to-text conversion. However, if we require more than a one-off solution, we would want to interact with the AWS services programatically.


## boto3: AWS SDK

0. **Setup**

[Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) is the AWS SDK for Python which provides us with such programmatic access to S3 and Transcribe.

We install boto3 via pip. In Google Collab we can just call `!pip install boto3` directly inside any cell. Outside we would create a virtual environemnt to install the dependency there. For the sole purpose of following along this guide we could run the following commands in the terminal:

```bash
mkdir demo-aws-transcribe
cd demo-aws-transcribe   
python -m venv venv      
source venv/bin/activate
pip install boto3
```
- *line 1* creates our project directory *demo-aws-transcribe*
- in *line 2* we move into the project directoy
- *line 3* creates a virtual environment inside a directory venv
- *line 4* activates the virtual environment
- *line 5* installs boto3

Boto3 requires the authentication credentials *aws_access_key_id* and *aws_secret_access_key*, to access resources through our account. For this we use the AWS IAM service. In the AWS Management Console we select *IAM* in the **Service Menu**. We click on *Users* > *Add user* and select *Programmatic access*. For our purposes we can add the user to Admins by selecting the field, which will provide full access to all available resources.

*In production systems we would want to restrict its access to only those resources we need. For details, refer to the [official docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console).*

Once we have created the user, we get the necessary credentials, which we can store in a config file. Create/Open the config file using vim via <code>vi ~/.aws/credentials</code> and add the following lines

```ini[~/.aws/credentials]
[default]
aws_access_key_id = <your-aws-access-key-id>
aws_secret_access_key = <your-aws-secret-access-key>
```

Now that we are set up, we need [Jupyter Notebook](https://jupyter.org/), [Google Colab](https://colab.research.google.com) or a Python Shell.

1. **Create an S3 bucket**

First, let's get the S3 client, which allows us to interact with S3.

```py
# get s3 client
import boto3
s3_client = boto3.client(
    "s3",
    region_name='<your-region-name, e.g.us-east-1>'
)

# if above causes errors we can provide the credentials directly
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)
```

In the [docs](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#client) we can get a good overview of available methods. Boto3 is quite comfortable to work with as the available resources and methods and their behavior are fairly consistent across services.

We can check if there exist any buckets for this account by using the `list_buckets` method of the <a href='https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.list_buckets'>S3 client</a>: <code>s3_client.list_buckets()</code>.

This returns a dictionary with meta data. The *'Bucket'*-key contains a list of existing buckets and is empty since we haven't yet created any bucket.

For our purpose we create two buckets, one that holds the video files as input and another one which we use to store the output transcripts.

```py
S3_NAME_INPUT = 'demo-s3-input-video'
S3_NAME_OUTPUT = 'demo-s3-output-transcript'

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

Above we use the `create_bucket`-method for each of the two buckets providing a name (key: *Bucket*), location (key: *CreateBucketConfiguration*), and access control list (key: *ACL*). The access control list defines the who can access the bucket and it's objects as well as the type of access, such as read/write. Here, *'private'* refers to one out of a few predefined sets of access permissions. It provides us with full control over the bucket and restricts any other user from access. More details are in the [docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html).

<dynamic-image filename='cannedACL.png' article-slug='aws-transcribe' alt='Overview of AWS Canned ACL'>Overview of provided canned ACLs as of June 2021</dynamic-image>


Let's verify that the two buckets have been created:

```py
def print_bucket_list(s3_client) -> None:
    buckets: list = s3_client.list_buckets()
    for i, bucket in enumerate(buckets.get('Buckets')):
        print(f"{i}: {str(bucket.get('CreationDate').date())} | {bucket.get('Name')}")

print_bucket_list(s3_client)
```

Above we use the same method, <code>s3_client.list_buckets()</code> as before and then print the content of the *'Buckets'* list inside.

We can have a look at the content of the two newly created buckets using the <code>list_objects_v2</code> method:

```py
def print_bucket_content(s3_client, bucket: str) -> None:
    object_list: list = s3_client.list_objects_v2(Bucket=bucket)
    object_count: int = object_list.get('KeyCount')
    print(f"\n{object_list.get('Name')} | Object count: {object_count}")
    if object_count > 0:
        for i, content in enumerate(object_list.get('Contents')):
        print(f"#{i}: {str(content.get('LastModified').date())} | {content.get('Key')}")

print_bucket_content(s3_client, S3_NAME_INPUT)
print_bucket_content(s3_client, S3_NAME_OUTPUT)
```


2. **Upload video file to bucket**

Uploading our video to the video input bucket is straight forward. Using the <code>upload_file</code>-method we specify the input and output path including filename and the bucket we want to upload our file into.

```py
from os import path
filename: str = '<path-to-our-video-file.mp4>'
s3_filename = path.basename(filename)
s3_client.upload_file(filename, S3_NAME_INPUT, s3_filename)
```

Above we split the path to our file and only retrieve the basename as our <code>s3_filename</code>. This will upload the file directly into the root level of the bucket. However, nested directory structures are equally possible inside an S3 bucket.

We can verify the upload by running the <code>print_bucket_function</code> from before.

```py
print_bucket_content(s3_client, S3_NAME_INPUT)
print_bucket_content(s3_client, S3_NAME_OUTPUT)

# Using the sample file and variables provides us with the following output:
"""
demo-s3-input-video | Object count: 1
#0: 2021-06-03 | The Speech that Made Obama President.mp4

demo-s3-output-transcript | Object count: 0
"""
```


3. **Create transcription job**

Next, we prepare our function to create a transcription job. This is going to be a crucial part going forward and so we will perform a few sanity checks before starting the actual transcription.

Our main function should perform the following steps:

- retrieve the filename and format of the uploaded file
- check the format against the list of supported formats from above
- check if the file has been processed before to avoid unneccessary costs and duplicates
- if not it should start a transcription job
- and inform us in case of errors and when the job has been completed.

In the following we will look at each part separately before putting everything <a href="#transcription-handler">together</a>.


Given the filename as input, we can split name and file format.

```py
from os import path

# AWS Transcribe requires job_name to contain no whitespace
job_name = path.splitext(filename)[0].replace(" ", "")
file_format = path.splitext(filename)[1][1:]
```

The validity is a simple check of the file format against a static list of formats supported by AWS Transcribe we can create from the [docs](https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html).

```py

# last checked: 05-06-2021
LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS = [
    "mp3",
    "mp4",
    "wav",
    "flac",
    "ogg",
    "amr",
    "webm",
]

if file_format not in LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS:
    print(
        f"Transcription not possible for file: {filename}. File format '{file_format}' not supported. "
    )
    return
```

So far we have only been interacting with the S3 client. In order to use AWS Transcribe we need to define a separate [client](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/transcribe.html#client), which we can retrieve analogously.


```py
import boto3

transcribe_client = boto3.client(
    "transcribe",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)

def get_job_names(transcribe_client) -> list:
    # get all transcriptions
    transcription_jobs = transcribe_client.list_transcription_jobs()

    job_names = [
        job["TranscriptionJobName"]
        for job in transcription_jobs["TranscriptionJobSummaries"]
    ]

    return job_names

# get list of previous AWS Transcribe job names
try:
    job_names: list = get_job_names(transcribe_client)
except Exception as e:
    print(e)
    raise e

# check if transcript already exists
file_processed: bool = job_name in job_names
```

The response of the <code>list_transcription_jobs</code>-method, is a dictionary that contains the list of jobs in the *'TranscriptionJobSummaries'*-key.

We define <code>file_processed</code> as a Boolean indicating if a job with the same name already exists. If not, we will let the client start a new transcription job for the file.

```py
if not file_processed:
    job_uri = path.join(S3_BASE_URI, S3_NAME_INPUT, filename)

    # start transcription job
    try:
        transcribe_client.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={"MediaFileUri": job_uri},
            MediaFormat=file_format,
            LanguageCode="en-US",
            OutputBucketName=S3_NAME_OUTPUT,
        )
        print('Starting transcription job...')
    except Exception as e:
        print(str(e))
        raise e

    # DO SOMETHING UNTIL JOB COMPLETED...

else:
    print(
        f"'{filename}' has already been processed (job name: {job_name}) and is therefore skipped."
    )
    return 'COMPLETED'
```

To start the transcription we use the <code>start_transcription_job</code>-method. For our demo file we set the language code statically to American English *('en-US')*.

Finally, while running the transcription we regularly check the status of the job. From earlier we have seen that the status will be pending for a while depending on the length of the audio.

```py
from time import sleep

# ... STARTED TRANSCRIPTION JOB
while True:
    result: dict = transcribe_client.get_transcription_job(
        TranscriptionJobName=job_name
    )
    status: str = result["TranscriptionJob"]["TranscriptionJobStatus"]
    if status in [
        "COMPLETED",
        "FAILED",
    ]:
        break
    sleep(10)
    yield status

if result["TranscriptionJob"]["TranscriptionJobStatus"] == "COMPLETED":
    print(f"Transcription Job '{job_name}' completed (file: '{filename}')")

else:
    print(f"Transcription failed at job '{job_name}' (file: '{filename}'")
```

<div id="transcription-handler">Let's put everything together.</div>

```py
import boto3
from os import path
from time import sleep

# list from https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html, last checked: 05-06-2021
LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS = [
    "mp3",
    "mp4",
    "wav",
    "flac",
    "ogg",
    "amr",
    "webm",
]

# transcribe client
# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/transcribe.html#client
transcribe_client = boto3.client(
    "transcribe",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)

def transcription_handler(filename: str, S3_BASE_URI: str, S3_NAME_INPUT: str, S3_NAME_OUTPUT: str) -> dict:
    """
    This handler,
    - retrieves the filename and format of the uploaded file,
    - checks the fileformat against the list of supported formats by AWS Transcribe
    - checks if if file has been processed before
    - if not, starts transcription
    """
    
    # AWS Transcribe requires job_name to contain no whitespace
    job_name: str = path.splitext(filename)[0].replace(" ", "")
    file_format: str = path.splitext(filename)[1][1:]

    if file_format not in LIST_OF_SUPPORTED_TRANSCRIPTION_FILE_FORMATS:
        print(
            f"Transcription not possible for file: {filename}. File format '{file_format}' not supported. "
        )
        return

    # get list of prior AWS Transcribe job names
    try:
        job_names: list = AWSTranscribeSource.get_job_names(transcribe_client)
    except Exception as e:
        print(str(e))
        raise e

    # check if transcript already exists
    file_processed: bool = job_name in job_names

    if not file_processed:
        job_uri: str = path.join(S3_BASE_URI, S3_NAME_INPUT, filename)

        # start transcription job
        try:
            transcribe_client.start_transcription_job(
                TranscriptionJobName=job_name,
                Media={"MediaFileUri": job_uri},
                MediaFormat=file_format,
                LanguageCode="en-US",
                OutputBucketName=S3_NAME_OUTPUT,
            )
            print('Starting transcription job...')
        except Exception as e:
            print(str(e))
            raise e

        # check transcribe job
        while True:
            result: dict = transcribe_client.get_transcription_job(
                TranscriptionJobName=job_name
            )

            # checks if transcription job is done (either as COMPLETED or FAILED)
            status: str = result["TranscriptionJob"]["TranscriptionJobStatus"]
            if status in [
                "COMPLETED",
                "FAILED",
            ]:
                break
            sleep(10)
            yield status

        if result["TranscriptionJob"]["TranscriptionJobStatus"] == "COMPLETED":
            print(f"Transcription Job '{job_name}' completed (file: '{filename}')")

        else:
            print(f"Transcription failed at job '{job_name}' (file: '{filename}'")

    else:
        print(
            f"'{filename}' has already been processed (job name: {job_name}) and is therefore skipped."
        )
        return 'COMPLETED'


class AWSTranscribeSource:
    @staticmethod
    def get_job_names(transcribe_client) -> list:
        # all the transcriptions
        transcription_jobs = transcribe_client.list_transcription_jobs()

        # list comprehension for job names in transcription_jobs
        job_names = [
            job["TranscriptionJobName"]
            for job in transcription_jobs["TranscriptionJobSummaries"]
        ]

        return job_names

```

We can now run the function to start the transcription. We use a for loop to retrieve regular status updates that are yielded from within the function.

```py
from datetime import datetime
S3_BASE_URI = "s3://"

start_time = datetime.now()
for status in transcription_handler(s3_filename, S3_BASE_URI, S3_NAME_INPUT, S3_NAME_OUTPUT):
    timespan = round((datetime.now() - start_time).total_seconds(), 2)
    print(f"{timespan}s ...{status.replace('_', ' ')}")
```

4. **Check out transcript**

We can verify that the transcription was completed by listing all transcription jobs.

```py
def print_transcription_job_list(transcribe_client) -> None:
    transcription_job_list = transcribe_client.list_transcription_jobs()
    for i, transcription_job in enumerate(transcription_job_list.get('TranscriptionJobSummaries')):
        print(f"{i}: {str(transcription_job.get('CreationTime').date())} | {transcription_job.get('TranscriptionJobName')} | {transcription_job.get('TranscriptionJobStatus')}")

print_transcription_job_list(transcribe_client)
```

Both buckets should now contain files and so we rerun the `print_bucket_content`-function from earlier.

```py
print_bucket_content(s3_client, S3_NAME_INPUT)
print_bucket_content(s3_client, S3_NAME_OUTPUT)

    # Using the sample file and variables provides us with the following output:
"""
demo-s3-input-video | Object count: 1
#0: 2021-06-03 | The Speech that Made Obama President.mp4

demo-s3-output-transcript | Object count: 2
#0: 2021-06-03 | .write_access_check_file.temp
#1: 2021-06-03 | TheSpeechthatMadeObamaPresident.json
"""
```

The JSON-file within the output bucket contains the transcript. Removing whitespace from the original filename was a naming condition by AWS Transcribe.

We use the `json` module to retrieve the transcript content.


```py
import json

def get_transcript(transcription_job_name: str) -> dict:
    #see also last response at [Stackoverflow](https://stackoverflow.com/questions/31976273/open-s3-object-as-a-string-with-boto3)
    s3_key = transcription_job_name + ".json"
    transcript_object = s3_client.get_object(Bucket=S3_NAME_OUTPUT, Key=s3_key)
    transcript_data = json.loads(transcript_object['Body'].read().decode('utf-8'))
    return transcript_data

transcript_data = get_transcript('TheSpeechthatMadeObamaPresident')

print(transcript_data.keys())
print(transcript_data['results'].keys())

#OUPUT
"""
dict_keys(['jobName', 'accountId', 'results', 'status'])
dict_keys(['transcripts', 'items'])
"""
```

As we can see the transcript is a dictionary that contains meta data similar to the one seen before.
The transcript itself is inside the *results* key.

We retrieve the full transcript as <code>transcript_data['results']['transcripts'][0]['transcript']</code>.

```py
print(transcript_data['results']['transcripts'][0]['transcript'])

# Using the sample file and variables provides us with the following output:
"""
Barack Obama in 2004 was totally unknown. 
People were saying, I don't know who this guy is, I wonder why they picked him. 
He had a reputation as a bit of an upstart, as sort of a young rising figure in the party, but no one knew who this guy was. 
This was his chance to introduce himself to people. 
Tonight is a particular honor for me because let's face it, my presence on this stage is pretty unlikely. 
Yeah. [...]
"""
```

However, especially when integrating our transcript into a data pipeline the *items* key might be preferred as it contains timestamp information for every token of the transcript. It also provides information about transcription confidence which can be used to define custom vocabulary.

```py
print(transcript_data['results']['items'])

# Using the sample file and variables provides us with the following output:
"""
[{'alternatives': [{'confidence': '1.0', 'content': 'Barack'}],
  'end_time': '20.2',
  'start_time': '19.74',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '0.996', 'content': 'Obama'}],
  'end_time': '20.63',
  'start_time': '20.2',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '1.0', 'content': 'in'}],
  'end_time': '20.77',
  'start_time': '20.63',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '0.97975', 'content': '2004'}],
  'end_time': '21.96',
  'start_time': '20.77',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '1.0', 'content': 'was'}],
  'end_time': '23.04',
  'start_time': '22.64',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '1.0', 'content': 'totally'}],
  'end_time': '23.68',
  'start_time': '23.05',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '1.0', 'content': 'unknown'}],
  'end_time': '24.44',
  'start_time': '23.69',
  'type': 'pronunciation'},
 {'alternatives': [{'confidence': '0.0', 'content': '.'}],
  'type': 'punctuation'},
  # [...]
  ]
"""
```



6. **Cleaning Up**

Let's clean everything up before we finish. This means we will:
- empty both buckets
- delete them
- delete the transcription job
- verify that everything is cleaned up

The respective boto3-clients can take care of that.

```py
def delete_bucket_content(s3_client, bucket: str) -> None:
    file_list = s3_client.list_objects_v2(Bucket=bucket)
    if 'Contents' in file_list.keys():
        for file in file_list['Contents']:
        try:
            s3_client.delete_object(
            Bucket=bucket,
            Key=file['Key']
            )
            print(f"Successfully deleted {file['Key']}.")
        except Exception as e:
            print(e)
            raise e

    else:
        print(f'Bucket {S3_NAME_INPUT} already empty.')

delete_bucket_content(s3_client, S3_NAME_INPUT)
delete_bucket_content(s3_client, S3_NAME_OUTPUT)
s3_client.delete_bucket(Bucket=S3_NAME_INPUT)
s3_client.delete_bucket(Bucket=S3_NAME_OUTPUT)

transcribe_client.delete_transcription_job(TranscriptionJobName=transcript_data['jobName'])

```

First, we delete the bucket content by listing its content and deleting every file we retrieve. Deleting the buckets then works out of the box. We can retrieve the transcription job name used by AWS Transcribe directly from the transcript dictionary.

```py
print_bucket_list(s3_client)
print_transcription_job_list(transcribe_client)
```

Calling functions from earlier verifies that the buckets including their content and the transcription job have been succesfully deleted.


## Conclusion and Outlook

Nice, we successfully retrieved the transcript of our uploaded video. We did so using AWS Transcribe initially via the Management Console and before leveraging *boto3* for programatic interactions.
That’s it for part 1 and I hope it has been helpful.

In the following parts of this series, we will

- set a automated trigger for the transcription using **AWS Lambda** (<NuxtLink to="/articles/aws-transcribe-lambda">part 2</NuxtLink>). This allows us to instantly transcribe every new video that is being put into our S3 input bucket.
- use **Terraform** to set up and manage our infrastructure (<NuxtLink to="/articles/aws-transcribe-terraform">part 3</NuxtLink>). Building on this approach we can automate our code and resource deployment. 