let id: number = parseInt(window.localStorage.getItem('_idMax') || '0');

function createId() {
  if(id===0){
    window.localStorage.setItem('_idMax','0')
  }
  id++;
  return id;
}

export default createId;
