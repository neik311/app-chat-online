import { firebase } from "../config/firebase";

export const uploadFile = async (fileUrl, fileName) => {
  if (!fileUrl || !fileName) return;
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    fileName = `avatar-app-chat/${fileName}`;
    let ref = firebase.storage().ref();
    await ref.child(fileName).put(blob);
    const url = await ref.child(fileName).getDownloadURL();
    return url;
  } catch (error) {
    console.log(error);
  }
};
