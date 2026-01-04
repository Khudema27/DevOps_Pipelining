terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# -----------------------------
# S3 Bucket
# -----------------------------
resource "aws_s3_bucket" "my_bucket" {
  bucket = "khuda-devops-terraform-bucket-12345"

  tags = {
    Name        = "TerraformBucket"
    Environment = "Dev"
  }
}

# -----------------------------
# EC2 Instance
# -----------------------------
resource "aws_instance" "my_ec2" {
  ami           = "ami-0c02fb55956c7d316" # Amazon Linux 2 (us-east-1)
  instance_type = "t2.micro"

  tags = {
    Name = "Terraform-EC2"
  }
}
