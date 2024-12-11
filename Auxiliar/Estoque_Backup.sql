CREATE TABLE `pessoa` (
  `n_id_pessoa` int PRIMARY KEY AUTO_INCREMENT,
  `s_nome_pessoa` varchar(255),
  `n_id_fornecedor` int,
  `n_id_tipopessoa` int,
  `s_email_pessoa` varchar(255),
  `s_senha_pessoa` varchar(255),
  `n_primacess_pessoa` int,
  `c_status_pessoa` char,
  `s_foto_pessoa` mediumtext
);

CREATE TABLE `fornecedor` (
  `n_id_fornecedor` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_fornecedor` varchar(255),
  `c_status_fornecedor` char,
  `s_foto_fornecedor` mediumtext
);

CREATE TABLE `contatofornecedor` (
  `n_id_contatofornecedor` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_fornecedor` int,
  `n_id_pessoa` int
);

CREATE TABLE `contato` (
  `n_id_contato` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_pessoa` int,
  `s_ddd_contato` varchar(255),
  `s_telefone_contato` varchar(255),
  `s_email_contato` varchar(255)
);

CREATE TABLE `tipopessoa` (
  `n_id_tipopessoa` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_tipopessoa` varchar(255),
  `n_nivel_tipopessoa` int
);

CREATE TABLE `produto` (
  `n_code_produto` int PRIMARY KEY,
  `n_id_tipoproduto` int,
  `s_desc_produto` varchar(255),
  `n_id_fornecedor` int,
  `n_qtde_produto` int,
  `c_status_produto` char
);

CREATE TABLE `tipoproduto` (
  `n_id_tipoproduto` int PRIMARY KEY AUTO_INCREMENT,
  `s_desc_tipoproduto` varchar(255)
);

CREATE TABLE `movimentacao` (
  `n_id_movimentacao` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_pessoa` int,
  `c_tipo_movimentacao` char,
  `n_qtde_movimentacao` int,
  `dt_datahora_movimentacao` datetime
);

CREATE TABLE `token` (
  `n_id_token` int PRIMARY KEY AUTO_INCREMENT,
  `n_id_pessoa` int,
  `s_token_token` varchar(255),
  `s_validade_token` varchar(255)
);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `pessoa` ADD FOREIGN KEY (`n_id_tipopessoa`) REFERENCES `tipopessoa` (`n_id_tipopessoa`);

ALTER TABLE `contatofornecedor` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `contatofornecedor` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);

ALTER TABLE `contato` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);

ALTER TABLE `produto` ADD FOREIGN KEY (`n_id_tipoproduto`) REFERENCES `tipoproduto` (`n_id_tipoproduto`);

ALTER TABLE `produto` ADD FOREIGN KEY (`n_id_fornecedor`) REFERENCES `fornecedor` (`n_id_fornecedor`);

ALTER TABLE `movimentacao` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);

ALTER TABLE `token` ADD FOREIGN KEY (`n_id_pessoa`) REFERENCES `pessoa` (`n_id_pessoa`);
