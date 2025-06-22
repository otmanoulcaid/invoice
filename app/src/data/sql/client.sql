DROP TABLE IF EXISTS Client;

CREATE TABLE IF NOT EXISTS Client (
    nom TEXT PRIMARY KEY,
    adress TEXT,
    ville TEXT,
    pays TEXT
);

INSERT INTO Client (nom, adress, ville, pays) VALUES 
('Bara Wissal', 'quartier inbiat', 'sale', 'Maroc'),
('Haimoura Houssameddine', 'medina', 'fes', 'Maroc'),
('aymane lamhamdi', 'route ain chkef', 'fes', 'Maroc'),
('Oulcaid Otman', '123 Rue Principale', 'fes', 'Maroc'),
('Bozari Zakaria', 'twin center', 'casablanca', 'Maroc'),
('El Bakkouri Salma', 'quartier dkkarat', 'fes', 'Maroc');
