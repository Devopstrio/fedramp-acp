provider "azurerm" {
  features {}
}

# --- Compliance Foundation (Azure Government) ---

resource "azurerm_resource_group" "acp" {
  name     = "rg-${var.project_name}-foundation-${var.environment}"
  location = var.location
}

# --- Regulated Control Plane (AKS) ---

resource "azurerm_kubernetes_cluster" "acp_k8s" {
  name                = "aks-${var.project_name}-control-plane-${var.environment}"
  location            = azurerm_resource_group.acp.location
  resource_group_name = azurerm_resource_group.acp.name
  dns_prefix          = "fedramp-acp-k8s"

  default_node_pool {
    name       = "acppool"
    node_count = 3
    vm_size    = "Standard_D4s_v3"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }
}

# --- Institutional Artifact Store (Postgres) ---

resource "azurerm_postgresql_flexible_server" "acp" {
  name                   = "psql-${var.project_name}-metadata-${var.environment}"
  resource_group_name    = azurerm_resource_group.acp.name
  location               = azurerm_resource_group.acp.location
  version                = "13"
  administrator_login    = "acpadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2ds_v4"
}

# --- Compliance Secrets & Evidence (Key Vault) ---

resource "azurerm_key_vault" "acp" {
  name                        = "kv-fedramp-acp-${var.environment}"
  location                    = azurerm_resource_group.acp.location
  resource_group_name         = azurerm_resource_group.acp.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = true # High priority for federal

  sku_name = "standard"
}

# --- Storage for SSP Artifacts & Evidence ---

resource "azurerm_storage_account" "acp_evidence" {
  name                     = "stacpevidence${var.environment}"
  resource_group_name      = azurerm_resource_group.acp.name
  location                 = azurerm_resource_group.acp.location
  account_tier             = "Standard"
  account_replication_type = "GRS" # Multi-region for federal
  enable_https_traffic_only = true
  min_tls_version          = "TLS1_2"
}
