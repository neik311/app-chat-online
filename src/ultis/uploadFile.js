import { firebase } from "../config/firebase";

export const uploadFile = async (fileUrl, fileName) => {
  const res = await fetch(fileUrl);
  const blob = await res.blob();
  fileName = `avatar-app-chat/${fileName}`;
  let ref = firebase.storage().ref();
  await ref.child(fileName).put(blob);
  const url = await ref.child(fileName).getDownloadURL();
  return url;
};

//upload avatar
export const uploadAvatar = async (fileUrl, fileName) => {
  if (!fileUrl || !fileName) return;
  try {
    fileName = `avatar-app-chat/${fileName}`;
    const url = await uploadFile(fileUrl, fileName);
    return url;
  } catch (error) {
    console.log(error);
  }
};

// upload send image
export const uploadImage = async (fileUrl, fileName) => {
  if (!fileUrl || !fileName) return;
  try {
    fileName = `image/${fileName}`;
    const url = await uploadFile(fileUrl, fileName);
    return url;
  } catch (error) {
    console.log(error);
  }
};
