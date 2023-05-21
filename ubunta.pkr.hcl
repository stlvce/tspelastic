source "yandex" "host-app" {
  token               = ""
  folder_id           = ""
  source_image_family = "ubuntu-2004-lts"
  ssh_username        = "admin"
  use_ipv4_nat        = "true"
  image_family        = "ubuntu-2004-lts"
  image_name          = "host-app"
  subnet_id           = ""
  disk_type           = "network-ssd"
  zone                = "ru-central1-a"
}

build {
  sources = ["source.yandex.host-app"]
  provisioner "shell" {
    inline = ["sudo apt-get update",
          "sudo apt-get upgrade",
          "sudo apt install git",
          "sudo apt install nodejs",
          "git clone https://github.com/stlvce/tspelastic.git"]
  }
}