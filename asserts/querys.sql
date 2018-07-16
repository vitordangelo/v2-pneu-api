SELECT * 
FROM users_has_modules
JOIN users ON users_has_modules.user_id = users.id 


SELECT UNIX_TIMESTAMP(`created_at`) FROM `users`


SELECT users.first_name, users.last_name, users.id as user_id,
modules.hash, modules.ssid
FROM users_has_modules
JOIN users ON users_has_modules.user_id = users.id
JOIN modules ON users_has_modules.module_id = modules.id
where users_has_modules.user_id = 21


SELECT *
FROM modules
JOIN users ON modules.user_admin_id = users.id
JOIN users_has_modules ON modules.id = users_has_modules.module_id
where users_has_modules.user_id = 21


SELECT users.first_name, users.last_name, users.id as user_id, modules.hash, modules.ssid 
FROM users_has_modules 
JOIN users ON users_has_modules.user_id = users.id 
JOIN modules ON users_has_modules.module_id = modules.id 
where users_has_modules.user_id = 1


SELECT users_has_modules.module_id, modules.user_admin_id, modules.ssid, modules.hash, modules.topic 
FROM users_has_modules 
JOIN modules ON users_has_modules.module_id = modules.id 
WHERE users_has_modules.user_id = 1


SELECT id, first_name, last_name, cpf, created_at 
FROM users 
WHERE email = 'vitor@v2tech.com.br'


SELECT users.id as user_id, users.first_name, users.last_name, users.email,users.cpf
FROM users_has_modules 
JOIN users ON users_has_modules.user_id = users.id  
WHERE module_id = 19


SELECT users.first_name, users.id as user_id, history.status, history.history_type_id, history.created_at 
FROM history
JOIN users ON history.user_id = users.id
WHERE module_hash = 'HPoJeaBYMmFt'
ORDER BY created_at DESC


DELETE FROM users_has_modules 
WHERE user_id = 3 AND module_id = 28 


SELECT id, email 
FROM users 
WHERE email = 'vitor@v2tech.com.br' AND password = 'F27HxWtk'


INSERT INTO history
(status, user_id, module_hash, history_type_id)
VALUES
(1, 0, 'HPoJeaBYMmFt', 1);


INSERT INTO tokens_fcm
(token, user_id)
VALUES
('RMzdlowishdgA3wYmokzV0O7wGhtMMbE', 3);


UPDATE tokens_fcm
SET token = "dheuhdeudheuhdeuhfuehfefe"
WHERE user_id = 3


SET time_zone='America/Sao_Paulo';


SELECT u.id as user_id, u.first_name, t.token 
FROM tokens_fcm t
JOIN users u ON t.user_id = u.id
WHERE u.id IN (3, 10)


SELECT token 
FROM users_has_modules
JOIN modules ON users_has_modules.module_id = modules.id
JOIN tokens_fcm ON users_has_modules.user_id = tokens_fcm.user_id
WHERE hash = 'HPoJeaBYMmFt'


CREATE TRIGGER tr_date_prime BEFORE INSERT
ON modules
FOR EACH ROW 
SET NEW.prime_date = (SELECT NOW() + INTERVAL 6 MONTH);


INSERT INTO reset_passwords
(email, token)
VALUES
("metroid.p2p@gmail.com", "fuhefuehufhe");


UPDATE reset_passwords
SET reseted = 1
WHERE token = "408801782718323"


SELECT token 
FROM users_has_modules
JOIN modules ON users_has_modules.module_id = modules.id
JOIN tokens_fcm ON users_has_modules.user_id = tokens_fcm.user_id
WHERE users_has_modules.module_id = '30';


SELECT token 
FROM users_has_modules
JOIN modules ON users_has_modules.module_id = modules.id
JOIN tokens_fcm ON users_has_modules.user_id = tokens_fcm.user_id
WHERE users_has_modules.module_id = '30' AND users_has_modules.user_id != '1';

-- ##############################################################################

CREATE TABLE IF NOT EXISTS 'users' (
  'id' int(10) unsigned NOT NULL AUTO_INCREMENT,
  'first_name' varchar(255) NOT NULL DEFAULT '0',
  'last_name' varchar(255) NOT NULL DEFAULT '0',
  'email' varchar(255) NOT NULL DEFAULT '0',
  'cpf' varchar(255) NOT NULL DEFAULT '0',
  'password' varchar(255) NOT NULL DEFAULT '0',
  'created_at' timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ('id'),
  UNIQUE KEY 'email' ('email')
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
