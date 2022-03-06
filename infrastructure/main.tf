terraform {
  required_version = ">= 1.0.0"
  backend "gcs" {
    prefix = "tfstate/v1"
  }
}

## project ##
provider "google" {
  project = var.gcp_project_id
  region  = var.primary_region
}

locals {
  backend_app_name  = "rakucia-server"
}

# Cloud Run のデプロイで利用するArtifact Registry のリポジトリ
module "artifact-registry" {
  source                     = "./modules/artifact-registry"
  gcp_project_id             = var.gcp_project_id
  artifact_registry_location = var.primary_region
  backend_app_name           = local.backend_app_name
}

# Cloud SQL
module "cloud-sql" {
  source        = "./modules/cloud-sql"
  target_region = var.primary_region
}

# Cloud Build
# マイグレーション＋バックエンドデプロイ
module "cloud-build" {
  source                      = "./modules/cloud-build"
  gcp_project_id              = var.gcp_project_id
  region                      = var.primary_region
  cloudsql_instance_full_name = module.cloud-sql.database_connection_name
  backend_app_name            = local.backend_app_name
  github_owner                = "NIT-Toba-Hackathon2022"
  github_app_repo_name        = "RAKUCIA-server"
}
