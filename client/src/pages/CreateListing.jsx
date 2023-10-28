

export default function CreateListing() {
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
                    <input type="file" id="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded w-full"/>
                    <button className="p-3 text-black-700  bg-green-500 border-black-500 rounded hover:shadow-lg disabled:opacity-80">Upload</button>
                </div>

                <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80">Create Listing</button>
            </div>

            
        </form>
    </main>
  )
}
