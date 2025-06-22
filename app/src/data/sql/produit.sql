DROP TABLE Produit;

CREATE TABLE IF NOT EXISTS Produit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix_u REAL NOT NULL,
    qty INTEGER NOT NULL,
    facture_id TEXT NOT NULL,
    FOREIGN KEY (facture_id) REFERENCES Facture(id)
);

INSERT INTO Produit (nom, prix_u, qty, facture_id) VALUES 
('Ordinateur Portable', 12000.00, 2, 'FAC-001'),
('Souris Bluetooth', 250.00, 3, 'FAC-001'),
('Imprimante Laser', 1500.00, 1, 'FAC-002'),
('Clavier Mécanique', 700.00, 1, 'FAC-002');
