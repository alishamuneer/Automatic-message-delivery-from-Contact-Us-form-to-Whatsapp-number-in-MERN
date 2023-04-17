import React from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import msg from '../images/message.svg'
import './inputCss.css'

const Form = () => {


    const { values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            code: "",
            message: ""

        },
        // submit handler
        onSubmit: (values, actions) => {
            console.log(values)
            axios.post('http://localhost:3001/api/message', values)
                .then(res => {

                    console.log(res)
                    setTimeout(() => {
                        actions.resetForm();
                    }, 1000);
                    toast.success("Message sent successfully", {
                        position: toast.POSITION.TOP_CENTER
                    });

                })
                .catch((err) => {
                    toast.error(err.response.data, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        actions.resetForm();
                    }, 1000);
                    console.log("Something went wrong ", err)
                })
        },

        validationSchema: yup.object({
            firstName: yup.string()
                .min(3, "minimum 3 characters long")
                .max(30, "maximum 30 characters")
                .required("Required*"),
            lastName: yup.string()
                .max(30, "maximum 30 characters"),
            code: yup.number()
                .max(10000, "Enter only 4 digits ")
                .min(1000, "Enter 4 digits ")
                .integer()
                .typeError('Code must be a number')
                .required("Required*"),
            message: yup.string().
                required("Required*")
                .max(400, "maximum 400 characters"),

        })
    })

    return (
        <React.Fragment>
            <div className={'w-screen h-screen md:flex items-center md:justify-center sm:p-[20px] md:p-0 bg-[#353f69b2]'} >
                <div className={' flex flex-col sm:justify-center md:justify-start sm:items-center md: items-start bottom-[35px] bg-[ghostwhite] md:rounded-md border-[2px] border-solid shadow-2xl sm:rounded-[80px] sm:h-[93vh] md:h-[77vh] xl:w-[50%] lg:w-[65%] md:w-[86%] sm:w-[100%] p-9'} >
                    <div className='md:self-start'><h1 className="sm:text-[26px] md:text-[30px] sm:text-center md:text-start  pb-[35px] font-extrabold text-[#322e2e]">Send a Message to our team experts!</h1></div>
                    <div className='flex sm:flex-col md:flex-row'>
                        <div className='md:w-[50%]'>
                            <form onSubmit={handleSubmit} className="flex flex-col justify-evenly" id="contact-form" name="contact-form" data-name="Contact Form">

                                <div className ="relative">
                                    <input
                                        type="text" id="firstName" name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`block px-6 pb-[5px] pt-4 md:w-[60%] text-[16px] text-gray-900 bg-transparent rounded-full border appearance-none focus:outline-none focus:ring-0 focus:border-[#5b4bdd] peer
                                    ${touched.firstName && errors.firstName ? "border-red-600 " : "border-[#aaa8a8]"}`}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="firstName"
                                        className="absolute text-[16px] text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[ghostwhite] px-2 peer-focus:px-2 peer-focus:text-[#5b4bdd] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        First Name
                                    </label>
                                </div>
                                {touched.firstName && errors.firstName ? <p className='text-[13px] text-red-600 pb-[5px] ml-[15px]'>{errors.firstName}</p> : <div className='p-[12px]'></div>}
                                
                                <div className="relative">
                                    <input
                                        type="text" id="lastName" name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`block px-6 pb-[5px] pt-4 md:w-[60%] text-[16px] text-gray-900 bg-transparent rounded-full border border-[#aaa8a8] appearance-none focus:outline-none focus:ring-0 focus:border-[#5b4bdd] peer`}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="lastName"
                                        className="absolute text-[16px] text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[ghostwhite] px-2 peer-focus:px-2 peer-focus:text-[#5b4bdd] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Last Name
                                    </label>
                                </div>
                                <div className='p-[12px]'></div>

                                <div className ="relative">
                                    <input
                                        type="text" id="code" name="code"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`block px-6 pb-[5px] pt-4 md:w-[60%] text-[16px] text-gray-900 bg-transparent rounded-full border appearance-none focus:outline-none focus:ring-0 focus:border-[#5b4bdd] peer
                                    ${touched.code && errors.code ? "border-red-600 " : "border-[#aaa8a8]"}`}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="code"
                                        className="absolute text-[16px] text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[ghostwhite] px-2 peer-focus:px-2 peer-focus:text-[#5b4bdd] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Code
                                    </label>
                                </div>
                                {touched.code && errors.code ? <p className='text-[13px] text-red-600 pb-[5px] ml-[15px]'>{errors.code}</p> : <div className='p-[12px]'></div>}

                                <div className='relative'>
                                    <textarea
                                        className={`block px-6 pb-[5px] pt-4 md:w-[60%]  text-[16px] text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-[#5b4bdd] peer  
                                        ${touched.message && errors.message ? "border-red-600" : "border-[#aaa8a8]"}`}
                                        id="message" name="message" value={values.message} rows="4" cols="21"
                                        onChange={handleChange}
                                        onBlur={handleBlur} ></textarea>
                                    <label
                                        className="absolute text-[21px] text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[ghostwhite] px-2 peer-focus:px-2 peer-focus:text-[#5b4bdd] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                        htmlFor="Message"
                                    >
                                        Message
                                    </label>
                                </div>

                                {touched.message && errors.message ? <p className='text-[13px] text-red-600 pb-[5px] ml-[15px]'>{errors.message}</p> : <div className='p-[12px]'></div>}

                                
                                    <button
                                        className="iinline-block sm:self-center md:self-start pr-14 pl-6 py-2.5 text-white font-extrabold text-xs leading-tight uppercase rounded bg-[#5b4bdd] shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition-all duration-200 ease-linear mt-4 w-[13%]"
                                        type="submit"
                                        value="Submit"
                                        disabled={isSubmitting}
                                    >
                                        Send
                                    </button>
                                
                            </form>
                        </div>
                        <div className='sm:hidden md:block md:w-[50%] self-center sm:pt-[26px] md:pt-[0] '>
                            <img src={msg}/>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}

export default Form
