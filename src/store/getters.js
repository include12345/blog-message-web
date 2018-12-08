const getters = {
    sidebar: state => state.app.sidebar,
    username: state=>state.user.username,
    name: state=>state.user.name,
    token: state => state.user.token,
    type: state => state.user.type,
    // update: state => state.user.update,
    // pquery: state => state.user.pquery,
    // pupdate: state => state.user.pupdate,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
  }
  export default getters
  