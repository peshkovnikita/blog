import cl from '../styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAppSelector } from '../hooks/redux.ts'

const schema = z.object({
    username: z.string().min(3).max(20)
        .regex(/^[a-zA-Z0-9]+$/, 'Disallowed symbols'),
    email: z.string().email(),
    newPassword: z.string().min(6).max(40),
    image: z.string(),
})

type FormTypes = z.infer<typeof schema>

const Profile = () => {
    const { username, email, image } = useAppSelector((state) => state.auth)

    const { register, handleSubmit, setError, formState: { errors }} = useForm<FormTypes>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (formData: FormTypes) => {
        console.log({ user: formData })
    }

    return (
        <div className={cl.signupContainer}>
            <h3 className={cl.title}>Edit Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Username</label>
                    <input
                        defaultValue={username}
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
                        defaultValue={email}
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
                        type='newPassword'
                        placeholder='New password'
                        className={`${cl.input} ${errors.newPassword ? cl.inputError : ''}`}
                        {...register('newPassword')}
                    />
                    { errors.newPassword && <p className={cl.error}>{errors.newPassword.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Avatar image (url)</label>
                    <input
                        defaultValue={image}
                        type='text'
                        placeholder='Avatar image'
                        className={`${cl.input} ${errors.image ? cl.inputError : ''}`}
                        {...register('password')}
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