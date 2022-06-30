CREATE DATABASE yacht_rent;
CREATE EXTENSION postgis;
CREATE USER yacht_rent WITH password 'yacht_rent';
ALTER DATABASE yacht_rent OWNER TO yacht_rent;
CREATE SCHEMA account;
ALTER SCHEMA account OWNER TO yacht_rent;
CREATE SCHEMA catalog;
ALTER SCHEMA catalog OWNER TO yacht_rent;

CREATE TABLE account.user (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(20) NOT NULL,
  type SMALLINT DEFAULT 1,
  role_id SMALLINT DEFAULT 1,
  firebase_token VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE account.user OWNER TO yacht_rent;

CREATE TABLE catalog.yacht (
  id SERIAL PRIMARY KEY,
  model VARCHAR(30) NOT NULL,
  crew SMALLINT,
  production_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE catalog.yacht OWNER TO yacht_rent;

CREATE TABLE catalog.harbor (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  long VARCHAR(30),
  lat VARCHAR(30)
);

ALTER TABLE catalog.harbor OWNER TO yacht_rent;

SELECT AddGeometryColumn ('catalog','harbor','geom',2180,'POINT',2);
CREATE INDEX route_geometry ON catalog.harbor USING GIST (geom);

CREATE TABLE account.reservation (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES account.user(id) NOT NULL,
  yacht_id integer REFERENCES catalog.yacht(id) NOT NULL,
  date_from date NOT NULL,
  date_to date,
  created_at TIMESTAMP DEFAULT NOW(),
  start_harbor_id integer REFERENCES catalog.harbor(id) NOT NULL,
  end_harbor_id integer REFERENCES catalog.harbor(id) NOT NULL
);

ALTER TABLE account.reservation OWNER TO yacht_rent;
