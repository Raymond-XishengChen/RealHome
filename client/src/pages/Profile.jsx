import { useSelector } from "react-redux";
// import useRef for upload profile picture
import { useRef, useState, useEffect } from "react";
// import reading storage from firebase
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserSuccess, signoutUserStart } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
  // Initialise useDispatch
  const dispatch = useDispatch();

  // console.log(file);
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleChange = (e) => {
    // Read the changes, save the modified data to formData
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set state to update start
      dispatch(updateUserStart());
      // Using the current user's ID as the key
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // If error occurs, set state to updated failed
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      // If everything went thru successfully, set state to success
      dispatch(updateUserSuccess(data));
      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async ()=> {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Profile</h1>

      <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit}>
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
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-90" >UPDATE</button>
        <Link to={"/create-listing"} className="bg-yellow-600 text-white p-3 rounded-lg hover:opacity-90 text-center">
          CREATE LISTING
        </Link>
      </form>

      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer" onClick = {handleDeleteUser}>DELETE ACCOUNT</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>SIGN OUT</span>
      </div>
    </div>
  )
}
