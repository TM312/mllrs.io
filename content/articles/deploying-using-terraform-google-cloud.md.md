---
title: How to deploy a web app in Docker with Terraform & Github Actions on Google Cloud
description: Guide to deploy your project on Google Cloud
series: dev_ops
repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

img: article/hello.png
alt: THIS IS THE ALT
tags:
  - terraform
  - docker
  - github_actions
  - google_cloud

---
# Introduction
Development is only one part when buildign software. Deployment and maintenance depicts a major hurdle for new comers attempting to ship a product / web application. This post guides you from the state of a containerized web application organized in a docker-compose file to a consistent CI/CD workflow. The core idea behind this approach is reduce the amount of manual setup and commands to a minimum.
Our project is going to have two distinct environments, a <i>staging</i> and a <i>production</i> environment.

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
<ul class="list-disc">
  <li><i>Terraform</i> for the configuration of all relevant resources,</li>
  <li>a <i>Makefile</i> to store terminal commands.
  <li><i>Github Actions</i> to define the CI/CD workflow,</li>
  <li><i>Docker Hub</i> to host our Docker release images, and</li>
  <li><i>Google Cloud</i> to host our !!!</li>
  <li><i>Cloudflare</i> !!!</li>
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
<ul class="list-disc">
  <li><a href="https://docs.docker.com/engine/install/">Docker</a> + <a href="https://docs.docker.com/compose/install/">Docker-Compose</a></li>
</ul>


In this article we will create/rely on accounts for the following services:
<ul class="list-disc">
  <li><a href="https://github.com/">Github</a></li>
  <li><a href="https://hub.docker.com/">Dockerhub</a></li>
  <li><a href="https://cloud.google.com/">Google Cloud</a></li>
</ul>
As a single developer you can use the services for free. Google Cloud further provides free credits for new accounts. If you don't have accounts for these services yet, now would be the best time to do.

# Guide

0. Install Terraform and upgrade.
First we will set up terraform. Terraform provides different ways to install that can be found in their <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started">official guide</a>.

Install using `brew` as follows:

```bash
brew tap hashicorp/tap && \
brew install hashicorp/tap/terraform && \
brew upgrade hashicorp/tap/terraform #upgrade to latest version
```

1. Initialize Terraform project

As our first step to integrate Terraform we create a new directory in the project root called <i>terraform</i>.<br>
<small class="text-gray-600">You may use <code class="bg-gray-800 text-gray-100 rounded p-1">mkdir terraform</code> in the terminal to do so.</small>

We use a <a href="https://www.gnu.org/software/make/manual/make.html#Introduction">Makefile</a> to store our commands. This approach is a good way to reduce the amount of manual commands and standardize our deployment process. To start things off, create a file named <i>Makefile</i>.<br>
<small class="text-gray-600">You may use <code class="bg-gray-800 text-gray-100 rounded p-1">touch Makefile</code> in the terminal to do so.</small>

We add the following lines to go to the newly created terraform directory and initialize a workspace for our current environment.

```Makefile[Makefile]
terraform-init:
	cd terraform && \
	terraform workspace select $(ENV) && \
	terraform init
```

<code class="bg-gray-800 text-gray-100 rounded p-1">$(ENV)</code> is an environmental variable we can specify before running any command. By default we want our commands to run on the staging environment. Therefore we add the lines <code class="bg-gray-800 text-gray-100 rounded p-1">ENV=stage</code> to our <i>.env</i> file.

We run the command -> ###!!!!result

2. Setting up Terraform base structure
Inside the <i>terraform directory</i> we create the following files and sub-directories: <br>
<ul class="list-disc">
  <li>The main configuration file, to configure Terraform itself, including providers and and backends.</li>
  <li><code class="bg-gray-800 text-gray-100 rounded p-1">variables.tf</code> Defines all variables used across configuration files. Click <a href="https://learn.hashicorp.com/tutorials/terraform/variables?in=terraform/configuration-language&utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS">here</a> for details on Terraform variables.</li>
  <li><code class="bg-gray-800 text-gray-100 rounded p-1">environments</code> Parent dir for environment related configuration files.</li>
</ul>

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

