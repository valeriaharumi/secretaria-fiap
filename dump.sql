CREATE TABLE tipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO tipos (nome) VALUES ('Graduação'), ('Pós-graduação'), ('MBA'), ('Cursos Livres');

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tipo_id INT,
    code INT,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (tipo_id) REFERENCES tipos(id)
);

INSERT INTO turmas (name, description, code, type, created_at, updated_at) VALUES
('Desenvolvimento Web Full Stack', 'Aprenda a criar aplicações completas com as principais tecnologias de front-end e back-end.', '01', 1, NOW(), NOW()),
('Ciência de Dados', 'Curso focado em análise de grandes volumes de dados e aprendizado de máquina.', '02', 2, NOW(), NOW()),
('Segurança da Informação', 'Entenda os conceitos fundamentais para proteger sistemas e dados contra ameaças cibernéticas.', '03', 3, NOW(), NOW()),
('Redes de Computadores', 'Curso dedicado à administração e segurança de redes em ambientes corporativos.', '04', 3, NOW(), NOW()),
('DevOps', 'Integre desenvolvimento e operações para automação de infraestruturas e entrega contínua.', '05', 4, NOW(), NOW()),
('Inteligência Artificial', 'Explore os fundamentos da IA, incluindo machine learning e deep learning.', '06', 2, NOW(), NOW()),
('Banco de Dados', 'Aprenda a gerenciar e otimizar grandes bases de dados com tecnologias SQL e NoSQL.', '07', 1, NOW(), NOW()),
('Desenvolvimento Mobile', 'Criação de aplicativos nativos e híbridos para dispositivos móveis.', '08', 1, NOW(), NOW()),
('Computação em Nuvem', 'Aprenda a implementar e gerenciar soluções em ambientes de cloud computing.', '09', 4, NOW(), NOW()),
('Robótica e Automação', 'Desenvolva habilidades em automação industrial e programação de robôs.', '10', 2, NOW(), NOW()),
('Gestão de Projetos de TI', 'Entenda como gerenciar projetos de tecnologia da informação, usando metodologias ágeis.', '11', 3, NOW(), NOW());


CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO alunos (name, birth_date, username, created_at, updated_at) VALUES
('Maria Santos', '2002-05-09', '0001', NOW(), NOW()),
('João Oliveira', '1995-12-25', '0002', NOW(), NOW()),
('Ana Silva', '2001-07-14', '0003', NOW(), NOW()),
('Pedro Costa', '1999-03-22', '0004', NOW(), NOW()),
('Lucas Pereira', '1998-08-30', '0005', NOW(), NOW());
('Luisa Arantes', '2005-01-21', '0006', NOW(), NOW());
('Fernanda Lima', '2003-06-11', '0007', NOW(), NOW()),
('Carlos Almeida', '2000-09-09', '0008', NOW(), NOW()),
('Beatriz Lima', '1997-11-15', '0009', NOW(), NOW()),
('Mateus Souza', '2004-02-28', '0010', NOW(), NOW()),
('Juliana Costa', '1996-10-04', '0011', NOW(), NOW());


CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    turma_id INT,
    registro_matricula VARCHAR(255),
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    UNIQUE (aluno_id, turma_id)
);

INSERT INTO matriculas (aluno_id, turma_id, registro_matricula, created_at, updated_at) VALUES
(1, 1, 'RM010001', NOW(), NOW()),  
(2, 2, 'RM020002', NOW(), NOW()), 
(3, 3, 'RM030003', NOW(), NOW()), 
(4, 4, 'RM040004', NOW(), NOW()),
(5, 5, 'RM050005', NOW(), NOW()),
(6, 1, 'RM010006', NOW(), NOW());