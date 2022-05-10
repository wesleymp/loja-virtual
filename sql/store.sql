create table "role"(
	"id_role" serial primary key,
	"role_name" VARCHAR(255) not null
);

insert into "role" ("role_name") values ('admin');
insert into "role" ("role_name") values ('normal');

create table "user"(
	"id_user" serial primary key,
	"user_name" VARCHAR(255) not null,
	"password" VARCHAR(255) not null,
	"email" VARCHAR(255) unique not null,
	"coin_quantity" DECIMAL(10,2) default 00.00 not null,
	"id_role" int default 2,
	foreign key ("id_role") references "role" ("id_role")
);

insert into "user" ("user_name", "password", "email", "id_role") values ('admin', '$2b$10$Y3gaw9d4T2z8qQvaRY6GJu.mcycwV4KUmIIjbbYf9j1/6.p1A8rGi', 'admin@mail.com', 1);

create table "product"(
	"id_product" serial primary key,
	"product_name" VARCHAR(255) not null,
	"price" DECIMAL(10,2) not null,
	"image_url" VARCHAR(255) not null
);
