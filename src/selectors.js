
function getUserById (store, id) {
  const returnValue = store && store.users
    ? store.users.find(x => x.id === id)
    : null;
    
    return returnValue;
}    

export default getUserById;