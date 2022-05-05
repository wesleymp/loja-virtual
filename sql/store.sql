create table "role"(
	"id" serial primary key,
	"name" VARCHAR(255) not null
);

insert into "role" ("name") values ('admin');
insert into "role" ("name") values ('normal');

create table "user"(
	"id" serial primary key,
	"name" VARCHAR(255) not null,
	"password" VARCHAR(255) not null,
	"email" VARCHAR(255) unique not null,
	"id_role" int default 2,
	foreign key ("id_role") references "role" ("id")
);

insert into "user" ("name", "password", "email", "id_role") values ('admin', '$2b$10$Y3gaw9d4T2z8qQvaRY6GJu.mcycwV4KUmIIjbbYf9j1/6.p1A8rGi', 'admin@mail.com', 1);
