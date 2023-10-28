
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";


export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState ({
        imageUrls: [],
    });
    console.log(formData);
    // Define states for catching errors on uploading images
    const [imageUploadError, setImageUploadError] = useState(false);
    // Define states for uploading 
    const [uploading, setUploading] = useState(false);

    // Define a function to upload images
    const handleImageSubmit = (e) => {
        e.preventDefault();
        setUploading(true);
        setImageUploadError(false);
        // check if there's a file
        if (files.length > 0 && files.length + formData.imageUrls.length < 7 ) {
            // Wait for all images
            const promises = [];

            for (let i=0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=> {
                // keeping all the previews in the formData and add on new uploaded images
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                // After uploading the images, set the upload error to false
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                // If there a upload error, set state to true and return an error message
                setImageUploadError(error.message);
                setUploading(false);
            })
            
            
        } else {
            setImageUploadError("You can have a maximum of 6 images to upload");
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageReference = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageReference, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% donw`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }
                )
        })
    }

    // Define the function for deleting the images
    const handleDeleteImage = (index) => {
        setFormData ({...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

  return (
    <main className="max-w-4xl mx-auto p-3">
        <h1 className="text-3xl text-center font-bold my-7">Create a Listing</h1>
        <form className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col flex-1 gap-3">
                <input type="text" placeholder="Name" className="border p-3 rounded-lg" id="name" required/>
                <textarea type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required/>
                <input type="text" placeholder="Address" className="border p-3 rounded-lg" id="address" required/>
                
                <div className="flex flex-wrap gap-6 p-6">
                    <div className="flex gap-2">
                        <input type="checkbox" className="w-5" id="sale"/> <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className="w-5" id="rent"/> <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className="w-5" id="parking"/> <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className="w-5" id="furnished"/> <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className="w-5" id="offer"/> <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <div><input type="number" className="p-3 border border-gray-300 rounded-lg" id="bedrooms" min={1} required /></div>
                        <p>Bedrooms</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2"><input type="number" className="p-3 border border-gray-300 rounded-lg" id="bathrooms" min={1} required /></div>
                        <p>Bathrooms</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div>
                            <input type="number" className="p-3 border border-gray-300 rounded-lg" id="regularPrice" min={1} required />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p>Regular Price</p>
                            <span className="text-sm">($ / Month)</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <input type="number" className="p-3 border border-gray-300 rounded-lg" id="discountedPrice" min={1} required />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p>Discounted Price</p>
                            <span className="text-sm">($ / Month)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 gap-3">
                <p className="font-bold">Images:
                <span className="font-normal text-gray-600 ml-2">The first image will be the cover.</span>
                </p>

                <div className="flex gap-4">
                    <input onChange={(e) => setFiles(e.target.files)} type="file" id="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded w-full"/>
                    <button type="button" onClick = {handleImageSubmit} className="p-3 text-black-700  bg-green-500 border-black-500 rounded hover:shadow-lg disabled:opacity-80" disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                {/* if there's an error uploading, display the error message */}
                <p className="text-red-700">{imageUploadError}</p>

                {/* Display the images after uploading */}
                
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border items-center">
                            <img src={url} alt="Listing Images" className="w-40 h-40 object-contain rounded-lg" />
                            <button type="button" onClick={()=>handleDeleteImage(index)} className="p-3 text-red-700 rounded-lg hover:opacity-90">DELETE</button>
                        </div>
                    ))
                }
                

                <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80">Create Listing</button>
            </div>
            
            
        </form>
    </main>
  )
}
