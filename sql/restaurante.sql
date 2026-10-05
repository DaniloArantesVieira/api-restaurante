CREATE DATABASE IF NOT EXISTS restaurante;

USE restaurante;

CREATE TABLE IF NOT EXISTS prato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

INSERT INTO prato (nome, categoria, preco)
VALUES
    ('Pizza Margherita', 'Pizza', 39.90),
    ('Hambúrguer Artesanal', 'Lanche', 32.50),
    ('Lasanha Bolonhesa', 'Massas', 44.90);