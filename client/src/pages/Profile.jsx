import { useSelector } from "react-redux";
// import useRef for upload profile picture
import { useRef, useState, useEffect } from "react";
// import reading storage from firebase
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";


export default function Profile() {
  const { currentUser } = useSelector ((state) => state.user);
  // Initiate useRef and set to null by default
  const fileReference = useRef(null);
  // Set file to undefined since there's no file yet
  const [file, setFile] = useState(undefined);
  // Define a variable for displaying the upload percentage
  const [filePerc, setFilePerc] = useState(0);
  // Define a variable for upload error
  const [uploadError, setUploadError] = useState(null);
  // Define a variable to include the upload file URl, which is an empty object by default
  const [formData, setFormData] = useState({})

  console.log(file);

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  // Define a function to handle the upload image actions
  const handleFileUpload = (file) =>{
    // Pass the firebase app for reading files
    const storage = getStorage(app);
    // Add a time stamp to the file name so that it will be unique
    const fileName = new Date().getTime() + file.name;
    const storageReference = ref(storage, fileName);
    // Create the task for uploading and displaying the percentage of the upload process
    const uploadTask = uploadBytesResumable (storageReference, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log(filePerc);
      },
      (error) => {
        console.log(error);
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          // Separating the formData to keep everything else the same but the avatar link
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    )
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>

      <form className="flex flex-col gap-4 mb-5" >
        {/* Set the onChange to the first file with index 0 */}
        <input type="file" ref={fileReference} hidden onChange={(e) => setFile(e.target.files[0]) }/>
        {/* Add an on-click function on the image, so that when it's clicked, a popup window for upload profile picture will pop */}
        <img className = "self-center rounded-full h-20 w-20 cursor-pointer object-cover" src={formData.avatar || currentUser.avatar} alt="profile" 
          onClick={()=> fileReference.current.click()} />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">
              Error Image upload
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username"/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email"/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password"/>
        <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-90" >UPDATE</button>
        <button className="bg-yellow-600 text-white p-3 rounded-lg hover:opacity-90" >CREATE LISTING</button>
      </form>

      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer">DELETE ACCOUNT</span>
        <span className="text-red-700 cursor-pointer">SIGN OUT</span>
      </div>
    </div>
  )
}
