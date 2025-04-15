import cl from '../styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { userAPI } from '../services/userService.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { useEffect } from 'react'
import { imgPlug, setUserData } from '../store/reducers/AuthSlice.ts'

const schema = z.object({
    username: z.string().min(3).max(20)
        .regex(/^[a-zA-Z0-9]+$/, 'Disallowed symbols').optional(),
    email: z.string().email().optional(),
    password: z.string().optional()
        .refine(val => !val || val.length >= 6, {
            message: 'Password must be at least 6 characters',
        }),
    image: z.string()
        .optional()
        .refine(val => !val || /^https?:\/\/.+\.(jpeg|jpg|gif|png|webp|svg)$/i.test(val), {
            message: 'Must be a valid image URL',
        }),
})

type FormTypes = z.infer<typeof schema>

const Profile = () => {
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormTypes>({
        resolver: zodResolver(schema),
    })

    const dispatch = useAppDispatch()
    const { username, email, image } = useAppSelector((state) => state.auth)
    const [ updateUser ] = userAPI.useUpdateUserMutation()

    useEffect(() => {
        setValue('username', username)
        setValue('email', email)
        if(image === imgPlug) setValue('image', '')
        else setValue('image', image)
    }, [username, email, image])

    const onSubmit = async (formData: FormTypes) => {
        const changedData = {image: null}
        for (const key in formData) {
            if(formData[key] && formData[key] !== username && formData[key] !== email) {
                changedData[key] = formData[key]
            }
        }

        if(Object.keys(changedData).length === 0) return;

        try{
            const response = await updateUser({ user: changedData }).unwrap()
            dispatch(setUserData(response.user))
            setValue('password', '')
        }
        catch (error) {
            if(error.status === 422) {
                for (const key in error.data.errors) {
                    if (key in error.data.errors) {
                        setError(key, {
                            type: 'server',
                            message: `${key[0].toUpperCase() + key.slice(1, key.length)} ${error.data.errors[key].slice(0, -1)}`,
                        })
                    }
                }
            }
        }

    }

    return (
        <div className={cl.formContainer}>
            <h3 className={cl.title}>Edit Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        className={`${cl.input} ${errors.username ? cl.inputError : ''}`}
                        {...register('username')}
                    />
                    { errors.username && <p className={cl.error}>{errors.username.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Email address</label>
                    <input
                        type='email'
                        placeholder='Email address'
                        className={`${cl.input} ${errors.email ? cl.inputError : ''}`}
                        {...register('email')}
                    />
                    { errors.email && <p className={cl.error}>{errors.email.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>New password</label>
                    <input
                        type='password'
                        placeholder='New password'
                        className={`${cl.input} ${errors.password ? cl.inputError : ''}`}
                        {...register('password')}
                    />
                    { errors.password && <p className={cl.error}>{errors.password.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Avatar image (url)</label>
                    <input
                        type='text'
                        placeholder='Avatar image'
                        className={`${cl.input} ${errors.image ? cl.inputError : ''}`}
                        {...register('image')}
                    />
                    { errors.image && <p className={cl.error}>{errors.image.message}</p> }
                </div>

                <div className={cl.formItem} style={{ marginBottom: 0 }}>
                    <button type='submit' className={cl.submitButton}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile