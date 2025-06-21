CREATE TABLE IF NOT EXISTS Client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    adress TEXT,
    ville TEXT,
    pays TEXT
);

INSERT INTO Client (nom, adress, ville, pays) VALUES 
('Otman Oulcaid', '123 Rue Principale', 'fes', 'Maroc'),
('aymane lamhamdi', '45 Avenue des Champs', 'casa', 'Maroc');
