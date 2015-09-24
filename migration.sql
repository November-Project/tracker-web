
# prep old db:
alter table tribes rename column "daysOfWeek" to days_of_week;

# then run:
insert into tribes select * from dblink('dbname=novproject_old', 'select id, title, ''['' || array_to_string(days_of_week::integer[], '','') || '']'', latitude, longitude, timezone from tribes') as t(id integer, title varchar, days_of_week varchar, latitude double precision, longitude double precision, timezone varchar);

# prep old db:
alter table users alter column tribe_admin drop not null;
update users set tribe_admin = null where tribe_admin = 0;
update users set tribe_id = 1 where tribe_id = 0;

# then run:
insert into users select * from dblink('dbname=novproject_old', 'select id, name, email, password, gender, tribe_id, facebook_id, accepted_terms, NULL, false, forgot_token, is_admin, tribe_admin from users') as t(id integer, name varchar, email varchar, password varchar, gender varchar, tribe_id integer, facebook_id  varchar, accepted_terms boolean, verify_key varchar, is_verified boolean, forgot_token varchar, is_admin boolean, tribe_admin integer);

insert into locations select * from dblink('dbname=novproject_old', 'select id, title, latitude, longitude, standard, tribe_id from locations') as t(id integer, title varchar, latitude double precision, longitude double precision, standard boolean, tribe_id integer);

insert into workouts select * from dblink('dbname=novproject_old', 'select id, title, description, reps, time, standard, allow_user_reps, allow_user_time, false, tribe_id from workouts') as t(id integer, title varchar, description varchar, reps double precision, time integer, standard boolean, allow_user_reps boolean, allow_user_time boolean, allow_user_pr boolean, tribe_id integer);

# prep old db:
update events set workout_id = null where workout_id = 0;
update events set location_id = null where location_id = 0;

# then run:
insert into events select * from dblink('dbname=novproject_old', 'select id, tribe_id, date::date, ''["t'' || to_char(date, ''HH24:MI'') || '':00"]'', false, 0, ''[]'', true, null, location_id, workout_id from events') as t(id integer, tribe_id integer, date date, times varchar, recurring boolean, week integer, days varchar, hide_workout boolean, recurring_event integer, location_id integer, workout_id integer);

insert into results select * from dblink('dbname=novproject_old', 'select id, user_id, event_id, '''', reps, time, pr from results') as t(id integer, user_id integer, event_id integer, event_time varchar, reps double precision, time integer, pr boolean);

insert into verbals select * from dblink('dbname=novproject_old', 'select id, user_id, event_id from verbals') as t(id integer, user_id integer, event_id integer);

# Remember to update all sequences!!
