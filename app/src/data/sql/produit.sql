
CREATE TABLE IF NOT EXISTS Produit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix_u REAL NOT NULL,
    qty INTEGER NOT NULL,
    facture_id INTEGER,
    FOREIGN KEY (facture_id) REFERENCES Facture(id)
);

INSERT INTO Produit (nom, prix_u, qty, facture_id) VALUES 
('Ordinateur Portable', 12000.00, 2, 1),
('Souris Bluetooth', 250.00, 3, 1),
('Imprimante Laser', 1500.00, 1, 2),
('Clavier Mécanique', 700.00, 1, 2);
