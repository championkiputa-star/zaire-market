/**
 * ===================================================================
 * ZAÏRE-MARKET — Gestionnaire des Produits & Ventes
 * Catalogue complet des 28 Catégories (99 articles concrets)
 * ===================================================================
 */

const CATALOG_VERSION = "2026.8";

const INITIAL_PRODUCTS = [
    {
        "id": "P001",
        "name": "Farine de Manioc Extra Pure (Sac 25kg)",
        "price": 18,
        "category": "Agriculture & Nourriture",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
        "description": "Farine de manioc raffinée, idéale pour fufu traditionnel. Production locale congolaise 100% bio.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "AgriCongo Bio"
    },
    {
        "id": "P002",
        "name": "Café Pur Arabica du Kivu (Paquet 1kg)",
        "price": 14,
        "category": "Agriculture & Nourriture",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600",
        "description": "Café torréfié d'altitude récolté sur les collines du Sud-Kivu. Arôme intense et saveur équilibrée.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Kivu Coffee Roasters"
    },
    {
        "id": "P003",
        "name": "Huile de Palme Pure Raffinée (Bidon 5L)",
        "price": 12.5,
        "category": "Agriculture & Nourriture",
        "city": "Matadi",
        "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600",
        "description": "Huile de palme rouge naturelle et filtrée, riche en vitamines A et E. Idéale pour la gastronomie congolaise.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Mayumbe Agro"
    },
    {
        "id": "P004",
        "name": "Haricots Rouges Bio du Kivu (Sac 50kg)",
        "price": 35,
        "category": "Agriculture & Nourriture",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600",
        "description": "Haricots rouges tendres et riches en protéines, récoltés dans les terres fertiles du Nord-Kivu.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Fermes du Kivu"
    },
    {
        "id": "P005",
        "name": "T-shirt Visionnaire RDC 100% Coton",
        "price": 12,
        "category": "Vêtement & Accessoires",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        "description": "T-shirt respirant de qualité supérieure, coupe moderne aux finitions soignées.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Visionnaire Store"
    },
    {
        "id": "P006",
        "name": "Robe Moderne en Pagne Wax Africain",
        "price": 38,
        "category": "Vêtement & Accessoires",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        "description": "Création originale sur tissu wax véritable. Idéale pour cérémonies, mariages et sorties élégantes.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Atelier Haute Couture Zaïre"
    },
    {
        "id": "P007",
        "name": "Costume Homme Slim Fit 2 Pièces Bleu Nuit",
        "price": 85,
        "category": "Vêtement & Accessoires",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
        "description": "Costume élégant taillé sur mesure, veste 2 boutons et pantalon cintré avec doublure satinée.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Sape & Élégance Kinshasa"
    },
    {
        "id": "P008",
        "name": "Chaussures de Ville Cuir Habillées Homme",
        "price": 45,
        "category": "Vêtement & Accessoires",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600",
        "description": "Chaussures derby en cuir véritable pleine fleur, semelle antidérapante et confortable.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Boutique Chaussures Chic"
    },
    {
        "id": "P009",
        "name": "Sculpture Traditionnelle Masque Luba en Bois",
        "price": 65,
        "category": "Arts & Métiers",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600",
        "description": "Pièce d'artisanat authentique taillée à la main dans du bois précieux par des artisans locaux.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Art & Culture RDC"
    },
    {
        "id": "P010",
        "name": "Tableau Peinture à l'Huile Ambiance Kinshasa",
        "price": 90,
        "category": "Arts & Métiers",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600",
        "description": "Oeuvre d'art sur toile représentant la vie quotidienne vibrante des boulevards de Kinshasa.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Galerie Beaux-Arts RDC"
    },
    {
        "id": "P011",
        "name": "Statuette Décorative en Malachite du Katanga",
        "price": 50,
        "category": "Arts & Métiers",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        "description": "Statuette sculptée en pierre de malachite pure aux reflets verts intenses et polis.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Artisans du Katanga"
    },
    {
        "id": "P012",
        "name": "Pneu Tout-Terrain 4x4 Tubeless 265/70 R16",
        "price": 110,
        "category": "Pièces & Accessoires d'Auto et de Moto",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600",
        "description": "Pneu tout-terrain renforcé, conçu pour affronter les pistes et routes difficiles de la RDC.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Auto Pièces Express"
    },
    {
        "id": "P013",
        "name": "Casque Moto Intégral Homologué Sécurité",
        "price": 28,
        "category": "Pièces & Accessoires d'Auto et de Moto",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
        "description": "Casque de protection avec visière anti-rayures, mousse intérieure lavable et aération optimisée.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Moto Congo Sécurité"
    },
    {
        "id": "P014",
        "name": "Batterie Voiture Sans Entretien 12V 70Ah",
        "price": 80,
        "category": "Pièces & Accessoires d'Auto et de Moto",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600",
        "description": "Batterie haute performance adaptée aux climats tropicaux avec garantie 12 mois.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Batteries RDC Pro"
    },
    {
        "id": "P015",
        "name": "Jeu de Plaquettes de Frein Céramique Avant",
        "price": 32,
        "category": "Pièces & Accessoires d'Auto et de Moto",
        "city": "Kisangani",
        "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600",
        "description": "Freinage silencieux, durable et sécurisé pour berlines et SUV japonais et européens.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Garage Central Lubumbashi"
    },
    {
        "id": "P016",
        "name": "Sac à Dos Voyage Antivol & Port USB",
        "price": 28,
        "category": "Sacs, Valises & Boîtes",
        "city": "Kisangani",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        "description": "Sac étanche avec port de charge USB, compartiment ordinateur 15.6 pouces rembourré.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Bag Store RDC"
    },
    {
        "id": "P017",
        "name": "Valise Cabine Rigide 4 Roues Pivotantes 360°",
        "price": 55,
        "category": "Sacs, Valises & Boîtes",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600",
        "description": "Valise en polycarbonate ultralégère avec serrure à combinaison TSA.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Voyage Confort RDC"
    },
    {
        "id": "P018",
        "name": "Sac à Main Femme Cuir Véritable Élégant",
        "price": 42,
        "category": "Sacs, Valises & Boîtes",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
        "description": "Sac à main chic avec bandoulière réglable, poches multiples et finitions dorées.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Maroquinerie du Congo"
    },
    {
        "id": "P019",
        "name": "Savon Liquide Désinfectant Multi-surfaces (Bidon 5L)",
        "price": 9,
        "category": "Produits Chimiques",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=600",
        "description": "Désinfectant professionnel bactéricide pour hôpitaux, hôtels, restaurants et maisons.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Chimie Pro Congo"
    },
    {
        "id": "P020",
        "name": "Eau de Javel Concentrée Purifiante 12° (Bidon 10L)",
        "price": 11,
        "category": "Produits Chimiques",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600",
        "description": "Solution nettoyante et assainissante puissante pour sols, linges et traitement de l'eau.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Laboratoires Congolais"
    },
    {
        "id": "P021",
        "name": "Engrais NPK Fertilisant Agricole (Sac 50kg)",
        "price": 38,
        "category": "Produits Chimiques",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600",
        "description": "Engrais complet équilibré 17-17-17 pour booster la productivité maraîchère et vivrière.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "AgroChimie RDC"
    },
    {
        "id": "P022",
        "name": "Ordinateur Portable Core i7 15.6\" 16Go RAM",
        "price": 499,
        "category": "Produits Informatiques",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
        "description": "Intel Core i7, 16Go RAM DDR4, 512Go SSD NVMe, autonomie 8 heures, clavier rétroéclairé.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Tech Hub RDC"
    },
    {
        "id": "P023",
        "name": "Imprimante Multifonction Wi-Fi Réservoir Rechargeable",
        "price": 160,
        "category": "Produits Informatiques",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600",
        "description": "Impression économique à très faible coût par page, scanner et photocopieur intégrés.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Office Tech Kinshasa"
    },
    {
        "id": "P024",
        "name": "Disque Dur Externe 2To Antichoc USB 3.0",
        "price": 58,
        "category": "Produits Informatiques",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600",
        "description": "Sauvegarde sécurisée de vos fichiers, boîtier résistant aux chutes et transfert ultra-rapide.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Informatika Congo"
    },
    {
        "id": "P025",
        "name": "Routeur Wi-Fi 4G LTE avec Batterie de Secours",
        "price": 45,
        "category": "Produits Informatiques",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
        "description": "Routeur nomade compatible tous réseaux (Vodacom, Airtel, Orange) avec 8h d'autonomie.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Telecom RDC Express"
    },
    {
        "id": "P026",
        "name": "Ciment Gris Haute Résistance 42.5R (Sac 50kg)",
        "price": 10.5,
        "category": "Construction & Décoration",
        "city": "Matadi",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
        "description": "Ciment de référence pour fondations, bétons armés et ouvrages durables.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Congo BTP Matériaux"
    },
    {
        "id": "P027",
        "name": "Peinture Murale Satinée Lavable Blanc (Seau 20L)",
        "price": 34,
        "category": "Construction & Décoration",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600",
        "description": "Peinture acrylique haut pouvoir couvrant pour intérieur et extérieur.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Décoration Moderne RDC"
    },
    {
        "id": "P028",
        "name": "Carrelage Grès Cérame Vitrifié 60x60 (Carton 1.44m²)",
        "price": 16,
        "category": "Construction & Décoration",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600",
        "description": "Carreaux finition marbrée brillante, antidérapants et faciles à entretenir.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Congo Céramiques"
    },
    {
        "id": "P029",
        "name": "Tôle Ondulée Galvanisée Antirouille Épaisseur 0.35mm",
        "price": 9,
        "category": "Construction & Décoration",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "description": "Tôles de toiture résistantes aux fortes pluies tropicales et intempéries.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Quincaillerie Katanga"
    },
    {
        "id": "P030",
        "name": "Smartphone Galaxy Ultra 5G 108MP 256Go",
        "price": 180,
        "category": "Électroniques de Consommation",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
        "description": "Smartphone Android puissant, appareil photo 108MP, écran 6.7 pouces AMOLED 120Hz.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Zaïre-Market Officiel"
    },
    {
        "id": "P031",
        "name": "Écouteurs Sans Fil Bluetooth Réduction de Bruit",
        "price": 22,
        "category": "Électroniques de Consommation",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
        "description": "Autonomie 24 heures avec boîtier, son haute définition et basses profondes.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Electro Kivu"
    },
    {
        "id": "P032",
        "name": "Smart TV LED 43 Pouces 4K Ultra HD avec Android",
        "price": 230,
        "category": "Électroniques de Consommation",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
        "description": "Téléviseur intelligent avec Netflix, YouTube, ports HDMI/USB et son Dolby Surround.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Maison High-Tech"
    },
    {
        "id": "P033",
        "name": "Enceinte Bluetooth Portable Waterproof 30W Bass Boost",
        "price": 35,
        "category": "Électroniques de Consommation",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600",
        "description": "Enceinte nomade résistante aux chocs et éclaboussures, lumière LED dynamique.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Sound Box Congo"
    },
    {
        "id": "P034",
        "name": "Kit Panneau Solaire Monocristallin 200W",
        "price": 95,
        "category": "Électricité & Électronique",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600",
        "description": "Système d'énergie solaire haute performance pour habitations et commerces.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Solaire Congo"
    },
    {
        "id": "P035",
        "name": "Onduleur Solaire Hybride 3KVA 24V Pure Sinus",
        "price": 280,
        "category": "Électricité & Électronique",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1558441719-8b489c63f732?w=600",
        "description": "Convertisseur avec régulateur MPPT intégré pour alimentation électrique continue.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Énergie Verte RDC"
    },
    {
        "id": "P036",
        "name": "Batterie Solaire Gel 12V 200Ah Cyclage Profond",
        "price": 220,
        "category": "Électricité & Électronique",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600",
        "description": "Batterie étanche sans entretien à longue durée de vie pour installation solaire autonome.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Congo Solar Power"
    },
    {
        "id": "P037",
        "name": "Câble Électrique Cuivre Pur 2.5mm² (Rouleau 100m)",
        "price": 40,
        "category": "Électricité & Électronique",
        "city": "Matadi",
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
        "description": "Câble sous gaine ignifugée haute résistance pour installations domestiques et industrielles.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Élec Matériel RDC"
    },
    {
        "id": "P038",
        "name": "Canapé d'Angle Salon Confort 5 Places Tissu Gris",
        "price": 320,
        "category": "Meuble",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
        "description": "Salon modulable avec coussins déhoussables, assise mousse haute résilience.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Mobilier Design RDC"
    },
    {
        "id": "P039",
        "name": "Table à Manger Bois Massif d'Iroko avec 6 Chaises",
        "price": 260,
        "category": "Meuble",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600",
        "description": "Ensemble artisanal en bois dur congolais verni, robuste et intemporel.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Menuiserie d'Art Katanga"
    },
    {
        "id": "P040",
        "name": "Armoire Dressing 3 Portes Coulissantes avec Miroir",
        "price": 195,
        "category": "Meuble",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
        "description": "Grand volume de rangement avec penderie, tiroirs et étagères spacieuses.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Ameublement Moderne Kivu"
    },
    {
        "id": "P041",
        "name": "Tensiomètre Électronique Brassard Précision Médicale",
        "price": 25,
        "category": "Santé & Hygiène",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
        "description": "Mesure instantanée de la tension artérielle et détection d'arythmie cardiaque avec écran LCD.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Santé Plus RDC"
    },
    {
        "id": "P042",
        "name": "Boîte de 50 Masques Chirurgicaux 3 Plis Certifiés",
        "price": 6,
        "category": "Santé & Hygiène",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600",
        "description": "Masques hypoallergéniques à haute filtration bactérienne avec élastiques confortables.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Pharmacie Centrale Kivu"
    },
    {
        "id": "P043",
        "name": "Gel Hydroalcoolique Antibactérien 500ml avec Pompe",
        "price": 4.5,
        "category": "Santé & Hygiène",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600",
        "description": "Formule recommandée OMS éliminant 99.9% des germes et bactéries sans rinçage.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Hygiène Pro Congo"
    },
    {
        "id": "P044",
        "name": "Pèse-personne Électronique Digital en Verre Trempé",
        "price": 15,
        "category": "Santé & Hygiène",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
        "description": "Capteurs de précision pour suivi du poids corporel avec affichage rétroéclairé.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Médical Équipement Katanga"
    },
    {
        "id": "P045",
        "name": "Groupe Électrogène Diesel Insonorisé 5kVA Démarreur Électrique",
        "price": 650,
        "category": "Équipement Industriel & Composants",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
        "description": "Générateur robuste faible consommation idéal pour commerces, ateliers et résidences.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Industrie & Moteurs RDC"
    },
    {
        "id": "P046",
        "name": "Pompe à Eau Solaire Immergée 750W pour Forage",
        "price": 210,
        "category": "Équipement Industriel & Composants",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600",
        "description": "Pompe en acier inoxydable pour puits profonds jusqu'à 80m, débit puissant.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Hydraulique Congo"
    },
    {
        "id": "P047",
        "name": "Compresseur d'Air Électrique 50L 2HP avec Manomètre",
        "price": 175,
        "category": "Équipement Industriel & Composants",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
        "description": "Compresseur à piston pour gonflage, peinture au pistolet et outillage pneumatique.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Atelier Mécanique Express"
    },
    {
        "id": "P048",
        "name": "Multimètre Numérique Professionnel Auto-Range 600V",
        "price": 19,
        "category": "Instruments & Compteurs",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
        "description": "Testeur de tension, courant, résistance et continuité avec écran rétroéclairé.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Électro Mesures RDC"
    },
    {
        "id": "P049",
        "name": "Compteur d'Énergie Électrique Prépayé Monophasé DIN",
        "price": 38,
        "category": "Instruments & Compteurs",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1558441719-8b489c63f732?w=600",
        "description": "Sous-compteur divisionnaire pour gestion locative et suivi précis de consommation kWh.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Élec Pro Katanga"
    },
    {
        "id": "P050",
        "name": "Thermomètre Infrarouge Laser Industriel Sans Contact",
        "price": 24,
        "category": "Instruments & Compteurs",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
        "description": "Mesure thermique instantanée de -50°C à +550°C pour maintenance et moteurs.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Instruments & Diagnostics RDC"
    },
    {
        "id": "P051",
        "name": "Réchaud à Gaz 2 Feux Inox Haute Pression",
        "price": 26,
        "category": "Industrie Légère & Articles d'Usage Courant",
        "city": "Kisangani",
        "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600",
        "description": "Réchaud économique et sécurisé pour cuisine familiale et petits restaurants.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Ménage Confort Congo"
    },
    {
        "id": "P052",
        "name": "Bouteille Thermos Isotherme Inox 2 Litres Double Paroi",
        "price": 14,
        "category": "Industrie Légère & Articles d'Usage Courant",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600",
        "description": "Maintient l'eau chaude ou fraîche pendant plus de 24 heures sans altérer le goût.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Cuisine Moderne Kinshasa"
    },
    {
        "id": "P053",
        "name": "Machine à Gaufres & Sandwiches Électrique 3-en-1",
        "price": 29,
        "category": "Industrie Légère & Articles d'Usage Courant",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
        "description": "Plaques antiadhésives interchangeables avec thermostat automatique.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Électroménager Kivu"
    },
    {
        "id": "P054",
        "name": "Projecteur Solaire LED 100W Extérieur avec Télécommande",
        "price": 42,
        "category": "Luminaire & Éclairage",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
        "description": "Éclairage puissant étanche IP67 pour cours, façades et avenues sécurisées.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Lumière & Sécurité RDC"
    },
    {
        "id": "P055",
        "name": "Lampe Torche Rechargeable LED Puissante 5000LM Longue Portée",
        "price": 18,
        "category": "Luminaire & Éclairage",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600",
        "description": "Lampe tactique en alliage aluminium avec zoom réglable et batterie longue autonomie.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Équipement Kivu"
    },
    {
        "id": "P056",
        "name": "Lot de 10 Ampoules LED Éco 9W E27 Blanc Chaud",
        "price": 12,
        "category": "Luminaire & Éclairage",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1532007413944-64e702213530?w=600",
        "description": "Consommation réduite de 85% par rapport aux ampoules incandescentes classiques.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Éclairage Moderne Katanga"
    },
    {
        "id": "P057",
        "name": "Lustre Suspension Design Moderne 3 Cercles LED Salon",
        "price": 88,
        "category": "Luminaire & Éclairage",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
        "description": "Lustre décoratif contemporain à intensité variable avec commande à distance.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Déco Éclairage Kinshasa"
    },
    {
        "id": "P058",
        "name": "Moulin Électrique à Manioc, Maïs & Céréales 3kW",
        "price": 340,
        "category": "Machinerie de Fabrication & de Façonnage",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
        "description": "Machine de broyage rapide et fine pour meuneries communautaires et petits ateliers.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Machines Agro RDC"
    },
    {
        "id": "P059",
        "name": "Presse Manuelle à Briques Autobloquantes Écologiques",
        "price": 290,
        "category": "Machinerie de Fabrication & de Façonnage",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
        "description": "Production de briques en terre stabilisée sans cuisson pour construction économique.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "BTP Innovations Congo"
    },
    {
        "id": "P060",
        "name": "Soudeuse Thermique Sacs Plastiques avec Minuteur 30cm",
        "price": 25,
        "category": "Machinerie de Fabrication & de Façonnage",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600",
        "description": "Fermeture hermétique propre pour emballage de denrées alimentaires et produits secs.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Packaging Matériel RDC"
    },
    {
        "id": "P061",
        "name": "Échantillon Minéral Cuivre Brut du Katanga (Collection)",
        "price": 45,
        "category": "Métallurgie, Minéral & Énergie",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        "description": "Spécimen minéral naturel pur extrait des carrières minières du Lualaba.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Minéraux du Katanga"
    },
    {
        "id": "P062",
        "name": "Barre de Fer à Béton Nervuré FeE400 Ø12mm (Barre 12m)",
        "price": 9.5,
        "category": "Métallurgie, Minéral & Énergie",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
        "description": "Acier de construction haute résistance certifié pour poteaux et dalles de bâtiment.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Aciérie & Métal RDC"
    },
    {
        "id": "P063",
        "name": "Charbon Actif Végétal Naturel Purifié (Sac 25kg)",
        "price": 28,
        "category": "Métallurgie, Minéral & Énergie",
        "city": "Kisangani",
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
        "description": "Produit absorbant pour filtration des eaux, purification d'air et usage agricole.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Énergie Verte Congo"
    },
    {
        "id": "P064",
        "name": "Carton de 5 Ramettes Papier A4 80g Extra Blanc",
        "price": 24,
        "category": "Fournitures de Bureau",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
        "description": "Papier laser et jet d'encre premium sans bourrage pour administrations et entreprises.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Papeterie Centrale RDC"
    },
    {
        "id": "P065",
        "name": "Fauteuil de Bureau Ergonomique Cuir avec Accoudoirs",
        "price": 125,
        "category": "Fournitures de Bureau",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=600",
        "description": "Dossier inclinable et hauteur ajustable pour un confort de travail quotidien prolongé.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Bureautique Pro Katanga"
    },
    {
        "id": "P066",
        "name": "Tableau Blanc Magnétique 90x60cm avec Kit Feutres",
        "price": 22,
        "category": "Fournitures de Bureau",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600",
        "description": "Tableau d'affichage et de réunion effaçable à sec avec cadre en aluminium.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Office Fournitures Kivu"
    },
    {
        "id": "P067",
        "name": "Lot de 6 Rouleaux Ruban Adhésif Transparent 50mm x 100m",
        "price": 11,
        "category": "Emballage & Impression",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600",
        "description": "Ruban adhésif haute adhérence pour scellement sécurisé de cartons et colis.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Emballage Pro Kinshasa"
    },
    {
        "id": "P068",
        "name": "Lot de 10 Cartons de Déménagement Renforcés Double Cannelure",
        "price": 18,
        "category": "Emballage & Impression",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600",
        "description": "Cartons pliables résistants aux charges lourdes pour expédition fret national.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Packaging Express RDC"
    },
    {
        "id": "P069",
        "name": "Paquet de 100 Pochettes d'Expédition Kraft Écologiques",
        "price": 16,
        "category": "Emballage & Impression",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
        "description": "Enveloppes kraft indéchirables pour envois postaux et commerce en ligne.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Kivu Packaging"
    },
    {
        "id": "P070",
        "name": "Caméra de Surveillance Solaire 4G Extérieure 360° Sans Fil",
        "price": 95,
        "category": "Sécurité & Protection",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600",
        "description": "Caméra autonome avec panneau solaire, vision nocturne couleur et alertes sur smartphone.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Zaïre Protection High-Tech"
    },
    {
        "id": "P071",
        "name": "Bottes de Sécurité Chantier Coquées Embout Acier S3",
        "price": 32,
        "category": "Sécurité & Protection",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        "description": "Chaussures montantes en cuir hydrofuge avec semelle anti-perforation pour mines et BTP.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Sécurité Mines RDC"
    },
    {
        "id": "P072",
        "name": "Extincteur à Poudre ABC 6kg Homologué Sécurité Incendie",
        "price": 39,
        "category": "Sécurité & Protection",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600",
        "description": "Appareil d'extinction rapide pour feux de solides, liquides et gaz avec manomètre.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Protection Civile Équipement"
    },
    {
        "id": "P073",
        "name": "Gilet Haute Visibilité Réfléchissant avec Bandes Fluo",
        "price": 5.5,
        "category": "Sécurité & Protection",
        "city": "Matadi",
        "image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600",
        "description": "Gilet de sécurité léger fermeture scratch pour conducteurs, chantiers et manutention.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Signalisation Congo"
    },
    {
        "id": "P074",
        "name": "Forfait Maintenance & Dépannage Informatique Réseaux",
        "price": 30,
        "category": "Service",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
        "description": "Assistance technique complète sur site ou à distance : réparation PC, nettoyage virus, Wi-Fi.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Kinshasa IT Solutions"
    },
    {
        "id": "P075",
        "name": "Service de Livraison Express Colis Interurbain Kin-L'shi",
        "price": 20,
        "category": "Service",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
        "description": "Fret aérien rapide et traçable en 48 heures entre Kinshasa, Lubumbashi et Kolwezi.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Zaïre Express Courrier"
    },
    {
        "id": "P076",
        "name": "Conception & Impression de 500 Cartes de Visite Professionnelles",
        "price": 25,
        "category": "Service",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
        "description": "Design graphique moderne et impression recto-verso sur papier couché 350g pelliculé.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Studio Graphique Kivu"
    },
    {
        "id": "P077",
        "name": "Ballon de Football Officiel Match Cuir Synthétique Taille 5",
        "price": 16,
        "category": "Sports & Loisirs",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600",
        "description": "Ballon thermosoudé haute durabilité pour entraînements et matchs sur terrains synthétiques et gazon.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Sport Store Zaïre"
    },
    {
        "id": "P078",
        "name": "Tapis de Gymnastique & Yoga Antidérapant Épais 10mm",
        "price": 14,
        "category": "Sports & Loisirs",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
        "description": "Tapis écologique avec sangle de transport, parfait pour pilates, fitness et étirements.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Fitness Club RDC"
    },
    {
        "id": "P079",
        "name": "Vélo VTT Tout-Terrain 26 Pouces 21 Vitesses Freins à Disque",
        "price": 175,
        "category": "Sports & Loisirs",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600",
        "description": "Cadre aluminium renforcé, suspension avant amortissante pour routes pavées et sentiers du Kivu.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Vélo Kivu Évasion"
    },
    {
        "id": "P080",
        "name": "Paire d'Haltères Réglables Musculation 20kg avec Mallette",
        "price": 45,
        "category": "Sports & Loisirs",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600",
        "description": "Disques en fonte chromée avec barre moletée antiglisse pour musculation à domicile.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Muscu Pro Congo"
    },
    {
        "id": "P081",
        "name": "Pièce Complète Pagne Wax Hollandais Véritable (6 Yards)",
        "price": 75,
        "category": "Textile",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600",
        "description": "Tissu wax de renommée internationale, 100% coton peigné, motifs et couleurs vibrantes inaltérables.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Maison du Wax Zaïre"
    },
    {
        "id": "P082",
        "name": "Rouleau Tissu Rideau Occultant Grande Largeur (10 Mètres)",
        "price": 55,
        "category": "Textile",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",
        "description": "Tissu thermique et isolant phonique pour décoration d'intérieur et salons de standing.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Textiles Déco Katanga"
    },
    {
        "id": "P083",
        "name": "Rouleau Tissu Popeline 100% Coton Blanc pour Uniformes (25m)",
        "price": 48,
        "category": "Textile",
        "city": "Kisangani",
        "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600",
        "description": "Matière première textile douce et résistante pour tenues médicales, scolaires et hôtellerie.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Comptoir Textile Congo"
    },
    {
        "id": "P084",
        "name": "Mallette Complète d'Outillage 108 Pièces Chrome Vanadium",
        "price": 65,
        "category": "Outils & Quincaillerie",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600",
        "description": "Jeu de clés à douilles, cliquets, embouts de vissage et pinces en coffret antichoc.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Bricolage Express RDC"
    },
    {
        "id": "P085",
        "name": "Perceuse Visseuse Sans Fil 20V avec 2 Batteries Li-ion",
        "price": 70,
        "category": "Outils & Quincaillerie",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600",
        "description": "Mandrin auto-serrant 13mm avec éclairage LED et chargeur rapide, couple puissant.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Outillage Pro Katanga"
    },
    {
        "id": "P086",
        "name": "Meuleuse d'Angle Électrique 115mm 850W avec Carter",
        "price": 38,
        "category": "Outils & Quincaillerie",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600",
        "description": "Outil compact et puissant pour découpe et ébavurage des métaux et du béton.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Mines Quincaillerie"
    },
    {
        "id": "P087",
        "name": "Cadenas Haute Sécurité en Acier Trempé Blindé 70mm",
        "price": 12,
        "category": "Outils & Quincaillerie",
        "city": "Matadi",
        "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600",
        "description": "Verrouillage anti-scie et anti-perçage pour conteneurs, hangars et grilles.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Quincaillerie Centrale Matadi"
    },
    {
        "id": "P088",
        "name": "Voiture Télécommandée Tout-Terrain 4WD Électrique Batterie",
        "price": 32,
        "category": "Jouets",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600",
        "description": "Monster truck tout-terrain échelle 1:16 avec suspensions indépendantes et portée 50m.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Monde des Enfants RDC"
    },
    {
        "id": "P089",
        "name": "Coffret Jeu de Construction Briques Créatives 500 Pièces",
        "price": 22,
        "category": "Jouets",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600",
        "description": "Jeu éducatif stimulant la créativité et la motricité fine des enfants dès 4 ans.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Jouets & Éveil Congo"
    },
    {
        "id": "P090",
        "name": "Poupée Parlante Éducative Interactive avec Vêtements",
        "price": 18,
        "category": "Jouets",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600",
        "description": "Poupée souple avec sons réalistes et accessoires de puériculture.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Boutique Bambin Kivu"
    },
    {
        "id": "P091",
        "name": "Moto Tricycle Cargo Benne Motorisée 200cc pour Fret",
        "price": 1850,
        "category": "Transport",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
        "description": "Tricycle utilitaire robuste pour transport de marchandises, capacité de charge 800kg.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Zaïre Moto Motors"
    },
    {
        "id": "P092",
        "name": "Trottinette Électrique Pliable Adulte 350W 25km/h Autonomie 30km",
        "price": 280,
        "category": "Transport",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600",
        "description": "Mobilité urbaine pratique avec freins à disque, pneus increvables et phare LED.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Éco-Mobilité RDC"
    },
    {
        "id": "P093",
        "name": "Remorque Utilitaire Basculante pour Moto / Quad Homologuée",
        "price": 340,
        "category": "Transport",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
        "description": "Châssis en acier galvanisé avec ridelles amovibles pour transport agricole et colis.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Transports RDC Logistique"
    },
    {
        "id": "P094",
        "name": "Polo Lacoste Classic Fit 100% Coton Piqué Original",
        "price": 35,
        "category": "Habits de Différentes Marques",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600",
        "description": "Polo Lacoste authentique avec logo crocodile brodé, coupe regular fit confortable, tissu respirant haute qualité.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Boutique Marques & Sape Kinshasa"
    },
    {
        "id": "P095",
        "name": "Jean Denim Brut Original Levi's 511 Slim Fit",
        "price": 48,
        "category": "Habits de Différentes Marques",
        "city": "Lubumbashi",
        "image": "https://images.unsplash.com/photo-1542272604-780c96856592?w=600",
        "description": "Jean Levi's 511 denim résistant avec rivets métalliques d'origine et étiquette en cuir emblématique.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Denim Store Katanga"
    },
    {
        "id": "P096",
        "name": "Chemise Oxford Ralph Lauren Slim Fit Manches Longues",
        "price": 42,
        "category": "Habits de Différentes Marques",
        "city": "Kinshasa",
        "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
        "description": "Chemise en coton Oxford avec logo cavalier brodé sur la poitrine, col boutonné, finition soignée.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Élégance Prestige Gombe"
    },
    {
        "id": "P097",
        "name": "Ensemble Survêtement Nike Sportswear Tech Fleece Complet",
        "price": 68,
        "category": "Habits de Différentes Marques",
        "city": "Goma",
        "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600",
        "description": "Survêtement Nike Tech Fleece ultra-léger et thermique, veste zippée avec capuche et pantalon assorti.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Nike Store Kivu"
    },
    {
        "id": "P098",
        "name": "Veste Blazer Zara Man Coupe Italienne Moderne",
        "price": 75,
        "category": "Habits de Différentes Marques",
        "city": "Bukavu",
        "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
        "description": "Blazer cintré de marque Zara avec revers à cran, poches passepoilées et doublure en soie satinée.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Mode & Tendances Bukavu"
    },
    {
        "id": "P099",
        "name": "T-shirt Tommy Hilfiger Signature Coton Bio Col Rond",
        "price": 28,
        "category": "Habits de Différentes Marques",
        "city": "Kolwezi",
        "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
        "description": "T-shirt Tommy Hilfiger coupe droite en jersey de coton pur avec bande tricolore signature sur la poitrine.",
        "status": "disponible",
        "sellerId": "SUPER-ADMIN-001",
        "sellerName": "Streetwear Katanga"
    }
];

