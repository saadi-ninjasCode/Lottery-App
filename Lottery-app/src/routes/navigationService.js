let navObj = null

function setGlobalRef(ref) {
  navObj = ref
}
function currentRoute() {
  if (navObj !== null && typeof navObj != 'undefined')
    return (
      navObj.getCurrentRoute()
    )
  else {
    return null
  }
}

export default {
  setGlobalRef,
  currentRoute
}
