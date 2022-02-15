---
title: How to deploy a web app in Docker with Terraform & Github Actions on Google Cloud for scale
description: Guide to deploy your project on Google Cloud
series: dev_ops
repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group


published: false
img: hello.png
alt: THIS IS THE ALT
# tags:
#   - terraform
#   - docker
#   - github_actions
#   - google_cloud

---

## Introduction
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
<small>Example project structure. If you don't have a project to work with use the one from the <a href="https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group">example repo</a> for this article</small>


We will use
<ol>
    <li><i>Terraform</i> for the configuration of all relevant resources</li>
    <li>a <i>Makefile</i> to store terminal commands</li>
    <li><i>Github Actions</i> to define the CI/CD workflow</li>
    <li><i>Docker Hub</i> to host our Docker release images, and</li>
    <li><i>Google Cloud</i> to host our !!!</li>
    <li><i>Cloudflare</i> !!!</li>
</ol>



If you are familiar with Terraform, Docker, Github Actions, and Google Cloud, you can jump directly to the <NuxtLink to="#guide">Guide</NuxtLink>.
The code repository can be found here.


## Technologies in use

adasdd

<ul>
  <li>

    Terraform
    <a href="https://www.terraform.io/">Terraform</a> is infrastructure as code software tool. That is you declare the configuration for the resources you use, such as Github or AWS/Google Cloud in configuration files. Thereby you create the base for fast and consistent setup of these resources and more generally a consistent CI/CD workflow.
    Terraform configurations are written as yml files using a special Hashicorp syntax. However, understanding and learning the syntax is not too difficult.

  </li>


  <li>Github Actions</li>

  <li>Docker Hub</li>

  <li>Google Cloud</li>

</ul>


## Prerequisites / Services
<ul class="list-disc">
  <li>`gsutil`: Which we will use to access Google Cloud Storage from a script. If you don't have it yet, click <a href="https://cloud.google.com/storage/docs/gsutil_install">here</a> to set it up.</li>
  <!-- <li><a href="https://docs.docker.com/engine/install/">Docker</a> + <a href="https://docs.docker.com/compose/install/">Docker-Compose</a></li> -->
</ul>


In this article we will create/rely on accounts for the following services:
<ul class="list-disc">
  <li><a href="https://github.com/">Github</a></li>
  <li><a href="https://hub.docker.com/">Dockerhub</a></li>
  <li><a href="https://cloud.google.com/">Google Cloud</a></li>
</ul>
As a single developer you can Github and Docker Hub for free. Google Cloud further provides free credits for new accounts. The costs incurred after using the credits for the setup we will create will be at <i>~ !!!/month</i> for a typical project.

If you don't have accounts for these services yet, now would be a good time to create them. Later on, we will create access keys for Terraform to interact with each service.


## Guide

### Install Terraform and upgrade.
First, we will set up terraform. Terraform provides different ways to install that can be found in their <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started">official guide</a>.

Install using `brew` as follows:

```bash

brew tap hashicorp/tap && \
brew install hashicorp/tap/terraform && \
brew upgrade hashicorp/tap/terraform #upgrade to latest version

```

### Initialize Terraform project

As our first step to integrate Terraform we create a new directory in the project root called <i>terraform</i>.<br>
<small class="text-gray-600">You may use `mkdir terraform` in the terminal to do so.</small>

We use a <a href="https://www.gnu.org/software/make/manual/make.html#Introduction">Makefile</a> to store our commands. This approach is a good way to reduce the amount of manual commands and standardize our deployment process. To start things off, create a file named <i>Makefile</i>.<br>
<small class="text-gray-600">You may use `touch Makefile`in the terminal to do so.</small>

We add the following lines to go to the newly created terraform directory and initialize a workspace for our current environment.

```Makefile[Makefile]
terraform-init:
	cd terraform && \
	terraform workspace select $(ENV) && \
	terraform init
```

`$(ENV)` is an environmental variable we can specify before running any command. By default we want our commands to run on the staging environment. Therefore we add the lines `ENV=stage` to our *.env* file.

We run the command -> ###!!!!result

### Introduction to Terraform file structure setup

Inside the *terraform directory* we create the following files and sub-directories:

<ul>

  - `main.tf` The main configuration file, to configure Terraform itself, including providers and and backend.
  - `variables.tf` Defines all variables used across configuration files. Click <a href="https://learn.hashicorp.com/tutorials/terraform/variables?in=terraform/configuration-language&utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS">here</a> for details on Terraform variables.
  - `environments`Parent dir for environment related configuration files.<br>
  - `common.tfvars` holds all variables that are shared across environment, such as the name of our application, or domain. <br>
  - `stage/prod` hold environment specific variables such as the database type or Google Compute machine type.<br>

</ul>

```
.
├── api
├── db
├── front
├── ... # other services
├── terraform
│   ├── environments
│   │   ├── prod
│   │   ├── stage
│   │   └── common.tfvars
│   ├── main.tf
│   └── variables.tf
├── .env
├── .gitignore
├── .dockerignore
└── docker-compose.yml

```


### Setting up a remote Terraform backend on Google Cloud