// Chargement et mise à niveau automatique du catalogue
let storedVersion = localStorage.getItem("zm_catalog_version");
let products = loadData("zm_products", null);

if (!products || products.length < 80 || storedVersion !== CATALOG_VERSION) {
  products = INITIAL_PRODUCTS;
  saveData("zm_products", products);
  localStorage.setItem("zm_catalog_version", CATALOG_VERSION);
}

/**
 * Synchronisation du catalogue avec la base de données centrale MySQL
 */
async function syncProductsFromDatabase() {
  if (typeof ApiClient === "undefined") return;
  try {
    const res = await ApiClient.getProducts();
    if (res && res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
      products = res.data;
      saveData("zm_products", products);
      if (document.getElementById("productList")) {
        displayProducts();
      }
      if (typeof renderHomeFeaturedProducts === "function") {
        renderHomeFeaturedProducts();
      }
    }
  } catch (err) {
    console.warn("[Products] API MySQL indisponible, utilisation du cache local:", err.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  syncProductsFromDatabase();
});

function displayProducts() {
  const list = document.getElementById("productList");
  if (!list) return;

  const searchInput = (document.getElementById("productSearch")?.value || document.getElementById("homeSearch")?.value || "").trim().toLowerCase();
  const search = searchInput;
  const category = document.getElementById("categoryFilter")?.value || "all";
  const city = document.getElementById("cityFilter")?.value || "all";
  const sort = document.getElementById("sortFilter")?.value || "newest";

  if (typeof products === "undefined" || !Array.isArray(products)) {
    products = loadData("zm_products", INITIAL_PRODUCTS) || INITIAL_PRODUCTS;
  }

  let filtered = products.filter(product => {
    if (!product) return false;
    // Si l'activité/produit a été suspendue par le propriétaire, masquer du marché public
    if (product.status === "suspendu" || product.status === "archive") {
      return false;
    }

    const pName = String(product.name || "").toLowerCase();
    const pDesc = String(product.description || "").toLowerCase();
    const pCity = String(product.city || "").toLowerCase().trim();
    const pCat = String(product.category || "").toLowerCase().trim();
    const pSeller = String(product.sellerName || "").toLowerCase();

    const matchSearch = !search ||
      pName.includes(search) ||
      pDesc.includes(search) ||
      pCity.includes(search) ||
      pCat.includes(search) ||
      pSeller.includes(search);

    const matchCategory = (category === "all") || (pCat === String(category).toLowerCase().trim());
    
    // Filtrage robuste insensible à la casse, espaces et variations de ville
    const targetCityClean = String(city).toLowerCase().trim();
    const matchCity = (city === "all") || (pCity === targetCityClean) || (pCity.length > 2 && targetCityClean.includes(pCity)) || (targetCityClean.length > 2 && pCity.includes(targetCityClean));

    return matchSearch && matchCategory && matchCity;
  });

  // Triage et ordonnancement (prix, nouveautés, ET tri alphabétique par ville)
  if (sort === "price-asc") {
    filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  } else if (sort === "city-asc") {
    filtered.sort((a, b) => String(a.city || "").localeCompare(String(b.city || ""), "fr", { sensitivity: "base" }));
  } else if (sort === "city-desc") {
    filtered.sort((a, b) => String(b.city || "").localeCompare(String(a.city || ""), "fr", { sensitivity: "base" }));
  } else if (sort === "name-asc") {
    filtered.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "fr", { sensitivity: "base" }));
  }

  // Mise à jour du compteur de résultats
  const counterElem = document.getElementById("productResultCount");
  if (counterElem) {
    const cityLabel = (city !== "all") ? ` à ${city}` : "";
    counterElem.textContent = `${filtered.length} produit${filtered.length > 1 ? "s" : ""}${cityLabel}`;
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-light);">
        <i class="fa-solid fa-location-dot" style="font-size: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
        <h3 style="color: var(--text-main); margin-bottom: 6px;">Aucun article disponible ${city !== "all" ? `à ${escapeHTML(city)}` : "pour ces critères"}</h3>
        <p style="color: var(--text-muted); font-size: 14px;">Essayez une autre ville ou réinitialisez vos filtres pour voir les offres d'autres provinces.</p>
        <button class="btn btn-secondary" style="margin-top: 16px;" onclick="resetProductFilters()">
          <i class="fa-solid fa-rotate-left"></i> Voir toutes les villes (RDC)
        </button>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map(product => {
    const cdfPrice = Math.round(Number(product.price) * 2850).toLocaleString("fr-FR");
    const cityText = escapeHTML(product.city || "RDC");
    return `
      <div class="product-card">
        <div class="product-card-img-wrap">
          <img
            src="${escapeHTML(product.image || 'https://via.placeholder.com/400x300?text=Produit')}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/400x300?text=Zaïre-Market'"
          >
          <button
            type="button"
            class="product-card-city-tag"
            onclick="event.stopPropagation(); filterCity('${escapeHTML(product.city || '')}')"
            title="Filtrer uniquement les articles de ${cityText}"
          >
            <i class="fa-solid fa-location-dot"></i> ${cityText}
          </button>
        </div>

        <div class="product-card-body">
          <span class="product-card-category">${escapeHTML(product.category)}</span>
          <h3 class="product-card-title" title="${escapeHTML(product.name)}">${escapeHTML(product.name)}</h3>

          <div class="product-card-seller">
            <i class="fa-solid fa-circle-check" style="color: #0284c7;"></i>
            <span>${escapeHTML(product.sellerName || "Vendeur RDC")}</span>
          </div>

          <div class="product-card-price-row">
            <div>
              <div class="product-card-price">$${Number(product.price).toFixed(2)}</div>
              <div class="product-card-price-cdf">≈ ${cdfPrice} FC</div>
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn-add-cart" onclick="addToCart('${product.id}', this)">
              <i class="fa-solid fa-cart-plus"></i> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Filtrer directement le catalogue par ville (avec synchronisation de la liste déroulante)
 */
function filterCity(cityName) {
  if (!cityName) return;
  const targetCity = cityName.trim();
  showPage("products");

  const citySelect = document.getElementById("cityFilter");
  if (citySelect) {
    let found = false;
    for (let i = 0; i < citySelect.options.length; i++) {
      if (citySelect.options[i].value.toLowerCase().trim() === targetCity.toLowerCase()) {
        citySelect.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOption = document.createElement("option");
      newOption.value = targetCity;
      newOption.textContent = targetCity;
      newOption.selected = true;
      citySelect.appendChild(newOption);
    }
  }

  displayProducts();
  const el = document.getElementById("productList");
  if (el) {
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
  showToast(`Filtrage actif pour la ville de ${targetCity} 🇨🇩`, "info");
}

/**
 * Rendu des Nouveautés & Ventes Vedettes sur la page d'accueil
 */
function renderHomeFeaturedProducts() {
  const container = document.getElementById("homeFeaturedProductsGrid");
  if (!container) return;

  if (typeof products === "undefined" || !Array.isArray(products) || products.length === 0) {
    products = loadData("zm_products", []) || [];
  }

  const featured = products.slice(0, 8);
  container.innerHTML = featured.map(product => {
    const cdfPrice = Math.round(Number(product.price) * 2850).toLocaleString("fr-FR");
    return `
      <div class="product-card">
        <div class="product-card-img-wrap">
          <img
            src="${escapeHTML(product.image || 'https://via.placeholder.com/400x300?text=Produit')}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/400x300?text=Zaïre-Market'"
          >
          <button
            type="button"
            class="product-card-city-tag"
            onclick="event.stopPropagation(); filterCity('${escapeHTML(product.city || '')}')"
            title="Filtrer les produits de ${escapeHTML(product.city || '')}"
          >
            <i class="fa-solid fa-location-dot"></i> ${escapeHTML(product.city || 'RDC')}
          </button>
        </div>

        <div class="product-card-body">
          <span class="product-card-category">${escapeHTML(product.category)}</span>
          <h3 class="product-card-title" title="${escapeHTML(product.name)}">${escapeHTML(product.name)}</h3>

          <div class="product-card-seller">
            <i class="fa-solid fa-circle-check" style="color: #0284c7;"></i>
            <span>${escapeHTML(product.sellerName || "Vendeur Certifié RDC")}</span>
          </div>

          <div class="product-card-price-row">
            <div>
              <div class="product-card-price">$${Number(product.price).toFixed(2)}</div>
              <div class="product-card-price-cdf">≈ ${cdfPrice} FC</div>
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn-add-cart" onclick="addToCart('${product.id}', this)">
              <i class="fa-solid fa-cart-plus"></i> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Compte à rebours en direct pour la vente flash du jour (Bento Hub)
 */
let flashCountdownInterval = null;
function startFlashCountdown() {
  if (flashCountdownInterval) return;

  let totalSecs = 4 * 3600 + 32 * 60 + 18; // 04:32:18
  function tick() {
    totalSecs--;
    if (totalSecs < 0) totalSecs = 12 * 3600;

    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    const elH = document.getElementById("flashHours");
    const elM = document.getElementById("flashMins");
    const elS = document.getElementById("flashSecs");

    if (elH) elH.textContent = String(h).padStart(2, "0");
    if (elM) elM.textContent = String(m).padStart(2, "0");
    if (elS) elS.textContent = String(s).padStart(2, "0");
  }

  tick();
  flashCountdownInterval = setInterval(tick, 1000);
}

/**
 * Mise à jour dynamique du Cockpit Utilisateur du Bento Hub
 */
function updateHomeCockpit() {
  const usernameElem = document.getElementById("cockpitUserName");
  const roleElem = document.getElementById("cockpitUserRole");

  if (typeof currentUser !== "undefined" && currentUser) {
    if (usernameElem) usernameElem.textContent = currentUser.name || "Utilisateur";
    if (roleElem) {
      if (currentUser.role === "super_admin") {
        roleElem.textContent = "👑 Propriétaire du Système";
        roleElem.className = "cockpit-role-badge badge badge-danger";
      } else if (currentUser.role === "admin") {
        roleElem.textContent = "🛡️ Administrateur";
        roleElem.className = "cockpit-role-badge badge badge-warning";
      } else {
        roleElem.textContent = "Client Vérifié";
        roleElem.className = "cockpit-role-badge badge badge-category";
      }
    }
  } else {
    if (usernameElem) usernameElem.textContent = "Visiteur";
    if (roleElem) {
      roleElem.textContent = "Non connecté";
      roleElem.className = "cockpit-role-badge badge badge-category";
    }
  }
}

/**
 * Filtrer directement le catalogue par les puces interactives (Chips bar)
 */
function quickFilterCatalogCategory(catName, btn) {
  document.querySelectorAll("#productsCategoryChips .chip-item").forEach(b => b.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  }

  const catSelect = document.getElementById("categoryFilter");
  if (catSelect) {
    catSelect.value = catName;
  }
  displayProducts();
  if (catName !== "all") {
    showToast(`Rayon actif : ${catName} 🇨🇩`, "info");
  }
}

/**
 * Réinitialiser les filtres
 */
function resetProductFilters() {
  const s = document.getElementById("productSearch");
  const hs = document.getElementById("homeSearch");
  const c = document.getElementById("categoryFilter");
  const ci = document.getElementById("cityFilter");
  const so = document.getElementById("sortFilter");
  if (s) s.value = "";
  if (hs) hs.value = "";
  if (c) c.value = "all";
  if (ci) ci.value = "all";
  if (so) so.value = "newest";

  document.querySelectorAll("#productsCategoryChips .chip-item").forEach(b => {
    b.classList.remove("active");
  });
  const allChip = document.querySelector("#productsCategoryChips .chip-item:first-child");
  if (allChip) allChip.classList.add("active");

  displayProducts();
  showToast("Tous les filtres réinitialisés. Affichage complet.", "info");
}

/**
 * Recherche instantanée depuis la barre de recherche globale
 */
function searchFromHome() {
  const value = document.getElementById("homeSearch").value;
  showPage("products");
  const productSearch = document.getElementById("productSearch");
  if (productSearch) {
    productSearch.value = value;
  }
  displayProducts();
}

/**
 * Simulation de recherche par caméra / photo (fonctionnalité du bouton photo)
 */
function triggerCameraSearch() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast(`Recherche visuelle simulée pour "${file.name}"`, "info");
      showPage("products");
      displayProducts();
    }
  };
  input.click();
}

