
CREATE TABLE IF NOT EXISTS Facture (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL,
    date TEXT NOT NULL,
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES Client(id)
);

INSERT INTO Facture (numero, date, client_id) VALUES 
('FAC-001', '2025-06-21', 1),
('FAC-002', '2025-06-20', 2);
