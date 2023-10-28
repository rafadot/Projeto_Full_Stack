create table if not exists user_app(
    id bigserial primary key,
    nome varchar,
    username varchar,
    senha varchar
);