/**
 * Prévisualisation de l'image lors de la saisie d'un URL de produit
 */
function previewProductImage() {
  const url = document.getElementById("productImage")?.value;
  const preview = document.getElementById("productImagePreview");
  if (preview) {
    if (url && url.startsWith("http")) {
      preview.src = url;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  }
}

/**
 * Gestion du formulaire de vente d'un produit (Enregistrement API REST MySQL & Fallback)
 */
document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", async function(event) {
      event.preventDefault();

      if (!currentUser) {
        showToast("Création de compte obligatoire : vous devez créer un compte ou vous connecter pour vendre sur Zaïre-Market.", "error");
        showPage("account");
        showRegister();
        return;
      }

      if (currentUser.status === "suspended") {
        showToast("Action refusée : votre compte est temporairement suspendu par le propriétaire du système.", "error");
        return;
      }

      if (currentUser.status === "blocked") {
        showToast("Action refusée : votre compte est définitivement bloqué par le propriétaire du système.", "error");
        return;
      }

      const name = document.getElementById("productName").value.trim();
      const price = Number(document.getElementById("productPrice").value);
      const category = document.getElementById("productCategory").value;
      const city = document.getElementById("productCity").value;
      const image = document.getElementById("productImage").value.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
      const description = document.getElementById("productDescription").value.trim();

      // Tentative d'enregistrement via l'API REST MySQL
      if (typeof ApiClient !== "undefined" && ApiClient.getToken()) {
        try {
          const res = await ApiClient.createProduct({
            name,
            price,
            category,
            city,
            image,
            description
          });
          if (res && res.status === "success" && res.product) {
            products.unshift(res.product);
            saveData("zm_products", products);
            logActivity(`Produit certifié serveur publié : ${res.product.name}`);
            this.reset();
            previewProductImage();
            showToast("Produit certifié et publié avec succès sur Zaïre-Market !", "success");
            showPage("products");
            return;
          }
        } catch (apiErr) {
          console.warn("[Products] Échec API, enregistrement local de secours:", apiErr);
        }
      }

      // Enregistrement local de secours
      const newProduct = {
        id: generateId("PROD"),
        name,
        price,
        category,
        city,
        image,
        description,
        status: "disponible",
        sellerId: currentUser.id,
        sellerName: currentUser.name
      };

      products.unshift(newProduct);
      saveData("zm_products", products);
      logActivity(`Nouveau produit publié : ${newProduct.name}`);

      this.reset();
      previewProductImage();
      showToast("Produit publié avec succès sur Zaïre-Market !", "success");
      showPage("products");
    });
  }
});
