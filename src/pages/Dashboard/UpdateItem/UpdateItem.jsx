import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData()
    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()



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
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes);
            if (menuRes.data.modifiedCount > 0) {
                // show success popup 
                // reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log(res.data);
    }

    return (
        <div>
            <SectionTitle heading={"Update an Item"} subHeading={"Refresh"}></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset my-6">
                        <legend className="fieldset-legend ">Recipe Name*</legend>
                        <input defaultValue={name} type="text" className="input w-full " placeholder="Recipe Name"
                            {...register("name", { required: true })} required
                        />
                    </fieldset>

                    <div className='flex items-center gap-6 w-full'>
                        {/* Category */}
                        <div className='w-full'>
                            <fieldset className="fieldset ">
                                <legend className="fieldset-legend ">Category*</legend>

                            </fieldset>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full">
                                <option>Select a category</option>
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
                            <input defaultValue={price} type="number" className="input w-full " placeholder="Price"
                                {...register("price", { required: true })}
                            />
                        </fieldset>
                    </div>

                    {/* Recipe Details */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Detail</legend>
                        <textarea defaultValue={recipe} {...register('recipe')} className="textarea h-24 w-full" placeholder="Bio"></textarea>
                    </fieldset>

                    <div className=' w-full my-6'>
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-ghost" />
                    </div>

                    <button className='btn'>Update Item </button>
                </form>
            </div >
        </div>
    );
};

export default UpdateItem;