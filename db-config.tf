resource "yandex_mdb_mysql_cluster" "db-store" {
  name        = "db-store"
  environment = "PRESTABLE"
  network_id  = yandex_vpc_network.network-store.id

  config { # поменять
    version     = "8.0" 
    resources {
      resource_preset_id = "s2.micro"
      disk_type_id       = "network-ssd"
      disk_size          = 16
    }
    mysql_config = { 
      sql_mode                      = "ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION"
      max_connections               = 100
      default_authentication_plugin = "MYSQL_NATIVE_PASSWORD"
      innodb_print_all_deadlocks    = true

    }
  }
  
  database {
    name  = "db-store"
    owner = "admin"
  }

  user {
    name     = "admin"
    password = var.pswd
    conn_limit = 50
    permission {
      database_name = "db-store"
    }
    # settings = {
    # }
  }

  host {
    zone      = var.default-zone
    subnet_id = yandex_vpc_subnet.subnet-store-1.id
  }
}

output "external_ip_address_vm_1" {
  value = yandex_compute_instance.vm-1.network_interface.0.nat_ip_address
} 