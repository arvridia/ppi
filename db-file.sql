CREATE TABLE pessoa (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(500),
    PRIMARY KEY (id)
);

CREATE TABLE cliente (
    pessoa_id BIGINT NOT NULL,
    data_cadastro DATE,
    PRIMARY KEY (pessoa_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
);

CREATE TABLE doador (
    pessoa_id BIGINT NOT NULL,
    cpf_cnpj VARCHAR(30) UNIQUE,
    total_doado DECIMAL(10, 2),
    PRIMARY KEY (pessoa_id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
);

CREATE TABLE cachorro (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(100),
    status_adocao VARCHAR(50) NOT NULL,
    doador_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (doador_id) REFERENCES doador(pessoa_id)
);