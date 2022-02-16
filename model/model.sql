create database task_typescript;

create extension if not exists "uuid-ossp";

create table users(
    user_id uuid not null default uuid_generate_v4() primary key,
    user_fullname text not null,
    user_username varchar(50) unique not null,
    user_password text not null,
    created_at timestamp with time zone not null default current_timestamp,
    user_status boolean not null default true 
);

create table messages(
    message_id uuid not null default uuid_generate_v4() primary key,
    message_text text  ,
    message_media text  ,
    message_sender uuid not null,
    message_receiver uuid not null,
    message_send_date timestamp with time zone not null default current_timestamp,
    constraint fk_message_sender
        foreign key(message_sender)
            references users(user_id)
            on delete cascade,
    constraint fk_message_receiver
        foreign key(message_receiver)
            references users(user_id)
            on delete cascade
);