create table if not exists user_app(
    id bigserial primary key,
    name varchar,
    date_birth date,
    username varchar,
    password varchar
);