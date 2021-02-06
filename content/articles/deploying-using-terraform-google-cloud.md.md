---
title: How to deploy a web app using terraform with Docker & Github Actions on Google Cloud
description: Guide to deploy your project on Google Cloud
series: dev_ops
repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

img: article/hello.png
alt: THIS IS THE ALT
tags:
  - terraform
  - bootstrap-vue

---
# Introduction
Development is only one part when buildign software. Deployment and maintenance depicts a major hurdle for new comers attempting to ship a product / web application. This post guides you from the state of a containerized web application organized in a docker-compose file to a consistent CI/CD workflow.

```
.
├── api
├── db
├── front
├── ... # other services
├── .env
├── .gitignore
└── docker-compose.yml
```
<small class="text-gray-600">Example project structure. If you don't have a project to work with use the one from the <a href="https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group">example repo</a> for this article</small>


We will use
<ul>
  <li>Terraform for the configuration of all relevant resources,</li>
  <li>Github Actions to define the CI/CD workflow,</li>
  <li>Docker Hub to host our Docker release images, and</li>
  <li>Google Cloud to host our !!!</li>
  <li>Cloudflare !!!</li>
</ul>


If you are familiar with Terraform, Docker, Github Actions, and Google Cloud, you can jump directly to the <NuxtLink to="#guide">Guide</NuxtLink>.
The code repository can be found here.


## Technologies in use

### Terraform
<a href="https://www.terraform.io/">Terraform</a> is infrastructure as code software tool. That is you declare the configuration for the resources you use, such as Github or AWS/Google Cloud in configuration files. Thereby you create the base for fast and consistent setup of these resources and more generally a consistent CI/CD workflow.
Terraform configurations are written as yml files using a special Hashicorp syntax. However, understanding and learning the syntax is not too difficult.

### Github Actions

### Docker Hub

### Google Cloud


# Prerequisites / Services
- <a href="https://docs.docker.com/engine/install/">Docker</a> + <a href="https://docs.docker.com/compose/install/">Docker-Compose</a>


In this article we will create/rely on accounts for the following services:

- <a href="https://github.com/" >Github</a>
- <a href="https://hub.docker.com/">Dockerhub</a>
- <a href="https://cloud.google.com/">Google Cloud</a>

As a single developer you can use the services for free. Google Cloud further provides free credits for new accounts. If you don't have accounts for these services yet, now would be the best time to do.

# Guide


0. Install terraform and upgrade.
First we will set up terraform. Terraform provides different ways to install that can be found in their <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started">official guide</a>.

Install using `brew` as follows:

```bash
brew tap hashicorp/tap && \
brew install hashicorp/tap/terraform && \
brew upgrade hashicorp/tap/terraform #upgrade to latest version
```

1. Initialize Terraform project

```bash
mkdir terraform && cd terraform \ #create terraform directory in project root and go to directory
terraform init #initialize terraform project
```

2. Setting up terraform base structure
Inside the <i>terraform directory</i> we create the following files and sub-directories: <br>
- <code class="bg-gray-800 text-gray-100 rounded p-1">main.tf</code> The main configuration file, defining providers
- <code class="bg-gray-800 text-gray-100 rounded p-1">variables.tf</code> Defines all variables used across configuration files. Click <a href="https://learn.hashicorp.com/tutorials/terraform/variables?in=terraform/configuration-language&utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS">here</a> for details on Terraform variables.
- <code class="bg-gray-800 text-gray-100 rounded p-1">environments</code> Parent dir for environment related configuration files.


```
.
├── api
├── db
├── front
├── ... # other services
├── terraform
│   ├── environments
│   ├── main.tf
│   └── variables.tf
├── .env
├── .gitignore
└── docker-compose.yml
```

3. Github Configuration

Next we use Terraform to configure a new Github repository for our project including necessary secrets to execute the intended workflows on other services.
In terraform plugins called "providers" allow us to interact with remote systems, such as Github. In order to use these, we need to declare them and – depending on the provider provide some base configuration. See <a href="https://www.terraform.io/docs/language/providers/configuration.html>

<a href="https://terraform.io">Terraform.io</a> provides extensive documentation for all providers.
Therefore we define a Github provider (also see <a href="https://registry.terraform.io/providers/integrations/github/latest/docs/resources/repository">documentation</a>)

```tf[main.tf]
terraform {
    required_providers {
        github = {
            source  = "integrations/terraform-provider-github"
            version = "~> 4.3" # checkout the current version during your implementation
        }
    }
}
```

We configure each provider in a separate configuration file to separate concerns and a better overview.
We create a new configuration file 'github.tf' (`touch github.tf`) and add the following code:
```tf[github.tf]
# Configure the GitHub Provider
provider "github" {
  token = var.github_token
  owner = <enter-your-github-account-id>
}

resource "github_repository" "test_repo" {
  name        = "test_repo"
  description = "Main Repo for Shyp"

  private = true
  visibility  = "private" #visibility overrides private

  template {
    owner = "github"
    repository = "terraform-module-template"
  }
}

data "github_actions_public_key" "example_public_key" {
  repository = github_repository.test_repo.name
}

resource "github_actions_secret" "DOCKER_HUB_USERNAME" {
  repository       = github_repository.test_repo.name
  secret_name      = "DOCKER_HUB_USERNAME"
  plaintext_value  = "test_repo_key"
}

```



1. Login & Create new access token
In order to provide Github Action to access docker hub later in the process, we create access credentials and add them secrets to Github.
We can create a new access token by clicking
we created a PAT and added it to GitHub to ensure we can access Docker Hub from any workflow.


## Setup Github
0. Create an account on <a href="https://github.com/">Github</a>

1. Create Terraform configuration file for new Github repository
We `cd`into terraform














- Create Project on GCP
- Get key for GCP Credentials
- Store key in terraform dir
- Add credentials to $PATH:
  `export GOOGLE_APPLICATION_CREDENTIALS=$PWD/terraform/terraform-sa-key.json`
  verify: echo $GOOGLE_APPLICATION_CREDENTIALS` should print path

- Setup gcloud
- Enabling APIs
```vue[FooComponent.vue]
gcloud services enable \
    cloudresourcemanager.googleapis.com \
    compute.googleapis.com \
    iam.googleapis.com \
    oslogin.googleapis.com \
    servicenetworking.googleapis.com \
    sqladmin.googleapis.com
```
- Provide rights to terraform
In console: https://console.cloud.google.com/iam-admin
<b-img src="~/assets/images/iam_g_cloud_terraform.png" />

- Terraform plan


- Terraform apply
(if terraform apply fails, try: `gcloud auth application-default login` (cfr. <a href="https://github.com/GoogleCloudPlatform/kubernetes-engine-samples/issues/10">ref</a>, <a href="https://cloud.google.com/sdk/gcloud/reference/auth/application-default/">official docs</a>)



<small class="text-gray-600">The number of cards displayed per row can be adjusted by changing the column values per size in the  component.</small>

That’s it already and I hope it has been helpful.


# Github Actions
