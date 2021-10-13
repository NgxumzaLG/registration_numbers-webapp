CREATE TABLE reg_towns(
	id SERIAL NOT NULL PRIMARY KEY,
	towns VARCHAR(50) NOT NULL,
    code VARCHAR(10) NOT NULL
);

CREATE TABLE reg_numbers (
	id SERIAL NOT NULL PRIMARY KEY,
	regNumber VARCHAR(20) NOT NULL,
	town_id INT,
	FOREIGN KEY (town_id) REFERENCES reg_towns(id)
);

INSERT INTO reg_towns (towns, code) VALUES ('Cape Town', 'CA');
INSERT INTO reg_towns (towns, code) VALUES ('Bellville', 'CY');
INSERT INTO reg_towns (towns, code) VALUES ('Paarl', 'CJ');
INSERT INTO reg_towns (towns, code) VALUES ('Stellenbosch', 'CL');
