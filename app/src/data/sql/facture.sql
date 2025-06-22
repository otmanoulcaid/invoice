DROP TABLE IF EXISTS Facture;

CREATE TABLE IF NOT EXISTS Facture (
    numero TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    client TEXT NOT NULL,
    FOREIGN KEY (client) REFERENCES Client(nom)
);

INSERT INTO Facture (numero, date, client) VALUES 
('FAC-001', '2025-06-21', 'Bara Wissal'),
('FAC-002', '2025-06-22', 'Haimoura Houssameddine'),
('FAC-003', '2025-06-23', 'aymane lamhamdi'),
('FAC-004', '2025-06-24', 'Oulcaid Otman'),
('FAC-005', '2025-06-25', 'Bozari Zakaria'),
('FAC-006', '2025-06-26', 'El Bakkouri Salma'),
('FAC-007', '2025-06-20', 'Bara Wissal'),
('FAC-008', '2025-06-21', 'Haimoura Houssameddine'),
('FAC-009', '2025-06-22', 'aymane lamhamdi'),
('FAC-010', '2025-06-24', 'Bozari Zakaria');