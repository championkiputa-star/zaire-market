-- ==========================================================
-- BASE DE DONNÉES : ZAÏRE-MARKET
-- Marketplace Congolaise multi-vendeurs
-- Encodage : UTF-8 (utf8mb4_unicode_ci)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `zaire_market`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `zaire_market`;

-- --------------------------------------------------------
-- Table : users
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `city` VARCHAR(80) DEFAULT 'Kinshasa',
  `role` ENUM('client', 'vendeur', 'admin', 'super_admin') NOT NULL DEFAULT 'client',
  `status` ENUM('active', 'suspended', 'blocked', 'pending') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : categories (Inspirées de la référence e-commerce)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `icon` VARCHAR(50) NOT NULL DEFAULT 'fa-tags',
  `description` VARCHAR(255) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : products
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(50) NOT NULL,
  `seller_id` VARCHAR(50) NOT NULL,
  `seller_name` VARCHAR(120) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(100) NOT NULL,
  `city` VARCHAR(80) NOT NULL DEFAULT 'Kinshasa',
  `image` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('disponible', 'suspendu', 'epuise', 'archive') NOT NULL DEFAULT 'disponible',
  `views_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`),
  INDEX `idx_city` (`city`),
  INDEX `idx_seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : orders
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `customer_name` VARCHAR(120) NOT NULL,
  `customer_phone` VARCHAR(30) DEFAULT NULL,
  `shipping_city` VARCHAR(80) NOT NULL DEFAULT 'Kinshasa',
  `shipping_address` VARCHAR(255) DEFAULT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'Cash à la livraison',
  `status` ENUM('Nouvelle', 'En traitement', 'Expédiée', 'Livrée', 'Suspendue', 'Annulée') NOT NULL DEFAULT 'Nouvelle',
  `payment_status` ENUM('En attente', 'Payé', 'Échoué', 'Remboursé') NOT NULL DEFAULT 'En attente',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_order_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : order_items
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `order_id` VARCHAR(50) NOT NULL,
  `product_id` VARCHAR(50) NOT NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : administrators & permissions
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `administrators` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'super_admin') NOT NULL DEFAULT 'admin',
  `permissions` TEXT NULL COMMENT 'JSON array des permissions',
  `status` ENUM('active', 'suspended', 'blocked') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table : activity_logs
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` VARCHAR(50) NOT NULL,
  `user_email` VARCHAR(150) NOT NULL DEFAULT 'Système',
  `action` VARCHAR(255) NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_log_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- INSERTION DES CATÉGORIES (Conformes aux captures modèles)
-- ==========================================================
INSERT INTO `categories` (`name`, `slug`, `icon`, `sort_order`) VALUES
('Agriculture & Nourriture', 'agriculture-nourriture', 'fa-seedling', 1),
('Vêtement & Accessoires', 'vetement-accessoires', 'fa-shirt', 2),
('Habits de Différentes Marques', 'habits-de-differentes-marques', 'fa-tags', 3),
('Arts & Métiers', 'arts-metiers', 'fa-gem', 3),
('Pièces & Accessoires d\'Auto et de Moto', 'pieces-auto-moto', 'fa-car-side', 4),
('Sacs, Valises & Boîtes', 'sacs-valises-boites', 'fa-bag-shopping', 5),
('Produits Chimiques', 'produits-chimiques', 'fa-flask', 6),
('Produits Informatiques', 'produits-informatiques', 'fa-laptop', 7),
('Construction & Décoration', 'construction-decoration', 'fa-trowel-bricks', 8),
('Électroniques de Consommation', 'electroniques-consommation', 'fa-mobile-screen-button', 9),
('Électricité & Électronique', 'electricite-electronique', 'fa-bolt', 10),
('Meuble', 'meuble', 'fa-couch', 11),
('Santé & Hygiène', 'sante-hygiene', 'fa-notes-medical', 12),
('Équipement Industriel & Composants', 'equipement-industriel', 'fa-gears', 13),
('Instruments & Compteurs', 'instruments-compteurs', 'fa-gauge-high', 14),
('Industrie Légère & Articles d\'Usage Courant', 'industrie-legere', 'fa-utensils', 15),
('Luminaire & Éclairage', 'luminaire-eclairage', 'fa-lightbulb', 16),
('Machinerie de Fabrication & de Façonnage', 'machinerie-fabrication', 'fa-tractor', 17),
('Métallurgie, Minéral & Énergie', 'metallurgie-mineral-energie', 'fa-cubes-stacked', 18),
('Fournitures de Bureau', 'fournitures-de-bureau', 'fa-calculator', 19),
('Emballage & Impression', 'emballage-impression', 'fa-box-open', 20),
('Sécurité & Protection', 'securite-protection', 'fa-shield-halved', 21),
('Service', 'service', 'fa-bell-concierge', 22),
('Sports & Loisirs', 'sports-loisirs', 'fa-volleyball', 23),
('Textile', 'textile', 'fa-scroll', 24),
('Outils & Quincaillerie', 'outils-quincaillerie', 'fa-wrench', 25),
('Jouets', 'jouets', 'fa-shapes', 26),
('Transport', 'transport', 'fa-truck-front', 27)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- ==========================================================
-- SUPER ADMIN PAR DÉFAUT
-- ==========================================================
INSERT INTO `administrators` (`id`, `name`, `email`, `password`, `role`, `permissions`, `status`)
VALUES (
  'SUPER-ADMIN-001',
  'Shams Cherubin',
  'shamscherubin@gamil.com',
  '0907069115',
  'super_admin',
  '["users","products","categories","orders","payments","reports","support","statistics","logs"]',
  'active'
) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `email`=VALUES(`email`), `password`=VALUES(`password`);

