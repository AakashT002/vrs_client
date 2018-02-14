export default function SessionStorage() {
  let store = { username: 'testuser' };
  this.getItem = key => {
    return store[key] || null;
  };
  this.setItem = (key, value) => {
    store[key] = value.toString();
  };
  this.clear = () => {
    store = {};
  };
}