We add a backend to define where Terraform stores the state about the configured resources. Before running any operation Terraform retrieves the infrastructure state as a reference. By default state would be stored in a local file named `terraform.tfstate`. However, we can easily set it up in a remote environment in a storage bucket on Google Cloud, which does not incur any significant costs but is a more secure and robust setup in case multiple developers work on the project. For more details check <a href="https://www.terraform.io/docs/language/state/index.html">here</a>.

The first thing we do is setting up a new project. Here, we enter a name for our project and after clicking on create we retrieve a <i>project id</i>. This project id is important as we will later use it to reference to our project from within our Terraform configuration files.
<!-- <img :src="gcp_new_project.png" /> -->




In order for Terraform to interact with Google Cloud, we need to provide it with the necessary permissions from within our account.
Therefore we log in and go to <a href="https://console.cloud.google.com/iam-admin"><i>IAM & Admin</i></a> --> <i>Service Accounts</i> --> <i>Create Service Account</i> and create a new service account.

In the form we can use <i>terraform-sa</i> as our *Service account name* (whatever you choose just make sure that you know what it means if you need to make changes in the future.) and provide the account with <i>Storage Object Admin</i> permissions.<br>

We download the created key as a JSON file. This is the first of multiple keys that we need to store securely to provide Terraform and Github with the necessary permissions to make actions.


In the *Google Provider Configuration Reference* on Terraform.io we find guidance on how to use the key:

<blockquote cite="https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference">If you are running terraform outside of Google Cloud, generate a service account key and set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of the service account key. Terraform will use that key for authentication.</blockquote>

To keep our key secure we can add `*key.json` to both `.dockerignore` and `.gitignore`.

For further details, see <a href="https://cloud.google.com/docs/authentication/getting-started">Google's Authentication Guide</a>



Following the principle to reduce manual input, we add a command for creating a new bucket on Google Cloud to our *Makefile*.

```Makefile[Makefile]
# create Google Cloud storage bucket
create-tf-backend-bucket:
	gsutil mb -p $(PROJECT_ID) gs://$(PROJECT_ID)-terraform

```
<small>In a similar fashion you may add commands to create further buckets required by your app, for instance to store user assets.</small>

We run the command as <code class="bg-gray-800 text-gray-100 rounded p-1">make create-tf-backend-bucket</code>

We define our state to be stored in the newly created bucket on Google Cloud Storage with the following lines:

```tf[main.tf]

terraform {
    backend "gcs" {
      bucket = "${{ var.project_id }}-terraform"
      prefix = "state/${{ var.project_id }}"
    }
}

```

For more details check <a href="https://www.terraform.io/docs/language/settings/backends/gcs.html">here</a>.

By now we have created a bucket and defined it as our Terraform backend to store state for our application. Each backend belongs to at least one workspace. By default this is the "default" workspace. In our case, however, we want to manage state for two workspaces, i.e. our staging and production environments. GCS backends support multiple workspaces in a single configuration. In our case, staging and production can be deployed as separate instances.

To create separate workspaces we can add the following command to our *Makefile*.

```Makefile[Makefile]

# to store config for different environments
terraform-create-workspace:
	cd terraform && \
	terraform workspace new $(ENV)

```

For additional details, see <a href="https://www.terraform.io/docs/language/state/workspaces.html">here</a>.



!!! Object verionsing ??? as described in linked article above



### Github Configuration

Next we use Terraform to configure a new Github repository for our project including necessary secrets to execute the intended workflows on other services.<br>
<i class="text-gray-600 pr-20">Note: Terraform can manage the creation and lifecycle of all your GitHub repositories. Terraform will not touch existing GitHub repositories, so it is safe to adopt gradually.</i><br>
<a href="https://www.hashicorp.com/blog/managing-github-with-terraform">src</a>

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
<p class="mt-2 max-w-4xl text-sm text-gray-500">We can provide different arguments to each variable, such as description, type or default value for higher code robustness. Read more about Terraform variables <a href="https://www.terraform.io/docs/language/values/variables.html">here</a></p>

Finally we add *github_token*, *github_account_id* with their respective value as variables to our .env file.

### Docker Hub Configuration
By now we have defined the remote repository on Github and provided Terraform the necessary rights to interact with this resource through the Access Token.
Likewise we now provide Github with the rights to interact with Docker Hub in the course of our upcoming workflows in the form of a Docker Hub access token.
We can create this token, by logging into our account, and select <i>Account Settings</i> -> <i>Security</i> -> <i>New Access Token</i>. Chose a meaningful description such as *'PROJECT_NAME – Github Actions Token'*.

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
<!-- <img :src="iam_g_cloud_terraform.png" /> -->

- Terraform plan


- Terraform apply
(if terraform apply fails, try: `gcloud auth application-default login` (cfr. <a href="https://github.com/GoogleCloudPlatform/kubernetes-engine-samples/issues/10">ref</a>, <a href="https://cloud.google.com/sdk/gcloud/reference/auth/application-default/">official docs</a>)



<small class="text-gray-600">

The number of cards displayed per row can be adjusted by changing the column values per size in the  component.

</small>

## References
- Sid Palas – DevOps Crash Course<a href="https://www.youtube.com/watch?v=OXE2a8dqIAI">source</a>
-

That’s it already and I hope it has been helpful.
