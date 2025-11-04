export default function UserExist() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return true;
  }

  return false;
}
