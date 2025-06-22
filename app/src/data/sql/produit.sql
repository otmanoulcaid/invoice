DROP TABLE Produit;

CREATE TABLE IF NOT EXISTS Produit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix_u REAL NOT NULL,
    qty INTEGER NOT NULL,
    facture TEXT NOT NULL,
    FOREIGN KEY (facture) REFERENCES Facture(numero)
);

INSERT INTO Produit (nom, prix_u, qty, facture) VALUES 
('Ordinateur Portable', 12000.00, 2, 'FAC-001'),
('Souris Bluetooth', 250.00, 3, 'FAC-001'),
('Écran 4K', 3000.00, 1, 'FAC-002'),
('Clé USB 64GB', 100.00, 5, 'FAC-003'),
('Casque Audio', 500.00, 2, 'FAC-003'),
('Webcam HD', 400.00, 1, 'FAC-004'),
('Routeur Wi-Fi', 800.00, 1, 'FAC-004'),
('Disque Dur Externe', 1200.00, 1, 'FAC-005'),
('Tablette Graphique', 2000.00, 1, 'FAC-005'),
('Support pc Portable', 300.00, 2, 'FAC-006'),
('Clavier Ergonomique', 600.00, 1, 'FAC-007'),
('Station d’Accueil USB-D', 900.00, 1, 'FAC-007'),
('Câble HDMI', 50.00, 10, 'FAC-008'),
('Clavier Mécanique', 700.00, 1, 'FAC-008'),
('Support PC Portable 18cm', 300.00, 2, 'FAC-009'),
('Clavier Ergonomique', 600.00, 1, 'FAC-010'),
('USB Kingstom', 900.00, 1, 'FAC-010'),
('Chargeur Universel', 150.00, 4, 'FAC-001'),
('Support PC Portable 20cm', 300.00, 2, 'FAC-002'),
('Clavier Ergonomique', 600.00, 1, 'FAC-003'),
('Station d’Accueil USB-C', 900.00, 1, 'FAC-004'),
('Câble HDMI', 50.00, 10, 'FAC-005'),
('Clavier Mécanique', 700.00, 1, 'FAC-006'),
('Support PC Portable 15cm', 300.00, 2, 'FAC-008'),
('Ecran acer', 900.00, 1, 'FAC-010');

