export default function SessionStorage() {
  let store = { username: 'testuser', deviceType: 'mobile' };
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
