---
title: Deploying Services on AWS Using Terraform
slug: aws-transcribe-terraform
description: A step-by-step guide on how to create an AWS Lambda function that triggers AWS Transcribe whenever new items are uploaded to an S3 bucket.
series: introduction-to-aws-and-lambda
# repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

published: true
img: hello.png
alt: THIS IS THE ALT
tags:
  - AWS
  - python
  - terraform

---

## Introduction
This is part 3 of 3 in a series on AWS, lambda, and resource management. Previously, we learned how to use AWS Transcribe for speech-to-text conversion. Via AWS Lambda we automated the process to transcribe any new video that would be uploaded to an S3 bucket. In this part, we use `Terraform` to prepare all necessary configuration as code and deploy and update the required infrastructure within seconds.

[Terraform](https://www.terraform.io/) is a an open-source tool to configure and manage infrastructure as code. Until now we either used the AWS Management Console or different clients of the AWS SDK, boto3, to manually create the required resources for the automatic transcription. This approach proves useful when testing, for very small applications, or one-off implementations with few changing parameters. However, when an application grows, i.e. more services being added, increasing interactions between those services, and iterative code/configuration changes, managing the required resources can quickly become overwhelming. Terraform allows us to write configuration files for every resource we need and deploys our infrastructure based on these. It also keeps track of the state of deployment and automatically redeploys, changes, or destroys infrastructure when new code or configurations are ready for deployment.

In order to let Terraform manage our Lambda function, we will **i) create a configuration for each resource**, **ii) initialize a terraform project**, **iii) deploy our resources**, and **iv) test our setup** by uploading a video to a hopefully newly created S3 input bucket and checking for a corresponding transcript. Finally, we **v) clean up** everything by destroying all resources used for this demo.


## Prerequisites

To conduct the steps outlined above we need an AWS account with sufficient privileges to create lambda funtions and IAM roles. Using our personal account these privileges are given by default.

Further, we need to install Terraform.Following the <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/aws-get-started">official tutorial</a> we can install it either manually or using `homebrew`:

```bash
#  install the HashiCorp tap
brew tap hashicorp/tap

# install the HashiCorp tap
brew install hashicorp/tap/terraform

# update homebrew
brew update

# update Terraform
brew upgrade hashicorp/tap/terraform

#Verfiy install
terraform -help

# Enable Tab completion
# if not yet existent and using bash
touch ~/.bashrc
# if not yet existent and using zsh
touch ~/.zshrc

terraform -install-autocomplete
```


## Steps

Some of the steps used in this article are identical with those from the <nuxt-link to="/articles/aws-transcribe">first part</nuxt-link> of this series. In these cases detailed explanations are being omitted.

1. **Create A Configuration For Each Resource**




2. **Initialize A Terraform Project**


3. **Deploy Our Resources**


4. **Test Our Setup**


5. **Cleaning Up**


6. **Bonus: Deploy Across Different Environments**

- Create Makefile

    `touch Makefile`

    ```Makefile

    ENV=dev

    # to store config for different environments
    tf-create-workspace:
        cd terraform && \
        terraform workspace new $(ENV)


    tf-init:
        cd terraform && \
        terraform workspace select $(ENV) && \
        terraform init
    ```




## Conclusion and Outlook

In this article, we successfully deployed an AWS Lambda function that automatically transcribes video data on upload to an S3 bucket. That’s it for part 2; I hope it has been helpful.

For a simple MVP this manual deployment of resources is sufficient. However, in many cases we may want to extend on this infrastructure. For instance, we may
- start integrating some complementary services, additional lambda functions, EC2 instances, etc. some of which may not even relate to AWS
- make iterative code changes, from the configuration to the lambda handler function itself
- deploy our resources across different environments, e.g. development, staging, production

This can quickly cause complexity that is difficult to handle manually. In the last part of this series, we will therefore use **Terraform** to efficiently set up and manage all our resources (<NuxtLink to="/about">part 3</NuxtLink>).






<!--
## References

`[1]`: https://github.com/serverless/examples/tree/master/aws-python

`[3]`: https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove/ -->
