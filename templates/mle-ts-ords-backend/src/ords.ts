import { newUser, getUser, deleteUser, updateUser } from './todos';

export async function createUserHandler(req, resp) {
    const id = await newUser(req.query_parameters.name);
    resp.status(201);
    resp.content_type('application/json');
    resp.json({ id });    
}
export async function getUserHandler(req, resp) {
    const userName = await getUser(parseInt(req.uri_parameters.id));
    if(!userName) {
        resp.status(404);
        resp.content_type('application/json');
        resp.json({msg: "User not found"});
    } else {
        resp.status(200);
        resp.content_type('application/json');
        resp.json(userName);    
    }
}
export async function deleteUserHandler(req, resp) {
    const deleted = await deleteUser(parseInt(req.uri_parameters.id));
    if (deleted > 0) {
        resp.status(200);
    } else {
        resp.status(404);
    }
    resp.content_type('application/json');
    resp.json({ rowsDeleted: deleted });
}
export async function updateUserHandler(req, resp) {
    const updated = await updateUser(parseInt(req.uri_parameters.id),req.query_parameters.name);
    if (updated > 0) {
        resp.status(200);
    } else {
        resp.status(404);
    }
    resp.content_type('application/json');
    resp.json({ rowsUpdated: updated });
}
