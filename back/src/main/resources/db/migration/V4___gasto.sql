create table if not exists categoria_gasto(
    id bigserial primary key,
    user_app_id bigint,
    nome varchar,
    cor varchar,
    foreign key (user_app_id) references user_app(id)
);

create table if not exists gasto(
    id bigserial primary key,
    categoria_id bigint,
    user_app_id bigint,
    nome varchar,
    valor numeric(10,2),
    data date,
    foreign key (categoria_id) references categoria_gasto(id),
    foreign key (user_app_id) references user_app(id)
);