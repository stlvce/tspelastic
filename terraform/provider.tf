terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }
}
 
provider "yandex" {
  token     = var.token 
  cloud_id  = var.cloud-id
  folder_id = var.folder-id 
  zone      = var.default-zone
}