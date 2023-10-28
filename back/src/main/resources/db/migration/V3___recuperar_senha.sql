create table if not exists recuperar_senha(
    id bigserial primary key,
    destinatario varchar,
    cod bigint,
    expircao timestamp,
    user_app_id bigint,
    ativo boolean,
    foreign key (user_app_id) references user_app(id)
);