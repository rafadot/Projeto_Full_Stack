create table recuperar_senha(
    id bigserial primary key,
    destinatario varchar,
    cod bigint,
    expircao timestamp,
    user_app_id bigint,
    foreign key (user_app_id) references user_app(id)
);