import cl from '../styles/Form.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../hooks/redux.ts'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

import { userAPI } from '../services/userService.ts'
import { signupSuccess } from '../store/reducers/AuthSlice.ts'

const schema = z.object({
    username: z.string().min(3).max(20)
                .regex(/^[a-zA-Z0-9]+$/, 'Disallowed symbols'),
    email: z.string().email(),
    password: z.string().min(6).max(40),
    confirmPassword: z.string(),
    personalInfo: z.boolean().refine((val) => val, {
        message: 'You should accept the rules'
    }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
})

type FormTypes = z.infer<typeof schema>;

const SignUp = () => {
    const { register, handleSubmit, setError, formState: { errors }} = useForm<FormTypes>({
        defaultValues: {
            personalInfo: true
        },
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [ createUser ] = userAPI.useCreateUserMutation()

    const onSubmit = async (formData: FormTypes) => {
       try {
           const response = await createUser({ user: formData }).unwrap()
           const token = response.user.token
           dispatch(signupSuccess(token))
           navigate('/')
       } catch (error) {
           if (error.status === 422) {
               for (const key in error.data.errors) {
                   if (key in error.data.errors) {
                       setError(key, {
                           type: 'server',
                           message: `${key[0].toUpperCase() + key.slice(1, key.length)} ${error.data.errors[key].slice(0, -1)}`,
                       });
                   }
               }
               return;
           }
       }
    }

    return (
        <div className={cl.signupContainer}>
            <h3 className={cl.title}>Create new account</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className={`${cl.input} ${errors.username ? cl.inputError : ''}`}
                        {...register('username')}
                    />
                    { errors.username && <p className={cl.error}>{errors.username.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Email address</label>
                    <input
                        type="email"
                        placeholder="Email address"
                        className={`${cl.input} ${errors.email ? cl.inputError : ''}`}
                        {...register('email')}
                    />
                    { errors.email && <p className={cl.error}>{errors.email.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className={`${cl.input} ${errors.password ? cl.inputError : ''}`}
                        {...register('password')}
                    />
                    { errors.password && <p className={cl.error}>{errors.password.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Repeat Password</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className={`${cl.input} ${errors.confirmPassword ? cl.inputError : ''}`}
                        {...register('confirmPassword')}
                    />
                    { errors.confirmPassword && <p className={cl.error}>{errors.confirmPassword.message}</p> }
                </div>

                <div className={cl.formItem} style={{ borderTop: '1px solid #E8E8E8', paddingTop: 12 }}>
                    <label className={cl.checkboxLabel}>
                        <input
                            type='checkbox'
                            {...register('personalInfo')}
                        />
                        <span style={{ marginLeft: 8 }}>
                            I agree to the processing of my personal information
                        </span>
                    </label>
                    { errors.personalInfo && <p className={cl.error}>{errors.personalInfo.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <button type='submit' className={cl.submitButton}>
                        Create
                    </button>
                </div>
            </form>

            <div className={cl.haveAccount}>
                Already have an account? <Link to="/sign-in">Sign In</Link>
            </div>
        </div>
    )
}

export default SignUp
