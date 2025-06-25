create or replace MLE ENV USER_ENV imports (
    'user_list' module USER_LIST
);

begin
  ords.enable_schema;
end;
/

declare
    c_module_name   constant varchar2(255) := 'users';
begin   
    ords.define_module(
        p_module_name    => c_module_name,
        p_base_path      => '/',
        p_status         => 'PUBLISHED',
        p_items_per_page => 25
    );
end;
/
--------------------------------------------------------------------------------
-- POST ords/userc/users/create
--------------------------------------------------------------------------------
declare
    c_module_name   constant varchar2(255) := 'users';
    c_pattern       constant varchar2(255) := 'create';
begin    
    ords.define_template(
        p_module_name    => c_module_name,
        p_pattern        => c_pattern
    );

    ords.define_handler(
        p_module_name => c_module_name,
        p_pattern     => c_pattern,
        p_method      => 'POST',
        p_source_type => 'mle/javascript',
        p_mle_env_name   => 'USER_ENV',
        p_source      => q'~
        (req, resp) => { 
            const { createUserHandler } = await import ('user_list');
            createUserHandler(req,resp);
        }            
        ~'
    );
    commit;
end;
/
--------------------------------------------------------------------------------
-- GET ords/userc/users/:id
--------------------------------------------------------------------------------
declare
    c_module_name   constant varchar2(255) := 'users';
    c_pattern       constant varchar2(255) := ':id';
begin 
    ords.define_template(
        p_module_name    => c_module_name,
        p_pattern        => c_pattern
    );
 
    ords.define_handler(
        p_module_name    => c_module_name,
        p_pattern        => c_pattern,
        p_method         => 'GET',
        p_source_type    => 'mle/javascript',
        p_mle_env_name   => 'USER_ENV',
        p_items_per_page => 0,
        p_mimes_allowed  => null,
        p_comments       => null,
        p_source         => q'~
        (req, resp) => { 
            const { getUserHandler } = await import ('user_list');
            getUserHandler(req, resp);
        }
    ~'
    ); 
    commit;
end;
/


--------------------------------------------------------------------------------
-- DELETE ords/userc/users/delete/:id
--------------------------------------------------------------------------------
declare
    c_module_name   constant varchar2(255) := 'users';
    c_pattern       constant varchar2(255) := 'delete/:id';
begin    
    ords.define_template(
        p_module_name    => c_module_name,
        p_pattern        => c_pattern
    );

    ords.define_handler(
        p_module_name => c_module_name,
        p_pattern     => c_pattern,
        p_method      => 'DELETE',
        p_source_type => 'mle/javascript',
        p_mle_env_name   => 'USER_ENV',
        p_source      => q'~
        (req, resp) => { 
            const { deleteUserHandler } = await import ('user_list');
            deleteUserHandler(req,resp);
        }
        ~'
    );
    commit;
end;
/


--------------------------------------------------------------------------------
-- PUT ords/userc/users/edit/:id
--------------------------------------------------------------------------------
declare
    c_module_name   constant varchar2(255) := 'users';
    c_pattern       constant varchar2(255) := 'edit/:id';
begin    
    ords.define_template(
        p_module_name    => c_module_name,
        p_pattern        => c_pattern
    );

    ords.define_handler(
        p_module_name => c_module_name,
        p_pattern     => c_pattern,
        p_method      => 'PUT',
        p_source_type => 'mle/javascript',
        p_mle_env_name   => 'USER_ENV',
        p_source      => q'~
        (req, resp) => {
            const { updateUserHandler } = await import ('user_list');
            updateUserHandler(req, resp);
        }
        ~'
    );
    commit;
end;
/