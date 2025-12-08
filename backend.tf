terraform {
  backend "s3" {
    bucket = "ellibro-terraform"
    key    = "github/terraform.tfstate"
    region = "us-east-1"
  }
}