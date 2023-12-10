const table = [];

const addUser = (firstname, lastname, email, password,) => {
    const user = {
        firstname,
        lastname,
        email,
        password
    }
    table.push(user);
    console.log(table);
}
 

export default addUser;