import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            // 
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes);
            if (menuRes.data.insertedId) {
                // show success popup 
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log(res.data);
    }
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's New"></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset my-6">
                        <legend className="fieldset-legend ">Recipe Name*</legend>
                        <input type="text" className="input w-full " placeholder="Recipe Name"
                            {...register("name", { required: true })} required
                        />
                    </fieldset>

                    <div className='flex items-center gap-6 w-full'>
                        {/* Category */}
                        <div className='w-full'>
                            <fieldset className="fieldset ">
                                <legend className="fieldset-legend ">Category*</legend>

                            </fieldset>
                            <select {...register("category", { required: true })} className="select select-bordered w-full">
                                <option defaultValue={'Select a category'}>Select a category</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">drinks</option>
                            </select>
                        </div>

                        {/* Price */}
                        <fieldset className="fieldset  w-full">
                            <legend className="fieldset-legend ">Price*</legend>
                            <input type="number" className="input w-full " placeholder="Price"
                                {...register("price", { required: true })}
                            />
                        </fieldset>
                    </div>

                    {/* Recipe Details */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Detail</legend>
                        <textarea {...register('recipe')} className="textarea h-24 w-full" placeholder="Bio"></textarea>
                    </fieldset>

                    <div className=' w-full my-6'>
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-ghost" />
                    </div>

                    <button className='btn'>Add Item <FaUtensils className='ml-3'></FaUtensils> </button>
                </form>
            </div >
        </div >
    );
};

export default AddItems;