Next we use Terraform to configure a new Github repository for our project including necessary secrets to execute the intended workflows on other services.<br>
<i class="text-gray-600 pr-20">Note: Terraform can manage the creation and lifecycle of all your GitHub repositories. Terraform will not touch existing GitHub repositories, so it is safe to adopt gradually.</i> <a href="https://www.hashicorp.com/blog/managing-github-with-terraform">src</a>

In terraform plugins called <i>"providers"</i> allow us to interact with remote systems, such as Github. In order to use these, we need to declare them and – depending on the provider provide some base configuration. Check <a href="https://www.terraform.io/docs/language/providers/configuration.html">here</a> for details.

<a href="https://terraform.io">Terraform.io</a> provides extensive documentation for all providers.
Therefore we define a Github provider (also see <a href="https://registry.terraform.io/providers/integrations/github/latest/docs/resources/repository">documentation</a>)

```tf[main.tf]
terraform {
    required_providers {
        github = {
            source  = "integrations/terraform-provider-github"
            version = "~> 4.3" # checkout the current version for your implementation
        }
    }
}
```

We configure each provider in a separate configuration file to separate concerns and a better overview.
In order to interact with our Github account we need to have a Github Access token with the necessary rights. Therefore we log into our account on <a href="https://github.com">Github.com</a>, select 'Settings' -> 'Developer settings' -> 'Personal access token' -> 'Generate new token'. The necessary permissions are 'repo', 'admin:org', and 'delete_repo'.
For details, see <a href="https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token">here</a>.

Now, we can create a new configuration file 'github.tf' (`touch github.tf`) and add the following code:
```tf[github.tf]
# Configure the GitHub Provider
provider "github" {
  token = var.github_token
  owner = var.github_account_id
}

resource "github_repository" "project_repo" {
  name        = "project_repo"
  description = "Main Repo for Project"

  private = true
  visibility  = "private"

  template {
    owner = "github"
    repository = "terraform-module-template"
  }
}

```
#private is false by default. Adjust to your use case.
#visibility overrides private

github_token
github_account_id

In order to access these var.github_token and var.github_account_id we need to add them as variables, for which we have created variables.tf

```tf[variables.tf]
# Github
variable "github_token" {
  description = "Github access token. Will be provided as ENV var."
  type = string
}

variable "github_account_id" {
  description = "Github account id. Will be provided as ENV var."
  type = string
}
```
<p class="mt-2 max-w-4xl text-sm text-gray-500">
We can provide different arguments to each variable, such as description, type or default value for higher code robustness. Read more about Terraform variables <a href="https://www.terraform.io/docs/language/values/variables.html">here</a>
</p>

Finally we add <i>github_token</i>, <i>github_account_id</i> with their respective value as variables to our .env file.

3. Docker Hub Configuration
By now we have defined the remote repository on Github and provided Terraform the necessary rights to interact with this resource through the Access Token.
Likewise we now provide Github with the rights to interact with Docker Hub in the course of our upcoming workflows in the form of a Docker Hub access token.
We can create this token, by logging into our account, and select <i>Account Settings</i> -> <i>Security</i> -> <i>New Access Token</i>. Chose a meaningful description such as '<i>PROJECT_NAME – Github Actions Token</i>'.

Now we can add these secrets to our github configuration:

```tf[github.tf]
...

resource "github_actions_secret" "DOCKER_HUB_USERNAME" {
  repository       = github_repository.project_repo.name
  secret_name      = "DOCKER_HUB_USERNAME"
  plaintext_value  = var.docker_hub_username
}

resource "github_actions_secret" "DOCKER_HUB_ACCESS_TOKEN" {
  repository       = github_repository.project_repo.name
  secret_name      = "DOCKER_HUB_ACCESS_TOKEN"
  plaintext_value  = var.docker_hub_access_token
}

```

Like before, we add the new variables to `variables.tf` and add them to our .env file.


```tf[variables.tf]
# Docker Hub
variable "docker_hub_username" {
  description = "DOcker Hub username. Will be provided as ENV var."
  type = string
}

variable "docker_hub_access_token" {
  description = "DOcker Hub account id. Will be provided as ENV var."
  type = string
}
```






Like before, add the Access Token to your .env file.












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
