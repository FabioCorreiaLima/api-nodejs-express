
CREATE DATABASE sistema_cadastro;
USE sistema_cadastro;

CREATE TABLE setor (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL
);

CREATE TABLE funcionarios(
id INT AUTO_INCREMENT PRIMARY KEY,
primeiro_nome VARCHAR(50) NOT NULL,
sobrenome VARCHAR(50) NOT NULL,
data_admissao DATE NOT NULL,
status_funcionario VARCHAR(10) NOT NULL,
id_setor INT,
id_cargo INT;
FOREIGN KEY (id_setor) REFERENCES setor(id)
FOREIGN KEY (id_cargo) REFERENCES cargos(id)
);

CREATE TABLE cargos(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
id_setor INT,
FOREIGN KEY (id_setor) REFERENCES setor(id)
);



