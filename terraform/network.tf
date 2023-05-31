resource "yandex_vpc_network" "network-store" {
    name = "network-store"
}

resource "yandex_vpc_subnet" "subnet-store-1" {
  name           = "subnet-store-1"
  zone           = var.default-zone
  network_id     = yandex_vpc_network.network-store.id
  v4_cidr_blocks = ["10.120.0.0/24"] 
}