-- ==========================================================
-- DONNÉES DE DÉMONSTRATION (PRODUITS)
-- ==========================================================
-- --------------------------------------------------------
-- Insertion des 93 Produits (27 Catégories complètes)
-- --------------------------------------------------------
INSERT INTO `products` (`id`, `seller_id`, `seller_name`, `name`, `description`, `price`, `category`, `city`, `image`, `status`, `views_count`, `created_at`)
VALUES
  ('P001', 'SUPER-ADMIN-001', 'AgriCongo Bio', 'Farine de Manioc Extra Pure (Sac 25kg)', 'Farine de manioc raffinée, idéale pour fufu traditionnel. Production locale congolaise 100% bio.', 18.00, 'Agriculture & Nourriture', 'Kinshasa', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600', 'disponible', 0, NOW()),
  ('P002', 'SUPER-ADMIN-001', 'Kivu Coffee Roasters', 'Café Pur Arabica du Kivu (Paquet 1kg)', 'Café torréfié d\'altitude récolté sur les collines du Sud-Kivu. Arôme intense et saveur équilibrée.', 14.00, 'Agriculture & Nourriture', 'Bukavu', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600', 'disponible', 0, NOW()),
  ('P003', 'SUPER-ADMIN-001', 'Mayumbe Agro', 'Huile de Palme Pure Raffinée (Bidon 5L)', 'Huile de palme rouge naturelle et filtrée, riche en vitamines A et E. Idéale pour la gastronomie congolaise.', 12.50, 'Agriculture & Nourriture', 'Matadi', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600', 'disponible', 0, NOW()),
  ('P004', 'SUPER-ADMIN-001', 'Fermes du Kivu', 'Haricots Rouges Bio du Kivu (Sac 50kg)', 'Haricots rouges tendres et riches en protéines, récoltés dans les terres fertiles du Nord-Kivu.', 35.00, 'Agriculture & Nourriture', 'Goma', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600', 'disponible', 0, NOW()),
  ('P005', 'SUPER-ADMIN-001', 'Visionnaire Store', 'T-shirt Visionnaire RDC 100% Coton', 'T-shirt respirant de qualité supérieure, coupe moderne aux finitions soignées.', 12.00, 'Vêtement & Accessoires', 'Kinshasa', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', 'disponible', 0, NOW()),
  ('P006', 'SUPER-ADMIN-001', 'Atelier Haute Couture Zaïre', 'Robe Moderne en Pagne Wax Africain', 'Création originale sur tissu wax véritable. Idéale pour cérémonies, mariages et sorties élégantes.', 38.00, 'Vêtement & Accessoires', 'Lubumbashi', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', 'disponible', 0, NOW()),
  ('P007', 'SUPER-ADMIN-001', 'Sape & Élégance Kinshasa', 'Costume Homme Slim Fit 2 Pièces Bleu Nuit', 'Costume élégant taillé sur mesure, veste 2 boutons et pantalon cintré avec doublure satinée.', 85.00, 'Vêtement & Accessoires', 'Kinshasa', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', 'disponible', 0, NOW()),
  ('P008', 'SUPER-ADMIN-001', 'Boutique Chaussures Chic', 'Chaussures de Ville Cuir Habillées Homme', 'Chaussures derby en cuir véritable pleine fleur, semelle antidérapante et confortable.', 45.00, 'Vêtement & Accessoires', 'Kolwezi', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600', 'disponible', 0, NOW()),
  ('P009', 'SUPER-ADMIN-001', 'Art & Culture RDC', 'Sculpture Traditionnelle Masque Luba en Bois', 'Pièce d\'artisanat authentique taillée à la main dans du bois précieux par des artisans locaux.', 65.00, 'Arts & Métiers', 'Kolwezi', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600', 'disponible', 0, NOW()),
  ('P010', 'SUPER-ADMIN-001', 'Galerie Beaux-Arts RDC', 'Tableau Peinture à l\'Huile Ambiance Kinshasa', 'Oeuvre d\'art sur toile représentant la vie quotidienne vibrante des boulevards de Kinshasa.', 90.00, 'Arts & Métiers', 'Kinshasa', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600', 'disponible', 0, NOW()),
  ('P011', 'SUPER-ADMIN-001', 'Artisans du Katanga', 'Statuette Décorative en Malachite du Katanga', 'Statuette sculptée en pierre de malachite pure aux reflets verts intenses et polis.', 50.00, 'Arts & Métiers', 'Lubumbashi', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', 'disponible', 0, NOW()),
  ('P012', 'SUPER-ADMIN-001', 'Auto Pièces Express', 'Pneu Tout-Terrain 4x4 Tubeless 265/70 R16', 'Pneu tout-terrain renforcé, conçu pour affronter les pistes et routes difficiles de la RDC.', 110.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Lubumbashi', 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600', 'disponible', 0, NOW()),
  ('P013', 'SUPER-ADMIN-001', 'Moto Congo Sécurité', 'Casque Moto Intégral Homologué Sécurité', 'Casque de protection avec visière anti-rayures, mousse intérieure lavable et aération optimisée.', 28.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Goma', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600', 'disponible', 0, NOW()),
  ('P014', 'SUPER-ADMIN-001', 'Batteries RDC Pro', 'Batterie Voiture Sans Entretien 12V 70Ah', 'Batterie haute performance adaptée aux climats tropicaux avec garantie 12 mois.', 80.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Kinshasa', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600', 'disponible', 0, NOW()),
  ('P015', 'SUPER-ADMIN-001', 'Garage Central Lubumbashi', 'Jeu de Plaquettes de Frein Céramique Avant', 'Freinage silencieux, durable et sécurisé pour berlines et SUV japonais et européens.', 32.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Kisangani', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600', 'disponible', 0, NOW()),
  ('P016', 'SUPER-ADMIN-001', 'Bag Store RDC', 'Sac à Dos Voyage Antivol & Port USB', 'Sac étanche avec port de charge USB, compartiment ordinateur 15.6 pouces rembourré.', 28.00, 'Sacs, Valises & Boîtes', 'Kisangani', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'disponible', 0, NOW()),
  ('P017', 'SUPER-ADMIN-001', 'Voyage Confort RDC', 'Valise Cabine Rigide 4 Roues Pivotantes 360°', 'Valise en polycarbonate ultralégère avec serrure à combinaison TSA.', 55.00, 'Sacs, Valises & Boîtes', 'Kinshasa', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600', 'disponible', 0, NOW()),
  ('P018', 'SUPER-ADMIN-001', 'Maroquinerie du Congo', 'Sac à Main Femme Cuir Véritable Élégant', 'Sac à main chic avec bandoulière réglable, poches multiples et finitions dorées.', 42.00, 'Sacs, Valises & Boîtes', 'Lubumbashi', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600', 'disponible', 0, NOW()),
  ('P019', 'SUPER-ADMIN-001', 'Chimie Pro Congo', 'Savon Liquide Désinfectant Multi-surfaces (Bidon 5L)', 'Désinfectant professionnel bactéricide pour hôpitaux, hôtels, restaurants et maisons.', 9.00, 'Produits Chimiques', 'Bukavu', 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=600', 'disponible', 0, NOW()),
  ('P020', 'SUPER-ADMIN-001', 'Laboratoires Congolais', 'Eau de Javel Concentrée Purifiante 12° (Bidon 10L)', 'Solution nettoyante et assainissante puissante pour sols, linges et traitement de l\'eau.', 11.00, 'Produits Chimiques', 'Kinshasa', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600', 'disponible', 0, NOW()),
  ('P021', 'SUPER-ADMIN-001', 'AgroChimie RDC', 'Engrais NPK Fertilisant Agricole (Sac 50kg)', 'Engrais complet équilibré 17-17-17 pour booster la productivité maraîchère et vivrière.', 38.00, 'Produits Chimiques', 'Goma', 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600', 'disponible', 0, NOW()),
  ('P022', 'SUPER-ADMIN-001', 'Tech Hub RDC', 'Ordinateur Portable Core i7 15.6\" 16Go RAM', 'Intel Core i7, 16Go RAM DDR4, 512Go SSD NVMe, autonomie 8 heures, clavier rétroéclairé.', 499.00, 'Produits Informatiques', 'Lubumbashi', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 'disponible', 0, NOW()),
  ('P023', 'SUPER-ADMIN-001', 'Office Tech Kinshasa', 'Imprimante Multifonction Wi-Fi Réservoir Rechargeable', 'Impression économique à très faible coût par page, scanner et photocopieur intégrés.', 160.00, 'Produits Informatiques', 'Kinshasa', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600', 'disponible', 0, NOW()),
  ('P024', 'SUPER-ADMIN-001', 'Informatika Congo', 'Disque Dur Externe 2To Antichoc USB 3.0', 'Sauvegarde sécurisée de vos fichiers, boîtier résistant aux chutes et transfert ultra-rapide.', 58.00, 'Produits Informatiques', 'Bukavu', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600', 'disponible', 0, NOW()),
  ('P025', 'SUPER-ADMIN-001', 'Telecom RDC Express', 'Routeur Wi-Fi 4G LTE avec Batterie de Secours', 'Routeur nomade compatible tous réseaux (Vodacom, Airtel, Orange) avec 8h d\'autonomie.', 45.00, 'Produits Informatiques', 'Goma', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600', 'disponible', 0, NOW()),
  ('P026', 'SUPER-ADMIN-001', 'Congo BTP Matériaux', 'Ciment Gris Haute Résistance 42.5R (Sac 50kg)', 'Ciment de référence pour fondations, bétons armés et ouvrages durables.', 10.50, 'Construction & Décoration', 'Matadi', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', 'disponible', 0, NOW()),
  ('P027', 'SUPER-ADMIN-001', 'Décoration Moderne RDC', 'Peinture Murale Satinée Lavable Blanc (Seau 20L)', 'Peinture acrylique haut pouvoir couvrant pour intérieur et extérieur.', 34.00, 'Construction & Décoration', 'Kinshasa', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600', 'disponible', 0, NOW()),
  ('P028', 'SUPER-ADMIN-001', 'Congo Céramiques', 'Carrelage Grès Cérame Vitrifié 60x60 (Carton 1.44m²)', 'Carreaux finition marbrée brillante, antidérapants et faciles à entretenir.', 16.00, 'Construction & Décoration', 'Lubumbashi', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600', 'disponible', 0, NOW()),
  ('P029', 'SUPER-ADMIN-001', 'Quincaillerie Katanga', 'Tôle Ondulée Galvanisée Antirouille Épaisseur 0.35mm', 'Tôles de toiture résistantes aux fortes pluies tropicales et intempéries.', 9.00, 'Construction & Décoration', 'Kolwezi', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600', 'disponible', 0, NOW()),
  ('P030', 'SUPER-ADMIN-001', 'Zaïre-Market Officiel', 'Smartphone Galaxy Ultra 5G 108MP 256Go', 'Smartphone Android puissant, appareil photo 108MP, écran 6.7 pouces AMOLED 120Hz.', 180.00, 'Électroniques de Consommation', 'Bukavu', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 'disponible', 0, NOW()),
  ('P031', 'SUPER-ADMIN-001', 'Electro Kivu', 'Écouteurs Sans Fil Bluetooth Réduction de Bruit', 'Autonomie 24 heures avec boîtier, son haute définition et basses profondes.', 22.00, 'Électroniques de Consommation', 'Goma', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'disponible', 0, NOW()),
  ('P032', 'SUPER-ADMIN-001', 'Maison High-Tech', 'Smart TV LED 43 Pouces 4K Ultra HD avec Android', 'Téléviseur intelligent avec Netflix, YouTube, ports HDMI/USB et son Dolby Surround.', 230.00, 'Électroniques de Consommation', 'Kinshasa', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600', 'disponible', 0, NOW()),
  ('P033', 'SUPER-ADMIN-001', 'Sound Box Congo', 'Enceinte Bluetooth Portable Waterproof 30W Bass Boost', 'Enceinte nomade résistante aux chocs et éclaboussures, lumière LED dynamique.', 35.00, 'Électroniques de Consommation', 'Lubumbashi', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600', 'disponible', 0, NOW()),
  ('P034', 'SUPER-ADMIN-001', 'Solaire Congo', 'Kit Panneau Solaire Monocristallin 200W', 'Système d\'énergie solaire haute performance pour habitations et commerces.', 95.00, 'Électricité & Électronique', 'Kolwezi', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600', 'disponible', 0, NOW()),
  ('P035', 'SUPER-ADMIN-001', 'Énergie Verte RDC', 'Onduleur Solaire Hybride 3KVA 24V Pure Sinus', 'Convertisseur avec régulateur MPPT intégré pour alimentation électrique continue.', 280.00, 'Électricité & Électronique', 'Lubumbashi', 'https://images.unsplash.com/photo-1558441719-8b489c63f732?w=600', 'disponible', 0, NOW()),
  ('P036', 'SUPER-ADMIN-001', 'Congo Solar Power', 'Batterie Solaire Gel 12V 200Ah Cyclage Profond', 'Batterie étanche sans entretien à longue durée de vie pour installation solaire autonome.', 220.00, 'Électricité & Électronique', 'Kinshasa', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600', 'disponible', 0, NOW()),
  ('P037', 'SUPER-ADMIN-001', 'Élec Matériel RDC', 'Câble Électrique Cuivre Pur 2.5mm² (Rouleau 100m)', 'Câble sous gaine ignifugée haute résistance pour installations domestiques et industrielles.', 40.00, 'Électricité & Électronique', 'Matadi', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600', 'disponible', 0, NOW()),
  ('P038', 'SUPER-ADMIN-001', 'Mobilier Design RDC', 'Canapé d\'Angle Salon Confort 5 Places Tissu Gris', 'Salon modulable avec coussins déhoussables, assise mousse haute résilience.', 320.00, 'Meuble', 'Kinshasa', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', 'disponible', 0, NOW()),
  ('P039', 'SUPER-ADMIN-001', 'Menuiserie d\'Art Katanga', 'Table à Manger Bois Massif d\'Iroko avec 6 Chaises', 'Ensemble artisanal en bois dur congolais verni, robuste et intemporel.', 260.00, 'Meuble', 'Lubumbashi', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600', 'disponible', 0, NOW()),
  ('P040', 'SUPER-ADMIN-001', 'Ameublement Moderne Kivu', 'Armoire Dressing 3 Portes Coulissantes avec Miroir', 'Grand volume de rangement avec penderie, tiroirs et étagères spacieuses.', 195.00, 'Meuble', 'Goma', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600', 'disponible', 0, NOW()),
  ('P041', 'SUPER-ADMIN-001', 'Santé Plus RDC', 'Tensiomètre Électronique Brassard Précision Médicale', 'Mesure instantanée de la tension artérielle et détection d\'arythmie cardiaque avec écran LCD.', 25.00, 'Santé & Hygiène', 'Kinshasa', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', 'disponible', 0, NOW()),
  ('P042', 'SUPER-ADMIN-001', 'Pharmacie Centrale Kivu', 'Boîte de 50 Masques Chirurgicaux 3 Plis Certifiés', 'Masques hypoallergéniques à haute filtration bactérienne avec élastiques confortables.', 6.00, 'Santé & Hygiène', 'Goma', 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600', 'disponible', 0, NOW()),
  ('P043', 'SUPER-ADMIN-001', 'Hygiène Pro Congo', 'Gel Hydroalcoolique Antibactérien 500ml avec Pompe', 'Formule recommandée OMS éliminant 99.9% des germes et bactéries sans rinçage.', 4.50, 'Santé & Hygiène', 'Bukavu', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600', 'disponible', 0, NOW()),
  ('P044', 'SUPER-ADMIN-001', 'Médical Équipement Katanga', 'Pèse-personne Électronique Digital en Verre Trempé', 'Capteurs de précision pour suivi du poids corporel avec affichage rétroéclairé.', 15.00, 'Santé & Hygiène', 'Lubumbashi', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600', 'disponible', 0, NOW()),
  ('P045', 'SUPER-ADMIN-001', 'Industrie & Moteurs RDC', 'Groupe Électrogène Diesel Insonorisé 5kVA Démarreur Électrique', 'Générateur robuste faible consommation idéal pour commerces, ateliers et résidences.', 650.00, 'Équipement Industriel & Composants', 'Lubumbashi', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', 'disponible', 0, NOW()),
  ('P046', 'SUPER-ADMIN-001', 'Hydraulique Congo', 'Pompe à Eau Solaire Immergée 750W pour Forage', 'Pompe en acier inoxydable pour puits profonds jusqu\'à 80m, débit puissant.', 210.00, 'Équipement Industriel & Composants', 'Kolwezi', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600', 'disponible', 0, NOW()),
  ('P047', 'SUPER-ADMIN-001', 'Atelier Mécanique Express', 'Compresseur d\'Air Électrique 50L 2HP avec Manomètre', 'Compresseur à piston pour gonflage, peinture au pistolet et outillage pneumatique.', 175.00, 'Équipement Industriel & Composants', 'Kinshasa', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', 'disponible', 0, NOW()),
  ('P048', 'SUPER-ADMIN-001', 'Électro Mesures RDC', 'Multimètre Numérique Professionnel Auto-Range 600V', 'Testeur de tension, courant, résistance et continuité avec écran rétroéclairé.', 19.00, 'Instruments & Compteurs', 'Kinshasa', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', 'disponible', 0, NOW()),
  ('P049', 'SUPER-ADMIN-001', 'Élec Pro Katanga', 'Compteur d\'Énergie Électrique Prépayé Monophasé DIN', 'Sous-compteur divisionnaire pour gestion locative et suivi précis de consommation kWh.', 38.00, 'Instruments & Compteurs', 'Lubumbashi', 'https://images.unsplash.com/photo-1558441719-8b489c63f732?w=600', 'disponible', 0, NOW()),
  ('P050', 'SUPER-ADMIN-001', 'Instruments & Diagnostics RDC', 'Thermomètre Infrarouge Laser Industriel Sans Contact', 'Mesure thermique instantanée de -50°C à +550°C pour maintenance et moteurs.', 24.00, 'Instruments & Compteurs', 'Kolwezi', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', 'disponible', 0, NOW()),
  ('P051', 'SUPER-ADMIN-001', 'Ménage Confort Congo', 'Réchaud à Gaz 2 Feux Inox Haute Pression', 'Réchaud économique et sécurisé pour cuisine familiale et petits restaurants.', 26.00, 'Industrie Légère & Articles d\'Usage Courant', 'Kisangani', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600', 'disponible', 0, NOW()),
  ('P052', 'SUPER-ADMIN-001', 'Cuisine Moderne Kinshasa', 'Bouteille Thermos Isotherme Inox 2 Litres Double Paroi', 'Maintient l\'eau chaude ou fraîche pendant plus de 24 heures sans altérer le goût.', 14.00, 'Industrie Légère & Articles d\'Usage Courant', 'Kinshasa', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600', 'disponible', 0, NOW()),
  ('P053', 'SUPER-ADMIN-001', 'Électroménager Kivu', 'Machine à Gaufres & Sandwiches Électrique 3-en-1', 'Plaques antiadhésives interchangeables avec thermostat automatique.', 29.00, 'Industrie Légère & Articles d\'Usage Courant', 'Bukavu', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600', 'disponible', 0, NOW()),
  ('P054', 'SUPER-ADMIN-001', 'Lumière & Sécurité RDC', 'Projecteur Solaire LED 100W Extérieur avec Télécommande', 'Éclairage puissant étanche IP67 pour cours, façades et avenues sécurisées.', 42.00, 'Luminaire & Éclairage', 'Kinshasa', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600', 'disponible', 0, NOW()),
  ('P055', 'SUPER-ADMIN-001', 'Équipement Kivu', 'Lampe Torche Rechargeable LED Puissante 5000LM Longue Portée', 'Lampe tactique en alliage aluminium avec zoom réglable et batterie longue autonomie.', 18.00, 'Luminaire & Éclairage', 'Goma', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600', 'disponible', 0, NOW()),
  ('P056', 'SUPER-ADMIN-001', 'Éclairage Moderne Katanga', 'Lot de 10 Ampoules LED Éco 9W E27 Blanc Chaud', 'Consommation réduite de 85% par rapport aux ampoules incandescentes classiques.', 12.00, 'Luminaire & Éclairage', 'Lubumbashi', 'https://images.unsplash.com/photo-1532007413944-64e702213530?w=600', 'disponible', 0, NOW()),
  ('P057', 'SUPER-ADMIN-001', 'Déco Éclairage Kinshasa', 'Lustre Suspension Design Moderne 3 Cercles LED Salon', 'Lustre décoratif contemporain à intensité variable avec commande à distance.', 88.00, 'Luminaire & Éclairage', 'Kinshasa', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600', 'disponible', 0, NOW()),
  ('P058', 'SUPER-ADMIN-001', 'Machines Agro RDC', 'Moulin Électrique à Manioc, Maïs & Céréales 3kW', 'Machine de broyage rapide et fine pour meuneries communautaires et petits ateliers.', 340.00, 'Machinerie de Fabrication & de Façonnage', 'Kinshasa', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', 'disponible', 0, NOW()),
  ('P059', 'SUPER-ADMIN-001', 'BTP Innovations Congo', 'Presse Manuelle à Briques Autobloquantes Écologiques', 'Production de briques en terre stabilisée sans cuisson pour construction économique.', 290.00, 'Machinerie de Fabrication & de Façonnage', 'Kolwezi', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', 'disponible', 0, NOW()),
  ('P060', 'SUPER-ADMIN-001', 'Packaging Matériel RDC', 'Soudeuse Thermique Sacs Plastiques avec Minuteur 30cm', 'Fermeture hermétique propre pour emballage de denrées alimentaires et produits secs.', 25.00, 'Machinerie de Fabrication & de Façonnage', 'Lubumbashi', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600', 'disponible', 0, NOW()),
  ('P061', 'SUPER-ADMIN-001', 'Minéraux du Katanga', 'Échantillon Minéral Cuivre Brut du Katanga (Collection)', 'Spécimen minéral naturel pur extrait des carrières minières du Lualaba.', 45.00, 'Métallurgie, Minéral & Énergie', 'Kolwezi', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', 'disponible', 0, NOW()),
  ('P062', 'SUPER-ADMIN-001', 'Aciérie & Métal RDC', 'Barre de Fer à Béton Nervuré FeE400 Ø12mm (Barre 12m)', 'Acier de construction haute résistance certifié pour poteaux et dalles de bâtiment.', 9.50, 'Métallurgie, Minéral & Énergie', 'Lubumbashi', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', 'disponible', 0, NOW()),
  ('P063', 'SUPER-ADMIN-001', 'Énergie Verte Congo', 'Charbon Actif Végétal Naturel Purifié (Sac 25kg)', 'Produit absorbant pour filtration des eaux, purification d\'air et usage agricole.', 28.00, 'Métallurgie, Minéral & Énergie', 'Kisangani', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600', 'disponible', 0, NOW()),
  ('P064', 'SUPER-ADMIN-001', 'Papeterie Centrale RDC', 'Carton de 5 Ramettes Papier A4 80g Extra Blanc', 'Papier laser et jet d\'encre premium sans bourrage pour administrations et entreprises.', 24.00, 'Fournitures de Bureau', 'Kinshasa', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 'disponible', 0, NOW()),
  ('P065', 'SUPER-ADMIN-001', 'Bureautique Pro Katanga', 'Fauteuil de Bureau Ergonomique Cuir avec Accoudoirs', 'Dossier inclinable et hauteur ajustable pour un confort de travail quotidien prolongé.', 125.00, 'Fournitures de Bureau', 'Lubumbashi', 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=600', 'disponible', 0, NOW()),
  ('P066', 'SUPER-ADMIN-001', 'Office Fournitures Kivu', 'Tableau Blanc Magnétique 90x60cm avec Kit Feutres', 'Tableau d\'affichage et de réunion effaçable à sec avec cadre en aluminium.', 22.00, 'Fournitures de Bureau', 'Bukavu', 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600', 'disponible', 0, NOW()),
  ('P067', 'SUPER-ADMIN-001', 'Emballage Pro Kinshasa', 'Lot de 6 Rouleaux Ruban Adhésif Transparent 50mm x 100m', 'Ruban adhésif haute adhérence pour scellement sécurisé de cartons et colis.', 11.00, 'Emballage & Impression', 'Kinshasa', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600', 'disponible', 0, NOW()),
  ('P068', 'SUPER-ADMIN-001', 'Packaging Express RDC', 'Lot de 10 Cartons de Déménagement Renforcés Double Cannelure', 'Cartons pliables résistants aux charges lourdes pour expédition fret national.', 18.00, 'Emballage & Impression', 'Lubumbashi', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600', 'disponible', 0, NOW()),
  ('P069', 'SUPER-ADMIN-001', 'Kivu Packaging', 'Paquet de 100 Pochettes d\'Expédition Kraft Écologiques', 'Enveloppes kraft indéchirables pour envois postaux et commerce en ligne.', 16.00, 'Emballage & Impression', 'Goma', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 'disponible', 0, NOW()),
  ('P070', 'SUPER-ADMIN-001', 'Zaïre Protection High-Tech', 'Caméra de Surveillance Solaire 4G Extérieure 360° Sans Fil', 'Caméra autonome avec panneau solaire, vision nocturne couleur et alertes sur smartphone.', 95.00, 'Sécurité & Protection', 'Kinshasa', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600', 'disponible', 0, NOW()),
  ('P071', 'SUPER-ADMIN-001', 'Sécurité Mines RDC', 'Bottes de Sécurité Chantier Coquées Embout Acier S3', 'Chaussures montantes en cuir hydrofuge avec semelle anti-perforation pour mines et BTP.', 32.00, 'Sécurité & Protection', 'Kolwezi', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'disponible', 0, NOW()),
  ('P072', 'SUPER-ADMIN-001', 'Protection Civile Équipement', 'Extincteur à Poudre ABC 6kg Homologué Sécurité Incendie', 'Appareil d\'extinction rapide pour feux de solides, liquides et gaz avec manomètre.', 39.00, 'Sécurité & Protection', 'Lubumbashi', 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600', 'disponible', 0, NOW()),
  ('P073', 'SUPER-ADMIN-001', 'Signalisation Congo', 'Gilet Haute Visibilité Réfléchissant avec Bandes Fluo', 'Gilet de sécurité léger fermeture scratch pour conducteurs, chantiers et manutention.', 5.50, 'Sécurité & Protection', 'Matadi', 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600', 'disponible', 0, NOW()),
  ('P074', 'SUPER-ADMIN-001', 'Kinshasa IT Solutions', 'Forfait Maintenance & Dépannage Informatique Réseaux', 'Assistance technique complète sur site ou à distance : réparation PC, nettoyage virus, Wi-Fi.', 30.00, 'Service', 'Kinshasa', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 'disponible', 0, NOW()),
  ('P075', 'SUPER-ADMIN-001', 'Zaïre Express Courrier', 'Service de Livraison Express Colis Interurbain Kin-L\'shi', 'Fret aérien rapide et traçable en 48 heures entre Kinshasa, Lubumbashi et Kolwezi.', 20.00, 'Service', 'Lubumbashi', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600', 'disponible', 0, NOW()),
  ('P076', 'SUPER-ADMIN-001', 'Studio Graphique Kivu', 'Conception & Impression de 500 Cartes de Visite Professionnelles', 'Design graphique moderne et impression recto-verso sur papier couché 350g pelliculé.', 25.00, 'Service', 'Goma', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 'disponible', 0, NOW()),
  ('P077', 'SUPER-ADMIN-001', 'Sport Store Zaïre', 'Ballon de Football Officiel Match Cuir Synthétique Taille 5', 'Ballon thermosoudé haute durabilité pour entraînements et matchs sur terrains synthétiques et gazon.', 16.00, 'Sports & Loisirs', 'Kinshasa', 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600', 'disponible', 0, NOW()),
  ('P078', 'SUPER-ADMIN-001', 'Fitness Club RDC', 'Tapis de Gymnastique & Yoga Antidérapant Épais 10mm', 'Tapis écologique avec sangle de transport, parfait pour pilates, fitness et étirements.', 14.00, 'Sports & Loisirs', 'Lubumbashi', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', 'disponible', 0, NOW()),
  ('P079', 'SUPER-ADMIN-001', 'Vélo Kivu Évasion', 'Vélo VTT Tout-Terrain 26 Pouces 21 Vitesses Freins à Disque', 'Cadre aluminium renforcé, suspension avant amortissante pour routes pavées et sentiers du Kivu.', 175.00, 'Sports & Loisirs', 'Bukavu', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600', 'disponible', 0, NOW()),
  ('P080', 'SUPER-ADMIN-001', 'Muscu Pro Congo', 'Paire d\'Haltères Réglables Musculation 20kg avec Mallette', 'Disques en fonte chromée avec barre moletée antiglisse pour musculation à domicile.', 45.00, 'Sports & Loisirs', 'Goma', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600', 'disponible', 0, NOW()),
  ('P081', 'SUPER-ADMIN-001', 'Maison du Wax Zaïre', 'Pièce Complète Pagne Wax Hollandais Véritable (6 Yards)', 'Tissu wax de renommée internationale, 100% coton peigné, motifs et couleurs vibrantes inaltérables.', 75.00, 'Textile', 'Kinshasa', 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600', 'disponible', 0, NOW()),
  ('P082', 'SUPER-ADMIN-001', 'Textiles Déco Katanga', 'Rouleau Tissu Rideau Occultant Grande Largeur (10 Mètres)', 'Tissu thermique et isolant phonique pour décoration d\'intérieur et salons de standing.', 55.00, 'Textile', 'Lubumbashi', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600', 'disponible', 0, NOW()),
  ('P083', 'SUPER-ADMIN-001', 'Comptoir Textile Congo', 'Rouleau Tissu Popeline 100% Coton Blanc pour Uniformes (25m)', 'Matière première textile douce et résistante pour tenues médicales, scolaires et hôtellerie.', 48.00, 'Textile', 'Kisangani', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 'disponible', 0, NOW()),
  ('P084', 'SUPER-ADMIN-001', 'Bricolage Express RDC', 'Mallette Complète d\'Outillage 108 Pièces Chrome Vanadium', 'Jeu de clés à douilles, cliquets, embouts de vissage et pinces en coffret antichoc.', 65.00, 'Outils & Quincaillerie', 'Kinshasa', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600', 'disponible', 0, NOW()),
  ('P085', 'SUPER-ADMIN-001', 'Outillage Pro Katanga', 'Perceuse Visseuse Sans Fil 20V avec 2 Batteries Li-ion', 'Mandrin auto-serrant 13mm avec éclairage LED et chargeur rapide, couple puissant.', 70.00, 'Outils & Quincaillerie', 'Lubumbashi', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600', 'disponible', 0, NOW()),
  ('P086', 'SUPER-ADMIN-001', 'Mines Quincaillerie', 'Meuleuse d\'Angle Électrique 115mm 850W avec Carter', 'Outil compact et puissant pour découpe et ébavurage des métaux et du béton.', 38.00, 'Outils & Quincaillerie', 'Kolwezi', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600', 'disponible', 0, NOW()),
  ('P087', 'SUPER-ADMIN-001', 'Quincaillerie Centrale Matadi', 'Cadenas Haute Sécurité en Acier Trempé Blindé 70mm', 'Verrouillage anti-scie et anti-perçage pour conteneurs, hangars et grilles.', 12.00, 'Outils & Quincaillerie', 'Matadi', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600', 'disponible', 0, NOW()),
  ('P088', 'SUPER-ADMIN-001', 'Monde des Enfants RDC', 'Voiture Télécommandée Tout-Terrain 4WD Électrique Batterie', 'Monster truck tout-terrain échelle 1:16 avec suspensions indépendantes et portée 50m.', 32.00, 'Jouets', 'Kinshasa', 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600', 'disponible', 0, NOW()),
  ('P089', 'SUPER-ADMIN-001', 'Jouets & Éveil Congo', 'Coffret Jeu de Construction Briques Créatives 500 Pièces', 'Jeu éducatif stimulant la créativité et la motricité fine des enfants dès 4 ans.', 22.00, 'Jouets', 'Lubumbashi', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600', 'disponible', 0, NOW()),
  ('P090', 'SUPER-ADMIN-001', 'Boutique Bambin Kivu', 'Poupée Parlante Éducative Interactive avec Vêtements', 'Poupée souple avec sons réalistes et accessoires de puériculture.', 18.00, 'Jouets', 'Goma', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600', 'disponible', 0, NOW()),
  ('P091', 'SUPER-ADMIN-001', 'Zaïre Moto Motors', 'Moto Tricycle Cargo Benne Motorisée 200cc pour Fret', 'Tricycle utilitaire robuste pour transport de marchandises, capacité de charge 800kg.', 1850.00, 'Transport', 'Kinshasa', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600', 'disponible', 0, NOW()),
  ('P092', 'SUPER-ADMIN-001', 'Éco-Mobilité RDC', 'Trottinette Électrique Pliable Adulte 350W 25km/h Autonomie 30km', 'Mobilité urbaine pratique avec freins à disque, pneus increvables et phare LED.', 280.00, 'Transport', 'Lubumbashi', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600', 'disponible', 0, NOW()),
  ('P093', 'SUPER-ADMIN-001', 'Transports RDC Logistique', 'Remorque Utilitaire Basculante pour Moto / Quad Homologuée', 'Châssis en acier galvanisé avec ridelles amovibles pour transport agricole et colis.', 340.00, 'Transport', 'Bukavu', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600', 'disponible', 0, NOW());

INSERT INTO `administrators` (`id`, `name`, `email`, `password`, `role`, `permissions`, `status`)
VALUES (
  'SUPER-ADMIN-001',
  'Shams Cherubin',
  'shamscherubin@gamil.com',
  '0907069115',
  'super_admin',
  '["users","products","categories","orders","payments","reports","support","statistics","logs"]',
  'active'
) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `email`=VALUES(`email`), `password`=VALUES(`password`);

-- ==========================================================
-- DONNÉES DE DÉMONSTRATION (PRODUITS)
-- ==========================================================
INSERT INTO `products` (`id`, `seller_id`, `seller_name`, `name`, `description`, `price`, `category`, `city`, `image`, `status`) VALUES
('P001', 'SUPER-ADMIN-001', 'AgriCongo Bio', 'Farine de Manioc Extra Pure (Sac 25kg)', 'Farine de manioc raffinée pour fufu traditionnel. Production congolaise 100% bio.', 18.00, 'Agriculture & Nourriture', 'Kinshasa', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600', 'disponible'),
('P002', 'SUPER-ADMIN-001', 'Kivu Coffee Roasters', 'Café Pur Arabica du Kivu (Paquet 1kg)', 'Café torréfié d altitude récolté sur les collines du Sud-Kivu.', 14.00, 'Agriculture & Nourriture', 'Bukavu', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600', 'disponible'),
('P003', 'SUPER-ADMIN-001', 'Visionnaire Store', 'T-shirt Visionnaire RDC 100% Coton', 'T-shirt respirant de qualité supérieure, coupe moderne.', 12.00, 'Vêtement & Accessoires', 'Kinshasa', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', 'disponible'),
('P004', 'SUPER-ADMIN-001', 'Atelier Haute Couture Zaïre', 'Robe Moderne en Pagne Wax Africain', 'Création originale sur tissu wax véritable.', 38.00, 'Vêtement & Accessoires', 'Lubumbashi', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600', 'disponible'),
('P005', 'SUPER-ADMIN-001', 'Art & Culture RDC', 'Sculpture Traditionnelle Masque Luba en Bois', 'Pièce d artisanat authentique taillée à la main dans du bois précieux.', 65.00, 'Arts & Métiers', 'Kolwezi', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600', 'disponible'),
('P006', 'SUPER-ADMIN-001', 'Auto Pièces Express', 'Pneu Tout-Terrain 4x4 Tubeless 265/70 R16', 'Pneu tout-terrain renforcé pour routes et pistes difficiles.', 110.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Lubumbashi', 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600', 'disponible'),
('P007', 'SUPER-ADMIN-001', 'Moto Congo Sécurité', 'Casque Moto Intégral Homologué Sécurité', 'Casque de protection avec visière anti-rayures.', 28.00, 'Pièces & Accessoires d\'Auto et de Moto', 'Goma', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600', 'disponible'),
('P008', 'SUPER-ADMIN-001', 'Bag Store RDC', 'Sac à Dos Voyage Antivol & Port USB', 'Sac étanche avec port USB et compartiment ordinateur.', 28.00, 'Sacs, Valises & Boîtes', 'Kisangani', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'disponible'),
('P009', 'SUPER-ADMIN-001', 'Voyage Confort RDC', 'Valise Cabine Rigide 4 Roues Pivotantes', 'Valise en polycarbonate ultralégère avec serrure TSA.', 55.00, 'Sacs, Valises & Boîtes', 'Kinshasa', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600', 'disponible'),
('P010', 'SUPER-ADMIN-001', 'Chimie Pro Congo', 'Savon Liquide Désinfectant Multi-surfaces (Bidon 5L)', 'Désinfectant professionnel bactéricide multi-usage.', 9.00, 'Produits Chimiques', 'Bukavu', 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=600', 'disponible'),
('P011', 'SUPER-ADMIN-001', 'Tech Hub RDC', 'Ordinateur Portable Core i7 15.6\" 16Go RAM', 'Intel Core i7, 16Go RAM DDR4, 512Go SSD NVMe.', 499.00, 'Produits Informatiques', 'Lubumbashi', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 'disponible'),
('P012', 'SUPER-ADMIN-001', 'Office Tech Kinshasa', 'Imprimante Multifonction Wi-Fi Réservoir Rechargeable', 'Impression économique, scanner et photocopieur.', 160.00, 'Produits Informatiques', 'Kinshasa', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600', 'disponible'),
('P013', 'SUPER-ADMIN-001', 'Congo BTP Matériaux', 'Ciment Gris Haute Résistance 42.5R (Sac 50kg)', 'Ciment de référence pour bétons armés et fondations.', 10.50, 'Construction & Décoration', 'Matadi', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', 'disponible'),
('P014', 'SUPER-ADMIN-001', 'Décoration Moderne RDC', 'Peinture Murale Satinée Lavable Blanc (Seau 20L)', 'Peinture acrylique haut pouvoir couvrant.', 34.00, 'Construction & Décoration', 'Kinshasa', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600', 'disponible'),
('P015', 'SUPER-ADMIN-001', 'Zaïre-Market Officiel', 'Smartphone Galaxy Ultra 5G 108MP 256Go', 'Smartphone Android puissant, appareil photo 108MP.', 180.00, 'Électroniques de Consommation', 'Bukavu', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 'disponible'),
('P016', 'SUPER-ADMIN-001', 'Electro Kivu', 'Écouteurs Sans Fil Bluetooth Réduction de Bruit', 'Autonomie 24 heures avec boîtier, son haute définition.', 22.00, 'Électroniques de Consommation', 'Goma', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'disponible'),
('P017', 'SUPER-ADMIN-001', 'Solaire Congo', 'Kit Panneau Solaire Monocristallin 200W', 'Système d énergie solaire haute performance.', 95.00, 'Électricité & Électronique', 'Kolwezi', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600', 'disponible'),
('P018', 'SUPER-ADMIN-001', 'Énergie Verte RDC', 'Onduleur Solaire Hybride 3KVA 24V Pure Sinus', 'Convertisseur avec régulateur MPPT intégré.', 280.00, 'Électricité & Électronique', 'Lubumbashi', 'https://images.unsplash.com/photo-1558441719-8b489c63f732?w=600', 'disponible'),
('P019', 'SUPER-ADMIN-001', 'Mobilier Grand Kasaï', 'Canapé Salon 3 Places Tissu Gris Confort', 'Structure en bois massif avec mousse haute résilience.', 290.00, 'Meuble', 'Kinshasa', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', 'disponible'),
('P020', 'SUPER-ADMIN-001', 'Menuiserie du Kivu', 'Bureau Professionnel Bois avec Tiroirs Clés', 'Table de travail ergonomique pour bureau et télétravail.', 140.00, 'Meuble', 'Goma', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600', 'disponible'),
('P021', 'SUPER-ADMIN-001', 'Pharmavie RDC', 'Tensiomètre Électronique Digital de Bras', 'Appareil médical précis de mesure de tension artérielle.', 26.00, 'Santé & Hygiène', 'Kinshasa', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', 'disponible'),
('P022', 'SUPER-ADMIN-001', 'Industrie Congo SARL', 'Groupe Électrogène Diesel Silencieux 7.5KVA', 'Moteur diesel économique avec démarrage électrique et AVR.', 780.00, 'Équipement Industriel & Composants', 'Lubumbashi', 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600', 'disponible'),
('P023', 'SUPER-ADMIN-001', 'Pompes & Moteurs RDC', 'Pompe à Eau Submersible 1.5HP pour Forage', 'Pompe immergée en inox pour puits profonds.', 115.00, 'Équipement Industriel & Composants', 'Matadi', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', 'disponible'),
('P024', 'SUPER-ADMIN-001', 'Mesure & Tech Congo', 'Multimètre Numérique Digital Professionnel', 'Testeur de tension AC/DC, courant et résistance.', 24.00, 'Instruments & Compteurs', 'Kolwezi', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600', 'disponible'),
('P025', 'SUPER-ADMIN-001', 'Maison Moderne Kivu', 'Autocuiseur Marmite à Pression Inox 9 Litres', 'Cuisson rapide et saine pour viandes et légumes.', 36.00, 'Industrie Légère & Articles d\'Usage Courant', 'Bukavu', 'https://images.unsplash.com/photo-1584990347449-399066662768?w=600', 'disponible'),
('P026', 'SUPER-ADMIN-001', 'Lumière & Clarté RDC', 'Projecteur LED Solaire Extérieur 100W avec Détecteur', 'Éclairage puissant automatique, étanche IP66.', 35.00, 'Luminaire & Éclairage', 'Kinshasa', 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=600', 'disponible'),
('P027', 'SUPER-ADMIN-001', 'Textile Équipement RDC', 'Machine à Coudre Industrielle Automatique', 'Machine rapide point noué avec moteur silencieux.', 320.00, 'Machinerie de Fabrication & de Façonnage', 'Kinshasa', 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600', 'disponible'),
('P028', 'SUPER-ADMIN-001', 'Métal Congo SARL', 'Tôles Galvanisées Ondulées Anti-Corrosion (Lot de 10)', 'Tôles de couverture épaisses résistant aux intempéries.', 85.00, 'Métallurgie, Minéral & Énergie', 'Likasi', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600', 'disponible'),
('P029', 'SUPER-ADMIN-001', 'Papeterie Centrale RDC', 'Carton de Papier Ramettes A4 80g (5 Ramettes)', 'Papier blanc haute brillance pour imprimantes.', 22.00, 'Fournitures de Bureau', 'Kinshasa', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 'disponible'),
('P030', 'SUPER-ADMIN-001', 'Packaging Express Congo', 'Lot de 500 Cartons d\'Expédition Kraft Renforcé', 'Boîtes postales solides pour e-commerce et colis.', 65.00, 'Emballage & Impression', 'Kinshasa', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600', 'disponible'),
('P031', 'SUPER-ADMIN-001', 'Sécurité Vision Congo', 'Caméra de Surveillance Wi-Fi 360° Vision Nocturne', 'Surveillance à distance en temps réel sur smartphone.', 48.00, 'Sécurité & Protection', 'Kinshasa', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600', 'disponible'),
('P032', 'SUPER-ADMIN-001', 'Protection BTP RDC', 'Chaussures de Sécurité Chantier Embout Acier', 'Bottes anti-perforation et semelle antidérapante.', 35.00, 'Sécurité & Protection', 'Kolwezi', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600', 'disponible'),
('P033', 'SUPER-ADMIN-001', 'Services Tech RDC', 'Installation & Maintenance Solaire Professionnelle', 'Service technique qualifié d audit et d installation solaire.', 50.00, 'Service', 'Lubumbashi', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600', 'disponible'),
('P034', 'SUPER-ADMIN-001', 'Sport Zone Congo', 'Ballon de Football Officiel Cuir Pro Taille 5', 'Ballon haute résistance cousu main, trajectoire stable.', 25.00, 'Sports & Loisirs', 'Goma', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600', 'disponible'),
('P035', 'SUPER-ADMIN-001', 'Zaïre-Market Officiel', 'Baskets Sportives Running Amorti Dynamique', 'Chaussures légères avec amorti dynamique pour la course.', 35.00, 'Sports & Loisirs', 'Bukavu', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'disponible'),
('P036', 'SUPER-ADMIN-001', 'Maison du Textile RDC', 'Pièce de Tissu Wax Véritable Super-Java (6 Yards)', 'Tissu 100% pur coton aux motifs éclatants.', 42.00, 'Textile', 'Kinshasa', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600', 'disponible'),
('P037', 'SUPER-ADMIN-001', 'Outillage Congo', 'Boîte à Outils Complète 108 Pièces Chrome Vanadium', 'Mallette professionnelle avec clés à cliquet et douilles.', 49.00, 'Outils & Quincaillerie', 'Lubumbashi', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600', 'disponible'),
('P038', 'SUPER-ADMIN-001', 'Brico Pro Kivu', 'Perceuse Visseuse Sans Fil 20V avec 2 Batteries', 'Perceuse puissante avec mandrin automatique.', 58.00, 'Outils & Quincaillerie', 'Goma', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600', 'disponible'),
('P039', 'SUPER-ADMIN-001', 'Monde des Enfants RDC', 'Voiture Télécommandée Tout-Terrain 4WD Rechargeable', 'Véhicule radiocommandé avec amortisseurs tout-terrain.', 26.00, 'Jouets', 'Kinshasa', 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600', 'disponible'),
('P040', 'SUPER-ADMIN-001', 'Auto Transport RDC', 'Tricycle Utilitaire Moto-Cargo 250cc pour Transport', 'Tricycle robuste avec benne basculante, charge utile 800kg.', 1450.00, 'Transport', 'Matadi', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600', 'disponible')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);
